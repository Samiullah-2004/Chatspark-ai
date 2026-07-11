import { createUploadthing, type FileRouter } from "uploadthing/next"
import { auth } from "@/lib/auth"

const f = createUploadthing()

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "16MB", maxFileCount: 5 } })
    .middleware(async () => {
      const session = await auth()
      if (!session?.user?.id) throw new Error("Unauthorized")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)
      console.log("File URL:", file.url)
      return { uploadedBy: metadata.userId, url: file.url, name: file.name }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter