/**
 * Source de vérité des 6 projets du portfolio.
 * Importé par la homepage (grille) et par chaque page projet (/projets/[slug]).
 *
 * Ordre voulu — du plus stratégique recruteur au plus ancien :
 *  01 · Chamylinex          mission client B2B (hors-école, hors-alternance)
 *  02 · Oracle des déchets  école M2 CREATECH — IA générative + n8n live
 *  03 · Brothers Négoce     alternance — design system génératif B2B
 *  04 · MyTrack             école M2 UX — démarche complète
 *  05 · GABI                école M1 — interface métier (prise de poste)
 *  06 · Chartier Dalix      école M1 — site éditorial archi
 */

export type ProjectAccent =
  | "navy" // Chamylinex
  | "obsidian" // Oracle
  | "teal" // Brothers Négoce
  | "coral" // MyTrack
  | "blue-dark" // GABI
  | "stone"; // Chartier Dalix

export interface Project {
  slug: string;
  nr: string; // "01" → "06"
  /** Titre principal — ce qui s'affiche en gros */
  title: string;
  /** Mot mis en italique gold dans le titre — sous-chaîne du title.
   *  Vide si pas d'italique (ex : Chamylinex, GABI). */
  italicWord?: string;
  /** Sous-titre éditorial — 1 phrase qui pitche */
  subtitle: string;
  /** Métadonnée mono uppercase — type de projet en 3-5 mots */
  meta: string;
  /** Pull-quote signature — utilisé en bas de fiche projet */
  pullQuote: string;
  /** Lien externe à montrer en CTA de fin de fiche */
  externalLink?: {
    label: string;
    url: string;
  };
  /** Accent visuel — chaque projet a sa couleur d'ancrage visible
   *  uniquement dans son hero / accent line, jamais en fond global */
  accent: ProjectAccent;
}

export const projects: Project[] = [
  {
    slug: "chamylinex",
    nr: "01",
    title: "Chamylinex",
    subtitle:
      "Refonte e-commerce d'un grossiste B2B en produits de grande consommation.",
    meta: "MISSION CLIENT · RECOMMANDATION",
    pullQuote:
      "Sans design system, le logo est le seul ancrage. Tout ce qui suit doit s'en déduire — pas s'y opposer.",
    externalLink: {
      label: "Voir la maquette interactive",
      url: "https://edge-people-07374602.figma.site",
    },
    accent: "navy",
  },
  {
    slug: "oracle-des-dechets",
    nr: "02",
    title: "L'Oracle des déchets",
    italicWord: "Oracle",
    subtitle:
      "Une prophétie dystopique de l'an 2500 — système IA générative, workflow n8n, interface live.",
    meta: "PROJET ÉCOLE · BINÔME · IA + AUTOMATION",
    pullQuote:
      "Le system prompt est devenu un objet de design. Définir le rôle, la voix, les contraintes — c'est designer une entité, pas paramétrer un outil.",
    externalLink: {
      label: "Consulter l'Oracle en live",
      url: "https://oracle-des-dechets.vercel.app",
    },
    accent: "obsidian",
  },
  {
    slug: "brothers-negoce",
    nr: "03",
    title: "Brothers Négoce",
    italicWord: "Négoce",
    subtitle:
      "Système visuel génératif B2B — kit de templates Meta/Instagram cohérents en quelques minutes.",
    meta: "ALTERNANCE · ÉNERGIE B2B · PHASE PILOTE",
    pullQuote:
      "Un système génératif n'efface pas le designer — il libère son temps pour les arbitrages qui comptent.",
    accent: "teal",
  },
  {
    slug: "mytrack",
    nr: "04",
    title: "MyTrack",
    subtitle:
      "Interface d'aide à la décision pour personnaliser le parcours étudiant — choisir directement son option, ou s'éclairer d'abord par les fiches métiers.",
    meta: "DEVOIR ÉCOLE · SOLO · DÉMARCHE UX",
    pullQuote:
      "Les fiches métiers ne remplacent pas le choix de l'option — elles l'éclairent, pour celles et ceux qui en ont besoin.",
    externalLink: {
      label: "Voir le prototype interactif",
      url: "https://union-cut-12250237.figma.site",
    },
    accent: "coral",
  },
  {
    slug: "gabi",
    nr: "05",
    title: "GABI",
    subtitle:
      "Refonte de l'interface tablette embarquée des chauffeurs de bus — la prise de poste quotidienne.",
    meta: "DEVOIR ÉCOLE · GROUPE DE 4 · MON RÔLE : PRISE DE POSTE",
    pullQuote:
      "Avant la route, le bus. Avant le départ, le trajet. Designer les deux minutes qui décident du service entier.",
    accent: "blue-dark",
  },
  {
    slug: "chartier-dalix",
    nr: "06",
    title: "Chartier Dalix",
    italicWord: "Dalix",
    subtitle:
      "Refonte du site web du cabinet d'architecture parisien — système éditorial numéroté.",
    meta: "DEVOIR ÉCOLE · SOLO · PROTOTYPE PROTOPIE",
    pullQuote:
      "L'architecture se regarde avant de se lire. Tout le reste — typo, grille, navigation — doit la servir.",
    accent: "stone",
  },
];

/** Helper : récupère un projet par son slug (utilisé par /projets/[slug]). */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
