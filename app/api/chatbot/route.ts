import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const chatbotSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  welcomeMessage: z.string().optional(),
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
    const parsed = chatbotSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input" },
        { status: 400 }
      )
    }

    const chatbot = await prisma.chatbot.create({
      data: {
        userId: session.user.id,
        name: parsed.data.name,
        description: parsed.data.description,
        welcomeMessage: parsed.data.welcomeMessage ?? "Hi! How can I help you?",
      },
    })

    return NextResponse.json(chatbot, { status: 201 })
  } catch (error) {
    console.error("CHATBOT CREATE ERROR:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const chatbots = await prisma.chatbot.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            documents: true,
            conversations: true,
          },
        },
      },
    })

    return NextResponse.json(chatbots)
  } catch (error) {
    console.error("CHATBOT GET ERROR:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}