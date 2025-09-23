"use client"

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import RichTextEditor from "@/components/rich-text-editor";

export default function Create() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
    
  return (
    <Container>
      <div className="mb-6">
        <Link href={`/`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Create new post</h1>
      <form className="max-w-3xl space-y-6">
        <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="bg-slate-50"
                required
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <RichTextEditor content={content} onChange={setContent} />
        </div>
      </form>
    </Container>
  );
}
