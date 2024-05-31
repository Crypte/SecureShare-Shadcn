import React, { useState } from 'react';
import { Encryption } from './Encryption';
import { Decryption } from './Decryption';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface SwitchProps {
  _idObject: string | null;
}

export function Switch({ _idObject }: SwitchProps) { // Ajoutez _idObject en tant que props

  return (
    <Tabs defaultValue="chiffrement" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="chiffrement">Chiffrement</TabsTrigger>
        <TabsTrigger value="déchiffrement">Déchiffrement</TabsTrigger>
      </TabsList>
      <TabsContent value="chiffrement">
        <Encryption _idObject={_idObject} /> {/* Transmettez _idObject en tant que props à Encryption */}
      </TabsContent>
      <TabsContent value="déchiffrement">
        <Decryption />
      </TabsContent>
    </Tabs>
  )
}
