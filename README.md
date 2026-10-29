# HelvetiGo

Prototype responsive d'une plateforme de mobilité transfrontalière Suisse · France · Allemagne, inspiré de la maquette fournie.

## Fonctionnalités incluses

- Interface responsive avec hero visuel, recherche de trajet, catégories de transport, cartes d'opérateurs, hôtels et destinations.
- Recherche front-end reliée à une API Express (`POST /api/search`).
- Validation côté serveur du départ, de la destination, de la date et du mode.
- Filtres par catégorie et bouton d'inversion départ/destination.
- Liens vers les opérateurs officiels et recherches d'hôtels externes.
- En-têtes de sécurité de base via Helmet et gestion d'erreurs API.
- Transparence : les tarifs, horaires, places et disponibilités ne sont pas inventés.

## Lancer le projet

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
cp .env.example .env
npm run dev
```

Puis ouvrir http://localhost:3000.

Pour démarrer sans le mode watch : `npm start`.

## API

- `GET /api/health` — état de l'API.
- `GET /api/providers` — liste des opérateurs disponibles.
- `POST /api/search` — valide une recherche et renvoie les opérateurs correspondant au mode choisi.
- `GET /api/hotels?city=Munich` — prépare une recherche d'hôtel externe.

Exemple de requête :

```json
{
  "from": "Genève, Suisse",
  "to": "Munich, Allemagne",
  "date": "2026-11-15",
  "mode": "Tous"
}
```

## À propos des données en direct

Cette livraison comprend une API fonctionnelle, mais **pas de connecteurs transport live**. Pour afficher des prix, horaires, durées, correspondances ou disponibilités réels, il faut intégrer les API autorisées des opérateurs/agrégateurs et gérer les clés côté serveur. Les accès dépendent des contrats, des conditions d'utilisation et des pays couverts. Le code renvoie donc explicitement `liveData: false` et ne simule pas de résultats comme s'ils étaient confirmés.

Avant une mise en production, prévoir aussi : tests automatisés, journalisation, limitation de débit, politique de confidentialité/cookies, surveillance, tests d'accessibilité et vérification des droits d'utilisation des images.
