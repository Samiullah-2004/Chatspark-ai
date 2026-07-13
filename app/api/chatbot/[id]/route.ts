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
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()

    const chatbot = await prisma.chatbot.update({
      where: { id, userId: session.user.id },
      data: {
        welcomeMessage: body.welcomeMessage,
        placeholder: body.placeholder,
      },
    })

    return NextResponse.json(chatbot)
  } catch (error) {
    console.error("CHATBOT UPDATE ERROR:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    await prisma.chatbot.delete({
      where: { id, userId: session.user.id },
    })

    return NextResponse.json({ message: "Deleted successfully" })
  } catch (error) {
    console.error("CHATBOT DELETE ERROR:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}