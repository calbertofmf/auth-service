# Stage 1: Install dependencies and build the app
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Copy only necessary files first for better caching
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the app
COPY . .

# Build the NestJS app
RUN npm run build

# Stage 2: Create production image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependencies and built code from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Optional: create a user and run as non-root for security
# RUN addgroup app && adduser -S -G app app
# USER app

# Set environment variables (or override via docker-compose)
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]