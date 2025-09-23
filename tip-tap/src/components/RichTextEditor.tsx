"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import ImageResize from "tiptap-extension-resize-image";

// highlight.js languages
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";

const lowlight = createLowlight(common);
lowlight.register({ javascript });
lowlight.register({ typescript });

type RichTextEditorProps = {
  onUpdate?: (html: string, json: object) => void;
  content?: string;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  onUpdate,
  content = "",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageResize, // Image resizing
      Link.configure({
        autolink: true,
        linkOnPaste: true,
        openOnClick: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer nofollow",
          class: "underline text-blue-600",
        },
      }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const json = editor.getJSON();
      onUpdate?.(html, json);
    },
  });

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  if (!editor) return <div>Loading editor...</div>;

  return (
    <div className="border rounded p-2">
      {/* Toolbar */}
      <div className="flex gap-2 border-b pb-2 mb-2 flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-blue-500 text-white px-2" : "bg-gray-200 px-2"}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-blue-500 text-white px-2" : "bg-gray-200 px-2"}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "bg-blue-500 text-white px-2" : "bg-gray-200 px-2"}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-blue-500 text-white px-2" : "bg-gray-200 px-2"}
        >
          • List
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter URL");
            if (!url) return;
            const normalized = /^(https?:|mailto:|tel:)/.test(url) ? url : `https://${url}`;
            editor.chain().focus().extendMarkRange("link").setLink({ href: normalized }).run();
          }}
          className={editor.isActive("link") ? "bg-blue-500 text-white px-2" : "bg-gray-200 px-2"}
        >
          🔗 Link
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className="bg-gray-200 px-2"
        >
          🖼️ Image
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "bg-blue-500 text-white px-2" : "bg-gray-200 px-2"}
        >
          `Code`
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="ProseMirror prose prose-sm max-w-none min-h-[200px] focus:outline-none"
      />
    </div>
  );
};

export default RichTextEditor;
