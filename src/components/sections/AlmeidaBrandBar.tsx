import { AlmeidaLogo } from "@/components/brand/AlmeidaLogo";

/**
 * Faixa de assinatura entre o hero e a seção da loja: lockup da marca
 * mais uma linha situando as duas unidades no noroeste de Minas.
 */
export function AlmeidaBrandBar() {
  return (
    <div className="almeida-brand-bar">
      <AlmeidaLogo size={52} className="almeida-brand-bar__logo" />
      <p className="almeida-brand-bar__tag">
        Tecnologia que conecta você — <strong>Buritis</strong> e{" "}
        <strong>Arinos</strong>, no noroeste de Minas. iPhone, Xiaomi, JBL e
        Starlink com garantia e assistência técnica na própria loja.
      </p>
    </div>
  );
}
