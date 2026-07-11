import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const chatbot = await prisma.chatbot.findUnique({
      where: { id, isActive: true },
      select: {
        id: true,
        name: true,
        welcomeMessage: true,
        placeholder: true,
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
    console.error("WIDGET GET ERROR:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}