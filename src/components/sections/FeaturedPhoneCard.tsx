import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { PhoneSpecIcon } from "@/components/icons/PhoneSpecIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { MAX_INSTALLMENTS, WHATSAPP_BY_STORE } from "@/data/featured-phones";
import type { FeaturedPhone } from "@/types";

const INSTAGRAM_BY_STORE = {
  buritis: "https://www.instagram.com/almeidaimportss_/",
  arinos: "https://www.instagram.com/almeidaimports.arinos/",
} as const;

/**
 * Formata em real sem depender do `Intl`: o agrupamento do Node e o do
 * navegador usam espaços diferentes antes do número, e a diferença
 * quebraria a hidratação.
 */
export function formatBRL(value: number): string {
  const cents = Math.round(value * 100);
  const whole = Math.floor(cents / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const fraction = (cents % 100).toString().padStart(2, "0");
  return `R$ ${whole},${fraction}`;
}

/**
 * Card de um aparelho em destaque: foto, ficha curta, preço e os dois
 * caminhos de contato — WhatsApp da loja que atende e o Instagram dela.
 */
export function FeaturedPhoneCard({ phone }: { phone: FeaturedPhone }) {
  const fullName = `${phone.model} ${phone.storage}`;
  const message = encodeURIComponent(
    `Oi! Vi o ${fullName} nos destaques da semana e quero saber mais.`,
  );
  const whatsapp = `${WHATSAPP_BY_STORE[phone.store]}?text=${message}`;

  return (
    <article className="featured-card">
      <div
        className="featured-card__photo"
        style={
          phone.photoScale
            ? ({
                "--photo-scale": phone.photoScale,
              } as React.CSSProperties)
            : undefined
        }
      >
        {phone.badge ? (
          <span className="featured-card__badge">{phone.badge}</span>
        ) : null}
        <img
          src={phone.photo}
          alt={phone.alt}
          width={1000}
          height={1000}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="featured-card__body">
        <div className="featured-card__brand">{phone.brand}</div>
        <h3 className="featured-card__title">{phone.model}</h3>
        <p className="featured-card__color">
          {phone.color} · {phone.storage}
        </p>

        <ul className="featured-card__specs">
          {phone.specs.map((spec) => (
            <li key={spec.icon}>
              <PhoneSpecIcon name={spec.icon} />
              <span>{spec.label}</span>
            </li>
          ))}
        </ul>

        <div className="featured-card__price">
          <strong>{formatBRL(phone.price)}</strong>
          <span>
            ou {MAX_INSTALLMENTS}x de{" "}
            {formatBRL(phone.price / MAX_INSTALLMENTS)} no boleto
          </span>
        </div>

        <div className="featured-card__actions">
          <a
            className="featured-card__cta"
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Falar no WhatsApp sobre o ${fullName}`}
          >
            <WhatsAppIcon />
            <span>Ver detalhes</span>
          </a>
          <a
            className="featured-card__icon-btn"
            href={INSTAGRAM_BY_STORE[phone.store]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver o ${fullName} no Instagram da loja`}
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
