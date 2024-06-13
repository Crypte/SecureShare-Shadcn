"use client"; // Ajoutez cette ligne en haut du fichier

import { Navbar } from "@/components/Navbar";

export default function Layout({
  children, // Change to initialIsConnected to avoid name clash
}: Readonly<{
  children: React.ReactNode; // Change to initialIsConnected
}>) {
  return (
    <>
      <Navbar /> {/* Add this prop */}
      <div className="container mt-4">{children}</div>
    </>
  );
}
