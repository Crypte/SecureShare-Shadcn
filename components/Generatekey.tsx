import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { WandSparkles } from "lucide-react";
import { generateKeyPair } from "crypto";

export function Generatekey() {

    

    return (
        <div className="gap-2 flex items-center">
                <Input className="w-[300px]" id="keyinput" type="text" />
                <Button><WandSparkles className="w-4 h-4 mr-2"/>Générer</Button>
        </div>
    );
};


function keygeneration() {
    
}