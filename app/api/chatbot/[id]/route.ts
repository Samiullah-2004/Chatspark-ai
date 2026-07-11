import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params

    const chatbot = await prisma.chatbot.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        _count: {
          select: {
            documents: true,
            conversations: true,
          },
        },
      },
    })

    if (!chatbot) {
      return NextResponse.json(
        { message: "Chatbot not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(chatbot)
  } catch (error) {
    console.error("CHATBOT GET ERROR:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}