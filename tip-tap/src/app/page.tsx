"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

const RichTextEditor = dynamic(() => import("../components/RichTextEditor"), { ssr: false });

type EditorData = {
  html: string;
  json: object;
};

export default function Home() {
  const [editorData, setEditorData] = useState<EditorData | null>(null);

  const handleSave = () => {
    if (!editorData) return;
    console.log("Payload to save in DB:", editorData);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Tiptap with Next.js + Toolbar</h1>

      <RichTextEditor onUpdate={(html, json) => setEditorData({ html, json })} />

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save
      </button>

      <h2 className="mt-6 font-semibold">Editor Content (HTML):</h2>
      <div
        className="prose prose-lg max-w-none mt-2 p-4 border rounded bg-gray-50"
        dangerouslySetInnerHTML={{ __html: editorData?.html || "" }}
      />
    </div>
  );
}
