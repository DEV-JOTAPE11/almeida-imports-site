/**
 * Faixa de assinatura entre o hero e a seção da marca: logo Carmed
 * mais uma linha situando a marca dentro do Grupo Cimed.
 */
export function CarmedBrandBar() {
  return (
    <div className="carmed-brand-bar">
      <img
        className="carmed-brand-bar__logo"
        src="/assets/carmed.png"
        alt="Carmed"
        width={180}
        height={48}
        loading="lazy"
      />
      <p className="carmed-brand-bar__tag">
        Marca de cuidado no dia a dia — parte do ecossistema{" "}
        <strong>Grupo Cimed</strong>, com presença em milhões de lares
        brasileiros.
      </p>
    </div>
  );
}
