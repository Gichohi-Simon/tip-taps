"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import RichTextEditor from "@/components/rich-text-editor";
import { createPost } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Create() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      const result = await createPost({ title, content, authorId: userId });
      if (result?.success) {
        toast("Post created succesfully");
        router.push("/");
      } else {
        toast("Failed to create post");
      }
    } catch (error) {
      console.error("Failed to create post", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <form className="max-w-3xl space-y-6" onSubmit={handleSubmit}>
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "create post"}
        </Button>
      </form>
    </Container>
  );
}
