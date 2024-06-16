import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Decryptionlocal } from "./Decryption-local";
import { Encryptionlocal } from "./Encryption-local";

export function Switch() {
  // Ajoutez _idObject en tant que props

  return (
    <Tabs defaultValue="chiffrement" className="max-w-[700px] mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="chiffrement">Chiffrement</TabsTrigger>
        <TabsTrigger value="déchiffrement">Déchiffrement</TabsTrigger>
      </TabsList>
      <TabsContent value="chiffrement">
        <Encryptionlocal />
      </TabsContent>
      <TabsContent value="déchiffrement">
        <Decryptionlocal />
      </TabsContent>
    </Tabs>
  );
}
