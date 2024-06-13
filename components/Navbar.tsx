"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeSwitch } from "./Theme-switch";

interface NavbarProps {
  isConnected: boolean;
}

export function Navbar() {
  const router = useRouter();
  const [isConnectedState, setIsConnectedState] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsConnectedState(true);
    }
  }, []);

  return (
    <header className="z-50 sticky top-0 border-b bg-background">
      <div className="container flex h-16 items-center gap-4 px-4 md:px-6 justify-between">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/home"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="/landing"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/home/cloud"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Cloud
          </Link>
          <Link
            href="/info"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Info
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/home"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="/home"
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              {isConnectedState && (
                <Link
                  href="/home/cloud"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cloud
                </Link>
              )}
              <Link
                href="/info"
                className="text-muted-foreground hover:text-foreground"
              >
                Info
              </Link>
              <Link
                href="/home/cloud"
                className="text-muted-foreground hover:text-foreground"
              >
                Cloud
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center space-x-4">
          {!isConnectedState && (
            <Button asChild>
              <Link href={"/login"}>Se connecter</Link>
            </Button>
          )}
          {isConnectedState && (
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                setIsConnectedState(false);
                router.push("/home");
              }}
            >
              Se déconnecter
            </Button>
          )}
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
