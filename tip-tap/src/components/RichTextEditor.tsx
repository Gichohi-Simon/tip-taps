// "use client";

// import React, { useEffect } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import { common, createLowlight } from "lowlight";
// import ImageResize from "tiptap-extension-resize-image";

// // highlight.js languages
// import javascript from "highlight.js/lib/languages/javascript";
// import typescript from "highlight.js/lib/languages/typescript";

// const lowlight = createLowlight(common);
// lowlight.register({ javascript });
// lowlight.register({ typescript });

// type RichTextEditorProps = {
//   onUpdate?: (html: string, json: object) => void;
//   content?: string;
// };

// const RichTextEditor: React.FC<RichTextEditorProps> = ({
//   onUpdate,
//   content = "",
// }) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       ImageResize, // Image resizing
//       Link.configure({
//         autolink: true,
//         linkOnPaste: true,
//         openOnClick: true,
//         HTMLAttributes: {
//           target: "_blank",
//           rel: "noopener noreferrer nofollow",
//           class: "underline text-blue-600",
//         },
//       }),
//       CodeBlockLowlight.configure({ lowlight }),
//     ],
//     content,
//     immediatelyRender: false,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       const json = editor.getJSON();
//       onUpdate?.(html, json);
//     },
//   });

//   useEffect(() => {
//     return () => editor?.destroy();
//   }, [editor]);

//   if (!editor) return <div>Loading editor...</div>;

//   return (
//     <div className="border rounded p-2">
//       {/* Toolbar */}
//       <div className="flex gap-2 border-b pb-2 mb-2 flex-wrap">
//         <button
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={editor.isActive("bold") ? "bg-blue-500 text-white px-2" : "bg-gray-200 px-2"}
//         >
//           B
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={editor.isActive("italic") ? "bg-blue-500 text-white px-2" : "bg-gray-200 px-2"}
//         >
//           I
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//           className={editor.isActive("heading", { level: 2 }) ? "bg-blue-500 text-white px-2" : "bg-gray-200 px-2"}
//         >
//           H2
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={editor.isActive("bulletList") ? "bg-blue-500 text-white px-2" : "bg-gray-200 px-2"}
//         >
//           • List
//         </button>
//         <button
//           onClick={() => {
//             const url = prompt("Enter URL");
//             if (!url) return;
//             const normalized = /^(https?:|mailto:|tel:)/.test(url) ? url : `https://${url}`;
//             editor.chain().focus().extendMarkRange("link").setLink({ href: normalized }).run();
//           }}
//           className={editor.isActive("link") ? "bg-blue-500 text-white px-2" : "bg-gray-200 px-2"}
//         >
//           🔗 Link
//         </button>
//         <button
//           onClick={() => {
//             const url = prompt("Enter image URL");
//             if (url) editor.chain().focus().setImage({ src: url }).run();
//           }}
//           className="bg-gray-200 px-2"
//         >
//           🖼️ Image
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//           className={editor.isActive("codeBlock") ? "bg-blue-500 text-white px-2" : "bg-gray-200 px-2"}
//         >
//           `Code`
//         </button>
//       </div>

//       {/* Editor Content */}
//       <EditorContent
//         editor={editor}
//         className="ProseMirror prose prose-sm max-w-none min-h-[200px] focus:outline-none"
//       />
//     </div>
//   );
// };

// export default RichTextEditor;

// the second trial.

// "use client";

// import React, { useEffect } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import { common, createLowlight } from "lowlight";
// import ImageResize from "tiptap-extension-resize-image";

// // highlight.js languages
// import javascript from "highlight.js/lib/languages/javascript";
// import typescript from "highlight.js/lib/languages/typescript";

// const lowlight = createLowlight(common);
// lowlight.register({ javascript });
// lowlight.register({ typescript });

// type RichTextEditorProps = {
//   onUpdate?: (html: string, json: object) => void;
//   content?: string;
// };

// const RichTextEditor: React.FC<RichTextEditorProps> = ({
//   onUpdate,
//   content = "",
// }) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       ImageResize,
//       Link.configure({
//         autolink: true,
//         linkOnPaste: true,
//         openOnClick: true,
//         HTMLAttributes: {
//           target: "_blank",
//           rel: "noopener noreferrer nofollow",
//           class: "underline text-blue-600",
//         },
//       }),
//       CodeBlockLowlight.configure({ lowlight }),
//     ],
//     content,
//     immediatelyRender: false,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       const json = editor.getJSON();
//       onUpdate?.(html, json);
//     },
//   });

//   // 🔑 Sync editor if `content` prop changes (e.g. after fetching post)
//   useEffect(() => {
//     if (editor && content !== editor.getHTML()) {
//       editor.commands.setContent(content || "");
//     }
//   }, [content, editor]);

//   useEffect(() => {
//     return () => editor?.destroy();
//   }, [editor]);

//   if (!editor) return <div>Loading editor...</div>;

//   return (
//     <div className="border rounded p-2">
//       {/* Toolbar */}
//       <div className="flex gap-2 border-b pb-2 mb-2 flex-wrap">
//         <button
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={
//             editor.isActive("bold")
//               ? "bg-blue-500 text-white px-2"
//               : "bg-gray-200 px-2"
//           }
//         >
//           B
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={
//             editor.isActive("italic")
//               ? "bg-blue-500 text-white px-2"
//               : "bg-gray-200 px-2"
//           }
//         >
//           I
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//           className={
//             editor.isActive("heading", { level: 2 })
//               ? "bg-blue-500 text-white px-2"
//               : "bg-gray-200 px-2"
//           }
//         >
//           H2
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={
//             editor.isActive("bulletList")
//               ? "bg-blue-500 text-white px-2"
//               : "bg-gray-200 px-2"
//           }
//         >
//           • List
//         </button>
//         <button
//           onClick={() => {
//             const url = prompt("Enter URL");
//             if (!url) return;
//             const normalized = /^(https?:|mailto:|tel:)/.test(url)
//               ? url
//               : `https://${url}`;
//             editor.chain().focus().extendMarkRange("link").setLink({ href: normalized }).run();
//           }}
//           className={
//             editor.isActive("link")
//               ? "bg-blue-500 text-white px-2"
//               : "bg-gray-200 px-2"
//           }
//         >
//           🔗 Link
//         </button>
//         <button
//           onClick={() => {
//             const url = prompt("Enter image URL");
//             if (url) editor.chain().focus().setImage({ src: url }).run();
//           }}
//           className="bg-gray-200 px-2"
//         >
//           🖼️ Image
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//           className={
//             editor.isActive("codeBlock")
//               ? "bg-blue-500 text-white px-2"
//               : "bg-gray-200 px-2"
//           }
//         >
//           `Code`
//         </button>
//       </div>

//       {/* Editor Content */}
//       <EditorContent
//         editor={editor}
//         className="ProseMirror prose prose-sm max-w-none min-h-[200px] focus:outline-none"
//       />
//     </div>
//   );
// };

// export default RichTextEditor;


"use client";

import React, { useEffect, useRef } from "react";
import { useEditor, EditorContent, Content, JSONContent } from "@tiptap/react";
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
  // backward-compatible: onChange(html) and new onUpdate(html, json)
  onUpdate?: (html: string, json: JSONContent) => void;
  onChange?: (html: string) => void;
  content?: string | JSONContent | null;
};

type ContentType = string | JSONContent | null;


const RichTextEditor: React.FC<RichTextEditorProps> = ({
  onUpdate,
  onChange,
  content = "",
}) => {
  const initialApplied = useRef(false);

  // Helper: try to normalize content: object | html string | empty string
  const normalize = (c: ContentType):string | object => {
    if (c === null || c === undefined) return "";
    if (typeof c === "object") return c; // already JSON
    if (typeof c === "string") {
      const t = c.trim();
      if (!t) return "";
      // quick JSON detection
      if ((t[0] === "{" || t[0] === "[") && isJsonString(t)) {
        try {
          return JSON.parse(t);
        } catch {
          return t; // fallback to raw string
        }
      }
      return t; // assume HTML
    }
    return String(c);
  };

  function isJsonString(s: string) {
    try {
      JSON.parse(s);
      return true;
    } catch {
      return false;
    }
  }

  // Initialize editor. (I removed immediatelyRender:false to avoid rendering quirks.)
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageResize,
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
    content: normalize(content),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const json = editor.getJSON();
      onUpdate?.(html, json);
      onChange?.(html); // backward-compatible
    },
  });

  // Sync incoming `content` into the editor in a safe way:
  useEffect(() => {
    if (!editor) return;

    const next = normalize(content);

    // debug helpers (remove in production)
    console.debug("[RichTextEditor] incoming content:", content);
    console.debug("[RichTextEditor] normalized content:", next);

    // 1) apply initial content once (good for async-loaded post)
    if (!initialApplied.current) {
      // Only set content if it's non-empty OR explicitly an empty string (to clear)
      if (next !== null && next !== undefined) {
        editor.commands.setContent(next, {emitUpdate:false}); // false -> don't emit onUpdate while initializing
      }
      initialApplied.current = true;
      return;
    }

    // 2) If editor is empty (user hasn't typed) and parent changed content later, set it.
    // This prevents overwriting mid-edit.
    try {
      const isEmpty = editor.isEmpty;
      const currentHTML = editor.getHTML();

      if (isEmpty && typeof next === "string" && next !== currentHTML) {
        editor.commands.setContent(next, {emitUpdate:false});
      }

      // If the parent passes JSON (prosemirror) and editor content differs, also set it,
      // but only if editor is empty to avoid stomping on edits.
      if (isEmpty && typeof next === "object") {
        editor.commands.setContent(next);
      }
    } catch (err) {
      console.warn("[RichTextEditor] sync failed:", err);
    }
  }, [content, editor]);

  // Clean up
  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  if (!editor) return <div>Loading editor...</div>;

  return (
    <div className="border rounded p-2">
      {/* Toolbar (unchanged) */}
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
