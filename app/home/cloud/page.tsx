"use client";

import { useState, useEffect } from 'react';
import { Cloud } from "@/components/Cloud-area";
import { Button } from "@/components/ui/button";
import jwt from 'jsonwebtoken';

function MyPage() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwt.decode(token);
        if (decodedToken) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error('Invalid token', error);
        setIsConnected(false);
      }
    } else {
      setIsConnected(false);
    }
  }, []);


  return (
    <>
      <Cloud/>
      {isConnected && (
        <Button
          className="w-full inline-flex justify-center rounded-md border border-transparent bg-white-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Ajouter un fichier
        </Button>
      )}
    </>
  );
}

export default MyPage;
