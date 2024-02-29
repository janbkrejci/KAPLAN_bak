# KAPLAN
Prototyp nástroje pro kapacitní plánování ve vývoji.

# Použitá technologie

Redwood.js

# Vytvoření projektu

```
# Instalace Redwood CLI
yarn global add create-redwood-app

# Vytvoření nového projektu Redwood v aktuálním adresáři
npx create-redwood-app .

# upravit package.json
"packageManager": "yarn@1.22.21"

yarn install
yarn rw setup realtime
yarn rw setup server-file
```

spustit

```
yarn rw dev
yarn rw storybook
yarn rw prisma-studio
```
[GraphQL Playground](http://localhost:8911/graphql)
