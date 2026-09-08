import type { PhoneSpecIcon as PhoneSpecIconName } from "@/types";

/* Glifos em traço, no mesmo desenho dos ícones dos pilares da marca:
   viewBox 24, stroke 1.7, pontas arredondadas. */

const PATHS: Record<PhoneSpecIconName, React.ReactNode> = {
  /* Armazenamento — pilha de discos. */
  storage: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  /* Tela — o próprio aparelho. */
  screen: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 5.5h3" />
    </>
  ),
  /* Câmera. */
  camera: (
    <>
      <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.7l1.2-2h6.2l1.2 2h1.7A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5" />
      <circle cx="12" cy="12.5" r="3.4" />
    </>
  ),
  /* Bateria. */
  battery: (
    <>
      <rect x="2.5" y="7.5" width="16" height="9" rx="2.5" />
      <path d="M21.5 11v2" />
      <path d="M6 10.5v3M9.5 10.5v3M13 10.5v3" />
    </>
  ),
  /* Selo de garantia / lacre. */
  seal: (
    <>
      <path d="M12 2.8 20 6v5.4c0 4.4-3.2 8.2-8 9.8-4.8-1.6-8-5.4-8-9.8V6z" />
      <path d="m8.8 11.8 2.2 2.2 4.2-4.2" />
    </>
  ),
  /* Processador. */
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 2.5v3M14 2.5v3M10 18.5v3M14 18.5v3M2.5 10h3M2.5 14h3M18.5 10h3M18.5 14h3" />
    </>
  ),
};

/** Ícone de uma spec do card de destaque. */
export function PhoneSpecIcon({ name }: { name: PhoneSpecIconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

/** Lupa do botão "Buscar". */
export function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

/** Barras do botão "Filtros avançados". */
export function SlidersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/** Seta que gira quando os filtros avançados abrem. */
export function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
