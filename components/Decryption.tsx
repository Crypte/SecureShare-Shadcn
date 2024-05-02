'use client'
import { Input } from "./ui/input"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "./ui/label"

import { File} from "lucide-react"

export function Decryption() {
    return (
  <Card>
            <CardHeader>
              <CardTitle>Choississez votre fichier</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fileinput">Choisissez votre fichier</Label>
                <Input className="w-[300px]" id="fileinput" type="file" />
              </div>
  
              <div className="space-y-2">
              <Label htmlFor="new">Veuillez rentrez la clé ou le mot de passe</Label>
              <Input className="w-[300px]" id="fileinput" type="text" />
              </div>
  
  
            </CardContent>
            <CardFooter className="gap-3">
              <Button className="w-full">
              <File className="mr-2 h-4 w-4" /> Récupérez votre fichier
                </Button>
            </CardFooter>
          </Card>
    )
  }
  