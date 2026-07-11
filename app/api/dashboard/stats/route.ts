import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = session.user.id

    const [chatbots, documents, conversations, messages] = await Promise.all([
      prisma.chatbot.count({ where: { userId } }),
      prisma.document.count({ where: { chatbot: { userId } } }),
      prisma.conversation.count({ where: { chatbot: { userId } } }),
      prisma.message.count({ where: { conversation: { chatbot: { userId } } } }),
    ])

    const recentConversations = await prisma.conversation.findMany({
      where: { chatbot: { userId } },
      orderBy: { startedAt: "desc" },
      take: 5,
      include: {
        chatbot: { select: { name: true } },
        _count: { select: { messages: true } },
      },
    })

    return NextResponse.json({
      stats: {
        totalChatbots: chatbots,
        totalDocuments: documents,
        totalConversations: conversations,
        totalMessages: messages,
      },
      recentConversations: recentConversations.map((conv) => ({
        id: conv.id,
        chatbotName: conv.chatbot.name,
        messageCount: conv._count.messages,
        startedAt: conv.startedAt,
      })),
    })
  } catch (error) {
    console.error("STATS ERROR:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}