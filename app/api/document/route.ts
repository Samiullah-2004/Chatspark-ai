import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const documentSchema = z.object({
  chatbotId: z.string(),
  name: z.string(),
  type: z.string(),
  url: z.string(),
  content: z.string(),
})

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const parsed = documentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input" },
        { status: 400 }
      )
    }

    const chatbot = await prisma.chatbot.findUnique({
      where: {
        id: parsed.data.chatbotId,
        userId: session.user.id,
      },
    })

    if (!chatbot) {
      return NextResponse.json(
        { message: "Chatbot not found" },
        { status: 404 }
      )
    }

    const document = await prisma.document.create({
      data: {
        chatbotId: parsed.data.chatbotId,
        name: parsed.data.name,
        type: parsed.data.type,
        url: parsed.data.url,
        content: parsed.data.content,
      },
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    console.error("DOCUMENT CREATE ERROR:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const chatbotId = searchParams.get("chatbotId")

    if (!chatbotId) {
      return NextResponse.json(
        { message: "Chatbot ID required" },
        { status: 400 }
      )
    }

    const documents = await prisma.document.findMany({
      where: {
        chatbotId,
        chatbot: { userId: session.user.id },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(documents)
  } catch (error) {
    console.error("DOCUMENT GET ERROR:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}