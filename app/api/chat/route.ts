import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateEmbedding } from "@/lib/embeddings"
import { generateChatResponse } from "@/lib/groq"
import { z } from "zod"

const chatSchema = z.object({
  chatbotId: z.string(),
  question: z.string().min(1),
  conversationId: z.string().nullable().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = chatSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input" },
        { status: 400 }
      )
    }

    const { chatbotId, question, conversationId } = parsed.data

    // Get chatbot
    const chatbot = await prisma.chatbot.findUnique({
      where: { id: chatbotId, isActive: true },
    })

    if (!chatbot) {
      return NextResponse.json(
        { message: "Chatbot not found" },
        { status: 404 }
      )
    }

    // Generate embedding for question
    const questionVector = await generateEmbedding(question)
    const vectorString = JSON.stringify(questionVector)

// Search similar chunks using pgvector
    const similarChunks = await prisma.$queryRaw<{ content: string; similarity: number }[]>`
      SELECT content, 1 - (vector <=> ${vectorString}::vector) AS similarity
      FROM "Embedding"
      WHERE "documentId" IN (
        SELECT id FROM "Document" WHERE "chatbotId" = ${chatbotId}
      )
      ORDER BY vector <=> ${vectorString}::vector
      LIMIT 5
    `

    // Build context from similar chunks
    const context = similarChunks
      .map((chunk) => chunk.content)
      .join("\n\n")

    // Generate response using Groq
    const answer = await generateChatResponse(
      question,
      context,
      chatbot.welcomeMessage
    )

    // Save or create conversation
    let conversation
    if (conversationId) {
      conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
      })
    }

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { chatbotId },
      })
    }

    // Save messages
    await prisma.message.createMany({
      data: [
        {
          conversationId: conversation.id,
          role: "user",
          content: question,
        },
        {
          conversationId: conversation.id,
          role: "assistant",
          content: answer,
        },
      ],
    })

    return NextResponse.json({
      answer,
      conversationId: conversation.id,
    })
  } catch (error) {
    console.error("CHAT ERROR:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}