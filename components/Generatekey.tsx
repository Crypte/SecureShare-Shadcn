import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { WandSparkles } from "lucide-react";
import { generateKey } from "crypto"; 

export function Generatekey() {

    function getkey() {
        const key = keyGeneration();
        return key;
    }

    return (
        <div className="gap-2 flex items-center">
            <Input className="w-[300px]" id="keyinput" type="text" readOnly />
            <Button onClick={getkey}>
                <WandSparkles className="w-4 h-4 mr-2" />
                Générer
            </Button>
        </div>
    );
}


function keyGeneration() {
    const privateKey = generateKey('hmac', { length: 512 }, (err, key) => {
        if (err) throw err;
        console.log(key.export().toString('hex'));
    });

    return privateKey;
}