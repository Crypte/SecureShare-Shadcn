import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function HeroLanding() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20 relative">
      <div className="-z-50 absolute w-1/2 h-full bg-gradient-to-tr from-purple-600 to-red-600 left-1/2 bottom-1/2 transform -translate-x-1/2 translate-y-60 rounded-full blur-3xl opacity-20"></div>
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <div
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "px-4"
          )}
        >
          <span className="mr-3">🎉</span> Nouveau !
        </div>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Démarrez avec un{" "}
          <span className="font-extrabold">Cloud de qualité</span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Chiffrez et stockez vos fichiers en toute sécurité
        </p>
      </div>
    </section>
  );
}
