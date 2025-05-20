"use client";

import { signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";
import { AnimatedSheetContent } from "./AnimatedSheetContent";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full flex items-center justify-between px-4 py-2 shadow-md">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <AnimatedSheetContent>
            <SheetTitle hidden>Menu</SheetTitle>
            <nav className="flex flex-col mt-8 pl-2 mb-2">
              {session ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/new-job"
                    onClick={() => setIsOpen(false)}
                  >
                    Add New Job
                  </Link>
                  <Link href="/signin" onClick={() => signOut()}>
                    Sign Out
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Link>
                  <Link href="/signin" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </>
              )}
            </nav>
          </AnimatedSheetContent>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-3">
        <BriefcaseBusiness />
        <Link href="/" className="text-2xl font-semibold text-center">
          JobTracker
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        {!session && (
          <Button size="sm" asChild>
            <a href="/signin">Sign In</a>
          </Button>
        )}
      </div>
    </header>
  );
}
