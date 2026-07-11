import { NextResponse } from "next/server"
import { extractText } from "unpdf"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      )
    }

    const buffer = await file.arrayBuffer()
    const { text } = await extractText(new Uint8Array(buffer))
    const content = text.join(" ")

    return NextResponse.json({ content })
  } catch (error) {
    console.error("PDF EXTRACT ERROR:", error)
    return NextResponse.json(
      { message: "Failed to extract PDF content" },
      { status: 500 }
    )
  }
}