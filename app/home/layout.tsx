"use client"; // Ajoutez cette ligne en haut du fichier

import { useEffect, useState } from 'react';
import { Navbar } from "@/components/Navbar";

export default function Layout({
    children,
    isConnected: initialIsConnected, // Change to initialIsConnected to avoid name clash
  }: Readonly<{
    children: React.ReactNode;
    isConnected: boolean; // Change to initialIsConnected
  }>)
{
    const [isConnected, setIsConnected] = useState(initialIsConnected);

    useEffect(() => {
        setIsConnected(initialIsConnected);
    }, [initialIsConnected]);

    return (
      <>
        <Navbar isConnected={isConnected}/> {/* Add this prop */}
        <div className="container mt-4">
          {children}
        </div>
      </>
    );
}
