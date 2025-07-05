# EthelApp Repository

This repository contains both the frontend (EthelApp) and backend (FastAPI) for the Ethel application. It is designed for development in Docker and deployment behind an Nginx reverse proxy.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Repository Structure](#repository-structure)
- [Development Setup](#development-setup)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Docker Compose Stacks](#docker-compose-stacks)
  - [Backend Stack](#backend-stack)
  - [Frontend Dev Stack](#frontend-dev-stack)
- [Production Deployment](#production-deployment)
- [Endpoints](#endpoints)
- [Internationalization (i18n)](#internationalization-i18n)

---

## Features

- **FastAPI backend** for serving `/app`-prefixed REST endpoints.
- **React + Vite frontend** with TypeScript, Tailwind CSS, and React Router.
- **Dockerized** development and production stacks.
- **Service endpoint** example: `/app/user/fullname` returns user display name.
- **Internationalized UI** using i18next.

## Prerequisites

- Docker & Docker Compose (v2+)
- (Optional) Local SSL certs at `/etc/letsencrypt/fullchain.pem` and `/etc/letsencrypt/privkey.pem` for HTTPS in dev.

## Repository Structure

```
├── backend/
│   ├── main.py            # FastAPI application
│   ├── requirements.txt   # Python dependencies
│   └── Dockerfile         # Backend image definition
├── src/                   # React frontend source
│   ├── app/               # App entry & routing
│   ├── common/            # Shared components (ShellLayout)
│   ├── contexts/          # React Contexts (e.g. Auth)
│   ├── services/          # API service functions
│   ├── styles/            # Tailwind & custom CSS
│   └── main.tsx           # React entrypoint
├── docker-compose.backend.yml  # Backend-only stack
├── Dockerfile.dev         # Frontend development image
├── vite.config.ts         # Vite + proxy configuration
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
└── package.json           # Frontend dependencies & scripts
```

## Development Setup

All development runs inside Docker; no global installs needed.

### Backend

1. Build the backend image and start the container:
   ```bash
   docker compose -f docker-compose.backend.yml up --build -d backend
   ```
2. FastAPI will be available at `http://localhost:8000/app/...`.

### Frontend

1. Build and run the development container:
   ```bash
   docker compose up --build ethelapp-dev
   ```
2. Access the app UI at `https://localhost:8444/` (HTTPS) or `http://localhost:3000/`.

> **Proxy note:** Vite proxies `/app` requests to `http://ethelappbackend:8000` internally.

## Docker Compose Stacks

### Backend Stack

- **File:** `docker-compose.backend.yml`
- **Service:** `backend` runs on port 8000.
- **Upstream:** Nginx (outside this repo) should proxy `/app` → this service.

### Frontend Dev Stack

- **File:** `docker-compose.yml` (dev profile)
- **Service:** `ethelapp-dev` runs Vite on port 3000 and HTTPS on 8444.
- **Volumes:** mounts local code into `/app` for HMR.

## Production Deployment

1. Build both images:
   ```bash
   docker compose -f docker-compose.backend.yml build backend
   docker build -f Dockerfile -t ethelapp-frontend:latest .
   ```
2. Deploy behind your Nginx reverse proxy on port 443.
3. Nginx `location ^~ /app/ { proxy_pass http://ethelappbackend:8000; }` and `location / { root /usr/share/nginx/html; }`.

## Endpoints

- **`GET /app/user/fullname`**
  - **Response:**
    ```json
    { "available": true, "fullname": "Zaphod Beeblebrox" }
    ```
  - If unavailable:
    ```json
    { "available": false }
    ```

> Frontend calls this on mount and displays the `fullname` next to the "View as" icon.

## Internationalization (i18n)

- Uses **i18next** with `react-i18next`.
- English texts defined in `src/i18n.ts` and can be extended to `de`, `fr`, `it` under `resources`.

---

Feel free to iterate on this README as the app grows!
