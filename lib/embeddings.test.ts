import { chunkText } from "./embeddings"

describe("chunkText", () => {
  it("returns a single chunk when text is shorter than chunkSize", () => {
    const text = "This is a short sentence."
    const result = chunkText(text, 500)

    expect(result).toHaveLength(1)
    expect(result[0]).toBe("This is a short sentence.")
  })

  it("splits text into multiple chunks when it exceeds chunkSize", () => {
    const words = Array(1200).fill("word").join(" ")
    const result = chunkText(words, 500)

    expect(result.length).toBeGreaterThan(1)
  })

  it("does not exceed chunkSize words per chunk", () => {
    const words = Array(1000).fill("word").join(" ")
    const result = chunkText(words, 500)

    result.forEach((chunk) => {
      const wordCount = chunk.split(" ").length
      expect(wordCount).toBeLessThanOrEqual(500)
    })
  })

  it("returns an empty array for empty input", () => {
    const result = chunkText("", 500)
    expect(result).toEqual([])
  })
})