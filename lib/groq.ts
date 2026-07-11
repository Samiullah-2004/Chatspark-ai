import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

export async function generateChatResponse(
  question: string,
  context: string,
  welcomeMessage: string
): Promise<string> {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a helpful customer support assistant. Answer questions based ONLY on the following context. If the answer is not in the context, say "I don't have information about that." Be concise and friendly.

Context:
${context}`,
      },
      {
        role: "user",
        content: question,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
  })

  return response.choices[0]?.message?.content ?? "I could not generate a response."
}