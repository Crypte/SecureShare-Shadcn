
import React, { useState } from 'react';
import { Encryption } from './Encryption';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Decryption } from './Decryption';

export function Switch() {
  
  return (

    <Tabs defaultValue="chiffrement" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="chiffrement">Chiffrement</TabsTrigger>
        <TabsTrigger value="déchiffrement">Déchiffrement</TabsTrigger>
      </TabsList>
      <TabsContent value="chiffrement">
      <Encryption/>
      </TabsContent>
      <TabsContent value="déchiffrement">
        <Decryption/>
      </TabsContent>
    </Tabs>
  )
}