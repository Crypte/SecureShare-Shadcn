"use client"; // Ajoutez cette ligne au début du fichier

import { useState, useEffect } from 'react';
import { Cloud } from "@/components/Cloud-area";

function MyPage() {
  const [_idObject, setIdObject] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const _idObject = searchParams.get('_idObject');
    setIdObject(_idObject);
    console.log("id client : " + _idObject);

    // Définir la valeur de isConnected en fonction de la valeur de _idObject
    if (_idObject && _idObject !== 'null' && _idObject !== 'undefined') {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, []);

  return (
    <>
      <Cloud isConnected={isConnected} _idObject={_idObject}/>
    </>
  );
}

export default MyPage;
