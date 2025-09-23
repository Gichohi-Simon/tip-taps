import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DashboardPage() {
  return (
    <Container>
      <div className="flex justify-between items-center">
        <h1 className="flex justify-between items-center">My posts</h1>
        <Link href="/create">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>
    </Container>
  );
}
