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

nezapomeň si zařídit writable /var/www/app/db adresář
chmod -p /var/www/app/db
chown -R jbk /var/www
```

spustit

```
yarn rw dev
yarn rw storybook
yarn rw prisma-studio
```
[GraphQL Playground](http://localhost:8911/graphql)

```
yarn rw g types
```

## Prepare alpine server

```
setup-sshd
apk add yarn
apk add git
apk add nodejs-current
mkdir -p /var/www/app/db
yarn global add pm2
```
then

```
yarn rw deploy baremetal production --first-run

cp /var/www/app/current/ecosystem.config.js /var/www/app
cd /var/www/app
pm2 startup
pm2 save
reboot

yarn rw setup deploy baremetal production
reboot
```

later

```
yarn rw deploy baremetal production
```

# backup

```
sqlite3 /var/www/app/db/kaplan.db ".backup 'backup_file.sq3'"
```

# restore

```
sqlite3 /var/www/app/db/kaplan.db ".restore 'backup_file.sq3'"
```
