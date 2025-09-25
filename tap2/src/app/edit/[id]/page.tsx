"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { FormEvent, useEffect, useState} from "react";
import RichTextEditor from "@/components/rich-text-editor";
import { getPostForEdit, updatePost } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

export default function EditPostPage() {
  const router = useRouter();

  // getting params in a client component
  const params = useParams()
  const id = params.id as string

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userId, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
   const fetchPost = async() => {
    if(!isSignedIn){
        return;
    }

    try {
     const post = await getPostForEdit(id)

     if(post.success){
        setTitle(post.data?.title ?? "")
        console.log("fetched content :",post.data?.content);
        setContent(post.data?.content ?? "");
     }

    } catch (error) {
        console.error("Failed to fetch post: ", error);
    }finally{
        setIsLoading(false)
    }}

   if(isLoaded){
    fetchPost();
   }
  }, [isLoaded, isSignedIn, id]);

  if (!isLoaded || isLoading) {
    return (
        <div className="container mx-auto py-10 px-4 flex justify-center">
            <div>Loading...</div>
        </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      const result = await updatePost(id, {title, content});
      if (result?.success) {
        toast("Post updated succesfully");
        router.push("/");
      } else {
        toast("Failed to update post");
      }
    } catch (error) {
      console.error("Failed to create post", error);
      toast("Failed to fetch post")
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="mb-6">
        <Link href={`/posts/${id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Edit post</h1>
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
          <RichTextEditor content={content} onChange={(html) => setContent(html)} />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Save changes"}
        </Button>
      </form>
    </Container>
  );
}
