# Auth Service

A NestJS-based authentication service implementing user management, JWT auth, roles and permissions using Prisma and PostgreSQL.

## 🚀 Features
- User registration, login with **JWT**
- Role-based access control (RBAC)
- PostgreSQL database managed via **Prisma ORM**
- Role inheritance and permission resolution
- Easily deployable with Docker Compose

## 🔧 Requirements
- Node.js ≥ 18
- PostgreSQL database
- Docker & Docker Compose

## 🛠️ Local development
```bash
# Install dependencies
npm install

# start database
docker run --name authdb -e POSTGRES_PASSWORD=authpass -p 5432:5432 -d postgres

# Generate Prisma client & run migrations
npx prisma generate
npx prisma migrate dev --name init

# Seed the database
npm run seed

# Start NestJS server in dev mode
npm run start:dev


