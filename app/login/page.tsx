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

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null); // State pour stocker les données utilisateur récupérées
  const router = useRouter(); // Initialisez le hook useRouter

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Hasher le mot de passe
    const hashedPassword = await bcryptjs.hash(password, 10);

    try {
        const response = await fetch(`http://localhost:3000/api/users`);
        if (response.ok) {
          const data = await response.json();
          console.log("User data:", data);
          setUserData(data); // Met à jour l'état avec les données utilisateur récupérées
          // Filtrer les données pour ne garder que celles correspondant à l'e-mail saisi
          const matchedUser = data.find((user: any) => user.email === email);
          if (matchedUser) {
            console.log(matchedUser); // Met à jour l'état avec les données de l'utilisateur correspondant
            // Comparer les mots de passe hashés
            console.log(matchedUser.hashed_password);
            const passwordMatch = await bcryptjs.compare(password, matchedUser.hashed_password);
            if (passwordMatch) {
              console.log("Password matched"); // Le mot de passe correspond
              const userId = matchedUser._id;
              console.log("role : " + matchedUser.role);
              const role = matchedUser.role;
              try {
                const response = await fetch('/api/users/token', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email, password, role }),
                });
          
                if (response.ok) {
                  const data = await response.json();
                  localStorage.setItem("token", data.token);
                  localStorage.setItem("role", data.role);
                  router.push(`/home/cloud`);
                } else {
                  const errorData = await response.json();
                  setError(errorData.message || 'An error occurred');
                }
              } catch (error) {
                console.error('Failed to login:', error);
                setError('An error occurred');
              }
              router.push(`/home`);
            } else {
              console.error("Incorrect password"); // Le mot de passe ne correspond pas
            }
          } else {
            console.error("User not found");
            setUserData(null); // Aucun utilisateur correspondant trouvé, mettre à jour l'état à null
          }
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
      {userData && (
        <div>
          <h2>User Data</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
function setError(arg0: any) {
  throw new Error("Function not implemented.");
}