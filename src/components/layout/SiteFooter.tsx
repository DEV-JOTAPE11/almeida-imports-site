import { AlmeidaLogo } from "@/components/brand/AlmeidaLogo";
import { FOOTER_COLUMNS, FOOTER_LEGAL_LINKS } from "@/data/footer";

/** Rodapé: assinatura da marca, colunas de navegação e linha legal. */
export function SiteFooter() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <AlmeidaLogo size={50} className="footer-almeida-logo" />
          <p>
            Loja de eletrônicos em Buritis e Arinos (MG). iPhone, Xiaomi, JBL e
            Starlink com garantia, parcelamento no boleto em até 24x e
            assistência técnica especializada.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div className="footer-col" key={column.title}>
            <p className="footer-col-title">{column.title}</p>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© 2026 Almeida Imports. Todos os direitos reservados.</p>
        <div className="footer-bottom-right">
          {FOOTER_LEGAL_LINKS.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
