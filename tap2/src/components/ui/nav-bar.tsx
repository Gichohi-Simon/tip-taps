import React from "react";
import Link from "next/link";
import { Button } from "./button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function NavBar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between p-4 h-16">
        <Link href="/" className="text-xl font-black">
          NextClerk 🚀
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button className="cursor-pointer">Dashboard</Button>
            </Link>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="cursor-pointer">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
