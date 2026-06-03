import { Suspense } from "react";
import { BoutiqueContent } from "./BoutiqueContent";

// useSearchParams (filtrage client) doit être enveloppé dans <Suspense> pour
// le pré-rendu statique. Le fallback s'affiche le temps de lire l'URL.
export default function BoutiquePage() {
  return (
    <Suspense fallback={<div className="ml-container" style={{ padding: "64px 0" }} />}>
      <BoutiqueContent />
    </Suspense>
  );
}
