type BrandLockupProps = {
  variant: "header" | "footer";
};

const brandLineOne = "CONTINENTAL";
const brandLineTwo = "MERCANTILE CORPORATION";

export function BrandLockup({ variant }: BrandLockupProps) {
  return (
    <span className={`brand-lockup ${variant === "footer" ? "footer-brand-lockup" : "header-brand-lockup"}`} aria-label="Continental Mercantile Corporation">
      <span className="brand-word brand-word-main brand-letter-line" aria-hidden="true">
        {brandLineOne.split("").map((character, index) => (
          <span key={`${character}-${index}`}>{character}</span>
        ))}
      </span>
      <span className="brand-word brand-word-sub brand-letter-line" aria-hidden="true">
        {brandLineTwo.split("").map((character, index) => (
          <span key={`${character}-${index}`} className={character === " " ? "brand-letter-space" : undefined}>
            {character === " " ? "\u00a0" : character}
          </span>
        ))}
      </span>
    </span>
  );
}
