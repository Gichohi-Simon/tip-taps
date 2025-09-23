import React from "react";
import prisma from "@/lib/db";
import BlogPostList from "@/components/ui/blog-post-list";
import Container from "@/components/container";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users);
  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Latest Posts</h1>
        <p className="text-muted-foreground mt-2">
          Explore the latest articles and insights
        </p>
      </div>
      <BlogPostList />
    </Container>
  );
}
