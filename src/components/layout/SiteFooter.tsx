import { FOOTER_COLUMNS, FOOTER_LEGAL_LINKS } from "@/data/footer";

/** Rodapé: assinatura da marca, colunas de navegação e linha legal. */
export function SiteFooter() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img
            className="footer-carmed-logo"
            src="/assets/carmed.png"
            alt="Carmed"
            width={160}
            height={42}
            loading="lazy"
          />
          <p>
            Carmed e as marcas do Grupo Cimed levam saúde e qualidade de vida a
            milhões de brasileiros todos os dias.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div className="footer-col" key={column.title}>
            <p className="footer-col-title">{column.title}</p>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© 2025 Grupo Cimed. Todos os direitos reservados.</p>
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
