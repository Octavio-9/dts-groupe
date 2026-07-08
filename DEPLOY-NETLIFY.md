# Déploiement sur Netlify — DTS GROUPE

Site **Next.js 16 (App Router, SSR)**. Netlify détecte Next.js et installe seul
son adaptateur (`@netlify/plugin-nextjs` / OpenNext) : SSR, ISR et
`next/image` (via le Netlify Image CDN) marchent sans config supplémentaire.
La config de build est dans [`netlify.toml`](./netlify.toml).

---

## 1. Variables d'environnement (à faire AVANT le 1er build)

Ces variables commencent par `NEXT_PUBLIC_` : elles sont **injectées dans le
bundle au moment du build**. Il faut donc les définir dans Netlify **avant** de
lancer le déploiement, et **redéployer** après toute modification.

Dans Netlify : **Site configuration → Environment variables**.

| Variable | Requis | Valeur |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | URL de production (ex. `https://dtsgroupe.com`, ou l'URL Netlify `https://<site>.netlify.app` en attendant le domaine). Sert aux URLs canoniques, au sitemap et à l'Open Graph. |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | ⭐ recommandé | Clé Web3Forms (gratuite sur web3forms.com, liée à `dtsgroupesarl@gmail.com`). Sans elle, le formulaire de contact bascule sur le bouton WhatsApp. |
| `NEXT_PUBLIC_GA_ID` | optionnel | ID Google Analytics (les scripts ne se chargent que si l'ID est présent). |
| `NEXT_PUBLIC_META_PIXEL_ID` | optionnel | ID Meta Pixel. |

---

## 2. Deux façons de déployer

### Option A — Git + déploiement continu (recommandé)

Chaque `git push` déclenche un déploiement automatique, avec des URLs de
prévisualisation par branche.

1. Initialiser le dépôt et le premier commit (voir plus bas).
2. Créer un dépôt vide sur GitHub/GitLab et y pousser le code.
3. Sur Netlify : **Add new site → Import an existing project**, choisir le dépôt.
4. Les réglages de build sont lus depuis `netlify.toml` (rien à saisir).
5. Ajouter les variables d'environnement (section 1), puis **Deploy**.

### Option B — Netlify CLI (manuel, sans Git)

```bash
npm i -g netlify-cli
netlify login                 # ouvre le navigateur pour s'authentifier
netlify init                  # crée/associe le site
netlify deploy --build        # déploiement de prévisualisation
netlify deploy --build --prod # déploiement en production
```

---

## 3. Après le premier déploiement

- **Domaine** : brancher `dtsgroupe.com` dans **Domain management** (Netlify
  fournit les DNS / le HTTPS automatique).
- Mettre `NEXT_PUBLIC_SITE_URL` à l'URL finale, puis **redéployer** (sinon
  sitemap / canoniques / OG pointeront vers l'ancienne URL).
- Vérifier `/`, `/biens`, une fiche `/biens/[slug]`, `/contact` (envoi du
  formulaire) et le rendu des images.

---

## Checklist avant mise en ligne (contenu — voir aussi le brief)

- [ ] Chiffres du Hero (200+ / 8 / 5+ / 500+) confirmés ou remplacés
- [ ] Vrais biens + photos + prix dans `src/data/properties.json`
- [ ] Témoignages réels (ou retirés)
- [ ] Page `/a-propos` complétée (année de création, agrément)
- [ ] `NEXT_PUBLIC_WEB3FORMS_KEY` en place (formulaire de contact fonctionnel)
