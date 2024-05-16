'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append("nom", nom)
    formData.append("prenom", prenom)
    formData.append("email", email)
    formData.append("password", password)

    try {
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        // Rediriger vers la page /home/cloud après la soumission réussie du formulaire
        router.push('/home/cloud');
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error(error)
    }

    setEmail("")
    setPassword("")
    setNom("")
    setPrenom("")
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form className="mx-auto grid w-[350px] gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Inscription</h1>
            <p className="text-balance text-muted-foreground">
              Entrez vos informations ci-dessous pour vous inscrire
            </p>
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
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                type="string"
                placeholder="Max"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                type="string"
                placeholder="Robinson"
                required
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              S'inscrire
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href={'/home'}>
                <ArrowLeft className="mr-2 h-4 w-4" />Retour à l'application
              </Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="underline">
              Se connecter
            </Link>
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
  )
}