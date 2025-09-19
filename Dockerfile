# ---------- Build stage (CRA) ----------
FROM node:20 AS builder
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm ci --no-audit --no-fund || npm install

# env vars for CRA
ARG REACT_APP_API_BASE
ARG REACT_APP_ENV
ENV REACT_APP_API_BASE=${REACT_APP_API_BASE}
ENV REACT_APP_ENV=${REACT_APP_ENV}
ENV NODE_ENV=production

# copy source
COPY . .

# build
RUN npm run build

# ---------- Run stage ----------
FROM node:20-alpine AS runner
WORKDIR /app
RUN npm i -g serve
COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
