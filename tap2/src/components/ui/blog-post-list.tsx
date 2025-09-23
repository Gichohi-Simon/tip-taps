import Link from "next/link";
import React from "react";
import { posts } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

// used to remove html tags.
import DOMPurify from 'isomorphic-dompurify';

export default function BlogPostList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
             <div>
                {DOMPurify.sanitize(post.content, {
                    ALLOWED_TAGS:[]
                } )}
             </div>
            </CardContent>
            <CardFooter className="text-sm">
              <div className="flex gap-2 items-center">
                <span>{`${post.author.firstName} ${post.author.lastName}`}</span>
                <span>.</span>
                <time dateTime={post.createdAt.toISOString()}>
                    {formatDate(post.createdAt)}
                </time>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
