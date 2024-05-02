'use client'

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { WandSparkles } from "lucide-react";
import { randomBytes } from "crypto"; 
import { Copy } from 'lucide-react';

export function GenerateKey() {
    const [key, setKey] = useState("");

    function getkey() {
        const generatedKey = keyGeneration();
        setKey(generatedKey);
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(key);
    }

    return (
        <div className="gap-2 flex items-center">
            <Input className="w-[600px]" id="keyinput" type="text" value={key} readOnly />
            {key && <Button variant="outline" size="icon" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4" />
                    </Button>}
            <Button onClick={getkey}>
                <WandSparkles className="w-4 h-4 mr-2" />
                Générer
            </Button>
        </div>
    );
}

function keyGeneration() {
    const privateKey = randomBytes(32).toString('hex');
    console.log(privateKey);
    return privateKey;
}
