import Image from "next/image";
import Link from "next/link";

export default function page() {
    return (
        <>
            <div className="container mx-auto mt-4 p-4">
                <header className="text-center my-12">
                    <h2 className="text-3xl font-bold">Bienvenue sur SecureShare</h2>
                    <p className="mt-4 text-lg">Votre Plateforme de Chiffrement et Déchiffrement Sécurisé</p>
                </header>

                <section className="my-12">
                    <h3 className="text-2xl font-bold text-center text-cyan-900">Qui Sommes-Nous ?</h3>
                    <p className="mt-4 text-base text-center">
                        Nous sommes une équipe d'étudiants <b>passionnés</b> en école d'ingénierie, déterminés à mettre en œuvre nos connaissances pour créer des <b>solutions innovantes</b> répondant aux besoins de sécurité de notre époque. Guidés par notre engagement envers la <b>confidentialité</b> et la protection des données, nous avons développé une application web de <b>chiffrement</b> et <b>déchiffrement</b> qui garantit la sécurité et la confidentialité des communications de nos utilisateurs.
                    </p>
                    <Image
                        src="/Cybersecurity.png"
                        alt="Image de cadenas pour sécuriser les documents"
                        width="300"
                        height="500"
                        className="content-center object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </section>

                <section className="my-12">
                    <h3 className="text-2xl font-bold text-center text-cyan-900">Notre Mission</h3>
                    <p className="mt-4 text-base text-center">
                        Notre mission est de fournir à nos utilisateurs un moyen <b>simple</b> et <b>efficace</b> de protéger leurs données sensibles contre toute interception ou accès non autorisé. Nous croyons fermement que chacun devrait avoir le <b>contrôle total</b> de sa vie privée en ligne, et c'est pourquoi nous avons conçu notre plateforme pour offrir un chiffrement <b>robuste</b> et une confidentialité <b>absolue</b>.
                    </p>
                </section>

                <section className="my-12">
                    <h3 className="text-2xl font-bold text-center text-cyan-900">Notre Solution</h3>
                    <p className="mt-4 text-base text-center">
                        Notre application web de <b>chiffrement</b> et <b>déchiffrement</b> repose sur des algorithmes de <b>cryptographie avancés</b>, assurant une sécurité maximale à chaque étape du processus. Que vous soyez un particulier soucieux de protéger vos communications ou une entreprise cherchant à <b>sécuriser ses données sensibles</b>, notre solution est conçue pour répondre à vos besoins en matière de <b>confidentialité</b>.
                    </p>
                </section>

                <section className="my-12">
                    <h3 className="text-2xl font-bold text-center text-cyan-900 ">Fonctionnalités Principales</h3>
                    <ul className="mt-4 text-base text-center">
                        <li className="mt-2"><b>Chiffrement et Déchiffrement Sécurisés</b> : Notre application vous permet de chiffrer et déchiffrer vos données en toute sécurité, assurant que seul vous et les destinataires autorisés puissent accéder aux informations.</li>
                        <li className="mt-2"><b>Stockage Local</b> : Nous ne stockons aucune donnée sur nos serveurs. Vos données restent entièrement sous votre contrôle, renforçant ainsi la confidentialité et la sécurité de vos informations.</li>
                        <li className="mt-2"><b>Comptes Utilisateurs</b> : En créant un compte, vous avez accès à des fonctionnalités supplémentaires telles qu'un espace de stockage sécurisé et la gestion simplifiée de vos données chiffrées.</li>
                    </ul>
                </section>

                <Image
                    src="/menaces-cybersecurite.png"
                    alt="Image de cadenas pour sécuriser les documents"
                    width="300"
                    height="500"
                    className="content-center object-cover dark:brightness-[0.2] dark:grayscale"
                />

                <section className="my-12">
                    <h3 className="text-2xl font-bold text-center text-cyan-900">Notre Engagement en Matière de Sécurité</h3>
                    <p className="mt-4 text-base text-center">
                        La sécurité est notre <b>priorité absolue</b>. Nous avons mis en place des mesures de sécurité <b>rigoureuses</b> pour protéger vos données contre toute menace potentielle. De la conception de notre application à son déploiement, nous avons pris soin de garantir la <b>confidentialité</b> et <b>l'intégrité</b> de vos informations à chaque étape du processus.
                    </p>
                </section>

                <section className="text-center my-12">
                    <Link href="/register"
                          className="px-6 py-3 text-base font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700">
                        Rejoignez-nous dès aujourd'hui

                    </Link>
                </section>
            </div>
        </>
    );
}