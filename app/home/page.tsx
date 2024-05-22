"use client";

import { useState, useEffect } from 'react';
import { Switch } from "@/components/Switch";

export default function Page() {
  const [_idObject, setIdObject] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const _idObject = searchParams.get('idobject');
    setIdObject(_idObject);
    console.log("id object : " + _idObject);
  }, []);

  return (
    <>
      <Switch _idObject={_idObject}/>
    </>
  );
}
