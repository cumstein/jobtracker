"use client";

import { signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon, BriefcaseBusiness, LayoutDashboard, Plus, LogOut, UserPlus, LogIn, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";
import { AnimatedSheetContent } from "./AnimatedSheetContent";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <header className="w-full flex items-center justify-between px-4 py-2 shadow-md">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <AnimatedSheetContent>
            <SheetHeader className="px-4 pt-4">
              <SheetTitle className="text-lg">
                {session ? `Welcome, ${session.user?.name || "User"}` : "Menu"}
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-3 mt-6 px-4">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <Link
                    href="/stats"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <BarChart3 size={18} /> Statistics
                  </Link>
                  <Link
                    href="/dashboard/new-job"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Plus size={18} /> Add New Job
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="flex items-center gap-2 text-left hover:underline"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <UserPlus size={18} /> Sign Up
                  </Link>
                  <Link
                    href="/signin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <LogIn size={18} /> Sign In
                  </Link>
                </>
              )}
            </nav>

            <SheetFooter className="mt-auto px-4 pb-4">
              <SheetClose asChild>
                <Button variant="outline" className="w-full">
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
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
            <Link href="/signin">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
  
