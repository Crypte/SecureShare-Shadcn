'use client' // Marquez le parent avec "use client" pour qu'il soit considéré comme une Client Component
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import bcryptjs from "bcryptjs";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null); // State pour stocker les données utilisateur récupérées
  const router = useRouter(); // Initialisez le hook useRouter

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/users/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
                  router.push(`/home/cloud`);
        } else {
          console.error("Failed to fetch user data");
          
        }
      } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form className="mx-auto grid w-[350px] gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Connexion</h1>
            <p className="text-balance text-muted-foreground">Entrez vos informations ci-dessous pour vous connecter</p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
                <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center">
                <Link href="/register" className="ml-auto inline-block text-sm underline">
                  S'inscrire
                </Link>
            </div>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href={'/home'}>
                <ArrowLeft className="mr-2 h-4 w-4" />Retour à l'application
              </Link>
            </Button>
          </div>
        </form>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      
    </div>
  );
}
function setError(arg0: any) {
  throw new Error("Function not implemented.");
}