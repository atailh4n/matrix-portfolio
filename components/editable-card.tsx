"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Save, X } from "lucide-react"

interface EditableCardProps {
  title: string
  defaultContent: string
  className?: string
  titleClassName?: string
}

export function EditableCard({ title, defaultContent, className = "", titleClassName = "" }: EditableCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(defaultContent)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.contentEditable = isEditing ? "true" : "false"
      if (isEditing) {
        editorRef.current.focus()
      }
    }
  }, [isEditing])

  const handleSave = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content
      setIsEditing(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className={`text-xl ${titleClassName}`}>{title}</CardTitle>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4" />
              <span className="sr-only">Save</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div
          ref={editorRef}
          className={`prose max-w-none ${isEditing ? "border border-dashed border-gray-300 p-2 rounded" : ""}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </CardContent>
    </Card>
  )
}

