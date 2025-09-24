import "../assets/styles/tip_tap.css"
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { AlignCenter, AlignLeft, AlignRight, Bold, Highlighter, Strikethrough } from "lucide-react"

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const btnStyle = "font-semibold p-1 lg:scale-100 scale-70 tras-bg-hover h-7 flex justify-center items-center rounded w-7"

  return (
    <div className="bg-light-100 p-2 control-group">
      <div className="flex items-center overflow-x-scroll gap-3">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${btnStyle} ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${btnStyle} ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${btnStyle} ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${btnStyle} ${editor.isActive('paragraph') ? 'is-active' : ''}`}
        >
          P
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`font-bold text-xl p-1 tras-bg-hover h-7 flex justify-center items-center rounded w-7 ${editor.isActive('bold') ? 'is-active tras-bg' : ''}`}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`font-semibold font-serif italic text-xl p-1 tras-bg-hover h-7 flex justify-center items-center rounded w-7 ${editor.isActive('italic') ? 'is-active' : ''}`}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${btnStyle} {editor.isActive('strike') ? 'is-active' : ''}`}
        >
          <Strikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`${btnStyle} ${editor.isActive('highlight') ? 'is-active' : ''}`}
        >
          <Highlighter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`${btnStyle} ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
        >
          <AlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`${btnStyle} ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
        >
          <AlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`${btnStyle} ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
        >
          <AlignRight />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`${btnStyle} ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}`}
        >
          J
        </button>
      </div>
    </div>
  )
}

export default () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Placeholder.configure({
      placeholder: 'Start typing your content here...', 
      emptyEditorClass: 'is-editor-empty', // optional class
    }),
    ],
    content: ``,
  })

  return (
    <div className="border-gray-600 lg:w-full w-64 md:w-80 rounded border-2">
      <MenuBar editor={editor} />
      <EditorContent className="bg-base-100 w-full rounded-b" editor={editor} />
    </div>
  )
}