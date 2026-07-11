import { HfInference } from "@huggingface/inference"

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY!)

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: text,
  })

  return Array.from(response as number[])
}

export function chunkText(text: string, chunkSize: number = 500): string[] {
  const words = text.split(" ")
  const chunks: string[] = []
  let current = ""

  for (const word of words) {
    if ((current + " " + word).trim().split(" ").length > chunkSize) {
      chunks.push(current.trim())
      current = word
    } else {
      current = current ? current + " " + word : word
    }
  }

  if (current.trim()) chunks.push(current.trim())
  return chunks
}