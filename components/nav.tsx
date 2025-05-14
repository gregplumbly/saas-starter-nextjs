"use client";

import Link from "next/link";
import { use, useState, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CircleIcon, Home, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/lib/auth";
import { signOut } from "@/app/(login)/actions";

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userPromise } = useUser();
  const user = use(userPromise);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.refresh();
    router.push("/");
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/pricing"
          className="text-sm font-medium text-gray-200 hover:text-white"
        >
          Pricing
        </Link>
        <Button asChild className="rounded-full">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9">
          <AvatarImage alt={user.name || ""} />
          <AvatarFallback>
            {user.email
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MainNav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };
  
  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-orange-500 flex items-center">
            <CircleIcon className="h-6 w-6 mr-2" />
            Level Up AI Skills
          </Link>
          
          <div className="flex space-x-6 ml-10">
            <Link 
              href="/" 
              className={`hover:text-orange-400 transition-colors ${isActive('/') && !isActive('/blog') ? 'text-orange-500' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className={`hover:text-orange-400 transition-colors ${isActive('/blog') ? 'text-orange-500' : ''}`}
            >
              Blog
            </Link>
          </div>
        </div>
        
        <Suspense fallback={<div className="h-9" />}>
          <UserMenu />
        </Suspense>
      </div>
    </nav>
  );
}
