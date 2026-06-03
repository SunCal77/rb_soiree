export function PromoBar({ children }: { children?: React.ReactNode }) {
  return (
    <div className="ml-promo">
      {children ?? (
        <>
          Livraison offerte dès 500 €. Retours sous 30 jours.{" "}
          <a href="#">En savoir plus</a>
        </>
      )}
    </div>
  );
}
