# Archivea

## Dépendance
- node.js

## Instalation
Après avoir unzip le projet, installer les dépendance
```bash
npm install
```
Générer prisma
```bash
npx prisma generate
```

## Lancement
Lancer le serveur
```bash
npm run dev
```
Aller dans le lien http://localhost:3000



# NO-SQL
Utilisation de postgresql en local :

Lancer un conteneur Docker (https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)

```
docker run --name postgres -d \
  -p 127.0.0.1:5432:5432 \
  -v postgres-data:/var/lib/postgresql \
  -v "$PWD/postgres-password.txt:/run/secrets/postgres-password:ro" \
  -e POSTGRES_PASSWORD_FILE=/run/secrets/postgres-password \
  postgres:18
```

Créer la variable DATABASE_URL : 
```
export DATABASE_URL="postgresql://postgres:MDP@127.0.0.1:5432/postgres?schema=public"
```

Générer prisma
```bash
npx prisma generate
```

Appliquer le schema à la bd
```
npx prisma db push
```