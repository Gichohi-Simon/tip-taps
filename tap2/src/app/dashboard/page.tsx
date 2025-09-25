import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { Edit, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DOMPurify from "isomorphic-dompurify";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  return (
    <Container>
      <div className="flex justify-between items-center mb-8">
        <h1 className="flex justify-between items-center">My posts</h1>
        <Link href="/create">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium">
            {`you haven't created any posts yet`}
          </h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Get Started by creating your first post
          </p>
          <Link href="/create">
            <Button>
              <PlusIcon className="mt-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="h-full transition-all hover:shadow">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  {DOMPurify.sanitize(post.content, {
                    ALLOWED_TAGS: [],
                  })}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  <time dateTime={post.createdAt.toISOString()}>
                    {formatDate(post.createdAt)}
                  </time>
                </div>
                <div className="flex gap-2">
                  <Link href={`/posts/${post.id}`}>
                    <Button variant="outline" size="sm">
                      view
                    </Button>
                  </Link>
                  <Link href={`/edit/${post.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
