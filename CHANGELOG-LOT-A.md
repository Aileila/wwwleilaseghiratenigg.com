# Lot A — Quick wins SEO · Changelog

**Date :** 21 mai 2026
**Périmètre :** 20 pages HTML + 3 nouveaux fichiers
**Domaine cible (placeholder) :** `https://www.leilaseghirate-nigg.com`

---

## 🆕 Fichiers créés

| Fichier | Rôle |
|---|---|
| `sitemap.xml` | Plan du site pour Google (20 URLs, à soumettre via Search Console) |
| `robots.txt` | Directives pour les bots (autorise tout sauf Ahrefs, Semrush, MJ12bot, DotBot) |
| `assets/images/og-image.png` | Image de partage social 1200×630px (charte LSN, 23 KB) |

## 📝 Fichiers modifiés

**Tous les 20 fichiers HTML** ont reçu :

| Modification | Détail |
|---|---|
| **Typographie Montserrat** | Google Fonts URL changée (Manrope + Noto Serif → Montserrat 400/500/600/700). Tailwind config + CSS inline alignés. Exception : `projets/lsn-chaine-equipe.html` qui garde son design "terminal" intentionnel (Barlow Condensed + DM Mono). |
| **`<link rel="canonical">`** | Ajoutée sur 20/20 pages, pointant vers `https://www.leilaseghirate-nigg.com/[page]` |
| **`<meta property="og:image">`** | Ajoutée avec dimensions explicites (1200×630) sur 20/20 pages |
| **`<meta property="og:url">`** | Ajoutée sur 20/20 pages |
| **`<meta name="twitter:image">`** | Ajoutée sur 20/20 pages |

## ✂️ Titles raccourcis (3 pages)

| Page | Avant (longueur) | Après (longueur) |
|---|---|---|
| `projets/data-driven-learning-reporting.html` | "Data-driven learning — Reporting & insights & webinars — Leila Seghirate-Nigg" (80) | "Data-driven learning — Reporting & insights — LSN" (49) |
| `projets/gestion-projet-parcours-mooc.html` | "Gestion de projet — Parcours MOOC (2022 & 2023) — Leila Seghirate-Nigg" (70) | "Gestion de projet — Parcours MOOC 2022 & 2023 — LSN" (51) |
| `projets/plan-evaluation-formation.html` | "Plan d'évaluation d'une formation hybride — Leila Seghirate-Nigg" (64) | "Plan d'évaluation d'une formation hybride — LSN" (47) |

## ✍️ Meta descriptions réécrites (4 pages)

| Page | Raison | Nouvelle description |
|---|---|---|
| `frameworks.html` | Trop courte (77 car.) | "Six frameworks propriétaires pour orchestrer la conception pédagogique : CARTE, SCÈNE, SIGNE, ORBITE, Chaîne LSN. Activables en mission L&D." (140 car.) |
| `projets/arret-cardiaque-module.html` | Trop longue (166 car.) | "Case study — Module auto-formatif sur les gestes qui sauvent, conçu pour Harmonie Mutuelle. Storyline, vidéos de démonstration, narration storytelling." (151 car.) |
| `projets/lsn-chaine-equipe.html` | Absente | "Outil interne — Chaîne LSN pour équipes : framework de conception pédagogique BRIEF, CAHIER, DÉCISION, TÂCHES, RÉALISATION, BILAN." (130 car.) |
| `projets/plafond-de-verre.html` | Trop longue (175 car.) | "Case study Plafond de Verre — Série pédagogique immersive sur l'invisibilisation des femmes en entreprise. 5 modules narratifs construits avec l'IA." (148 car.) |

## 📊 État final — 100 % conformité

Toutes les pages satisfont maintenant les critères :

- ✅ Title entre 25 et 60 caractères (20/20)
- ✅ Meta description entre 80 et 165 caractères (20/20)
- ✅ Canonical URL absolue (20/20)
- ✅ og:image avec dimensions explicites (20/20)
- ✅ og:url (20/20)
- ✅ Twitter Card avec image (20/20)
- ✅ Typographie Montserrat alignée sur la charte LSN (19/20, exception intentionnelle)
- ✅ Sitemap + robots.txt présents à la racine

---

## 🚀 Déploiement — Marche à suivre

### 1. Intégration dans le repo

Les fichiers livrés respectent la structure exacte du repo. Tu peux soit :

**Option A — Copie directe (plus simple)**
1. Dézippe le livrable dans ton dossier local `SITE PORTFOLIO LAST`
2. Confirme l'écrasement des fichiers existants (les modifs sont propres)
3. `git add -A && git commit -m "Lot A — SEO quick wins + typo Montserrat" && git push`

**Option B — Comparaison avant intégration**
1. Dézippe le livrable dans un dossier temporaire
2. Utilise un outil de diff (VS Code, Beyond Compare) pour comparer fichier par fichier
3. Applique manuellement les changements si tu veux contrôler chaque modif

### 2. Bascule vers Netlify

1. Crée un compte Netlify si pas déjà fait
2. Connecte ton repo GitHub `Aileila/wwwleilaseghiratenigg.com`
3. Branch : `main`, build command : aucune, publish directory : `/`
4. Le site se déploie automatiquement à chaque `git push`

### 3. Achat du domaine

Quand tu auras acheté `leilaseghirate-nigg.com` (ou autre) :

1. Configure le DNS pour pointer vers Netlify (Netlify donne les enregistrements DNS)
2. **Find/replace global** dans le repo : remplace `https://www.leilaseghirate-nigg.com` par ton vrai domaine si différent. Lieux concernés : les 20 fichiers HTML (balises canonical, og:image, og:url, og:image) + `sitemap.xml` + `robots.txt`
3. Push → redéploiement auto

### 4. Soumission Google Search Console

Dès que le domaine pointe vers Netlify :

1. Crée un compte sur [search.google.com/search-console](https://search.google.com/search-console)
2. Ajoute ta propriété (URL principale)
3. Soumets le sitemap : `https://[ton-domaine]/sitemap.xml`
4. Demande l'indexation manuelle des 5 pages principales (index, méthodologie, offre, frameworks, à-propos)

---

## 🔭 Reste à faire (lots suivants)

- **Lot B — Performance images** : passer de 137 MB à <5 MB (suppression des 84 images orphelines, recréation des 4 SVG corrompus, conversion WebP)
- **Lot C — Performance technique** : remplacer Tailwind CDN par un build local, self-host Montserrat, configurer `netlify.toml`
- **Lot D — Réduction texte page par page** : méthode des 3 niveaux

---

**Fin Lot A.**
