"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/lib/uploadthing"

interface Document {
  id: string
  name: string
  type: string
  createdAt: string
}

export default function DocumentsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const fetchDocuments = async () => {
    try {
      const res = await fetch(`/api/document?chatbotId=${id}`)
      const data = await res.json()
      setDocuments(data)
    } catch {
      console.error("Failed to fetch documents")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [id])

  const handleUploadComplete = async (res: any) => {
    setUploading(true)
    try {
      for (const file of res) {
        const pdfRes = await fetch(file.url)
        const blob = await pdfRes.blob()
        const formData = new FormData()
        formData.append("file", blob, file.name)

        const extractRes = await fetch("/api/document/extract", {
          method: "POST",
          body: formData,
        })

        const { content } = await extractRes.json()

        await fetch("/api/document", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatbotId: id,
            name: file.name,
            type: "pdf",
            url: file.ufsUrl,
            content,
          }),
        })
      }
      await fetchDocuments()
    } catch {
      console.error("Failed to process document")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-0">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F23] pb-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/dashboard/chatbots" className="text-[#A1A1AA] text-xs hover:text-white transition">
              Chatbots
            </Link>
            <span className="text-[#A1A1AA] text-xs">/</span>
            <Link href={`/dashboard/chatbots/${id}`} className="text-[#A1A1AA] text-xs hover:text-white transition">
              Chatbot
            </Link>
            <span className="text-[#A1A1AA] text-xs">/</span>
            <span className="text-white text-xs">Documents</span>
          </div>
          <h1 className="text-white text-2xl sm:text-3xl font-semibold">
            Documents
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">
            Upload PDFs to train your chatbot
          </p>
        </div>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-[#111111] border border-dashed border-[#3F3F46] rounded-xl p-10 flex flex-col items-center justify-center text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-[#1F1F23] flex items-center justify-center mb-4">
          <span className="text-3xl">📄</span>
        </div>
        <h2 className="text-white font-semibold mb-1">
          Upload PDF Documents
        </h2>
        <p className="text-[#A1A1AA] text-sm mb-6 max-w-sm">
          Upload up to 5 PDFs at once. Max 16MB per file. Your chatbot will be trained on these documents.
        </p>
        <UploadButton<OurFileRouter, "pdfUploader">
          endpoint="pdfUploader"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error) => console.error("Upload error:", error)}
          appearance={{
            button: "bg-white !text-black text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-zinc-200 transition-all",
            allowedContent: "text-[#A1A1AA] text-xs mt-2",
          }}
        />
        {uploading && (
          <div className="flex items-center gap-2 mt-4">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <p className="text-[#A1A1AA] text-sm">Processing document...</p>
          </div>
        )}
      </motion.div>

      {/* Documents List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-[#111111] border border-[#1F1F23] rounded-xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-[#1F1F23]">
          <h2 className="text-white text-sm font-semibold">
            Uploaded Documents ({documents.length})
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : documents.length === 0 ? (
          <div className="px-6 py-16 flex flex-col items-center justify-center text-center">
            <p className="text-white text-sm font-medium">No documents yet</p>
            <p className="text-[#A1A1AA] text-xs mt-1">
              Upload your first PDF to start training your chatbot.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#1F1F23]">
            {documents.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center justify-between px-6 py-4 hover:bg-[#1F1F23] transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1F1F23] group-hover:bg-[#2A2A2E] flex items-center justify-center transition">
                    <span className="text-sm">📄</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{doc.name}</p>
                    <p className="text-[#A1A1AA] text-xs mt-0.5">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-[#A1A1AA] uppercase border border-[#1F1F23] px-2 py-1 rounded-md">
                  {doc.type}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

    </div>
  )
}