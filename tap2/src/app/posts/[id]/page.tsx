import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getPostById } from "@/lib/actions";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import RichTextEditor from "@/components/rich-text-editor";
import { auth } from "@clerk/nextjs/server";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await getPostById(id);

  const { userId } = await auth();

  if (!post) {
    return notFound();
  }

  const isAuthor = post.data?.authorId === userId;

  return (
    <Container>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        {isAuthor && (
          <Link href={`/edit/${id}`}>
            <Button variant="outline" size="sm" className="ml-2">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
        )}
      </div>

      <article>
        <h1 className="text-4xl font-bold mb-4">{post.data?.title}</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{`${post.data?.author.firstName} ${post.data?.author.lastName}`}</span>
          <span>.</span>
          <time dateTime={post.data?.createdAt.toISOString()}>
            {post.data?.createdAt
              ? formatDate(post.data.createdAt)
              : "Unknown date"}
          </time>
        </div>
        <RichTextEditor content={post.data?.content || ""} editable={false} />
      </article>
    </Container>
  );
}
