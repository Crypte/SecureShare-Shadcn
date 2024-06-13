import Image from "next/image";
import React from 'react';

export default function landing() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white py-6 sm:py-12">
            <main className="flex flex-col items-center justify-center text-center space-y-6">
                <h1 className="text-4xl font-bold text-black">
                    Lancez-vous avec assurance
                    <br />
                    avec <span className="text-purple-600">Secure Share</span>
                </h1>
                <p className="text-lg text-gray-600">
                    Sécurisé vos données personnelles en utilisant SecureShare.
                    <br />
                    Une plateforme innovante de chiffrement et déchiffrement sécurisés de fichiers.
                </p>
            </main>
            <footer className="mt-12">
                <div className="text-center"><p className="text-gray-500">ALIMENTE PAR</p></div>
                <div className="flex items-center justify-center space-x-4 mt-2">
                    <Image src="/next.svg" alt="Next.js" width={60} height={30} />
                    <Image src="/tailwind-logo.svg" alt="tailwind" width={60} height={30} />
                    <Image src="/mongoDB_logo.png" alt="mongoDB" width={60} height={30} />
                    <Image src="/vercel.svg" alt="Versel" width={60} height={30} />
                </div>
            </footer>
        </div>
    );
}