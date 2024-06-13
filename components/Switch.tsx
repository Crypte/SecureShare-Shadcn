import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Decryption } from "./Decryption";
import { Encryptionlocal } from "./Encryption-local";
interface SwitchProps {
  _idObject: string | null;
}

export function Switch({ _idObject }: SwitchProps) {
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
        <Decryption />
      </TabsContent>
    </Tabs>
  );
}
