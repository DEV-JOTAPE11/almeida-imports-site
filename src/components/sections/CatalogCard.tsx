import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import type { CatalogItem } from "@/types";

/** Um card do catálogo: imagem do produto, categoria, nome, descrição e CTA. */
export function CatalogCard({ item }: { item: CatalogItem }) {
  const classes = [
    "magic-bento-card",
    "magic-bento-card--text-autohide",
    "magic-bento-card--border-glow",
    "product-card",
    item.featured ? "card-featured" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="catalog-bento-photo">
        <img
          className="catalog-photo"
          src={item.photo}
          alt={item.name}
          loading="lazy"
          decoding="async"
          style={
            item.photoPosition ? { objectPosition: item.photoPosition } : undefined
          }
        />
      </div>

      <div className="magic-bento-card__header">
        <div className="magic-bento-card__label">{item.role}</div>
      </div>

      <div className="magic-bento-card__content">
        <h3 className="magic-bento-card__title">{item.name}</h3>
        <p className="magic-bento-card__description">{item.bio}</p>
        <div className="card-social">
          <a
            href={item.social.href}
            aria-label={item.social.ariaLabel}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            {item.social.handle}
          </a>
        </div>
      </div>
    </div>
  );
}
