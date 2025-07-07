# EthelApp

This repository contains both the **frontend** (EthelApp) and **backend** (FastAPI) for the Ethel application, fully containerized with Docker Swarm and Compose. It supports **development**, **backend‑only**, and **production** modes.

---

## Table of Contents

- [Modes & Entry Points](#modes--entry-points)  
- [Prerequisites](#prerequisites)  
- [Repository Layout](#repository-layout)  
- [Development Mode (Full Stack)](#development-mode-full-stack)  
- [Backend‑Only Mode](#backend-only-mode)  
- [Production Mode (Frontend)](#production-mode-frontend)  
- [Scripts & Commands](#scripts--commands)  
- [Endpoint Example](#endpoint-example)  
- [Internationalization](#internationalization)  

---

## Modes & Entry Points

1. **Development Mode (Full Stack)**
   - Frontend with live HMR on port **8444**  
   - Backend via Vite proxy to `ethelappbackend` on port **8000**  
   - Command: `./ethelapp_dev up`

2. **Backend‑Only Mode**
   - Deploy only the FastAPI backend as a Swarm service  
   - Scales independently on port **8000**  
   - Commands: `./ethelapp_back up|down|ps|log`

3. **Production Mode (Frontend)**
   - Build & deploy the static React app behind Nginx on port **8443**  
   - Uses `docker stack deploy` with `docker-compose.yml`  
   - Command: `./ethelapp_prod up`

4. **Combined Production**  
   - Run both `ethelappbackend` and `ethelapp` stacks on `ethel_net` overlay network  
   - Nginx in the frontend stack reverse‑proxies `/app` → backend  

---

## Prerequisites

- Docker & Docker Compose (v2+)  
- Docker Swarm initialized (`docker swarm init`)  
- External overlay network named `ethel_net`  
  ```bash
  docker network create -d overlay ethel_net
  ```  
- Valid certs at `/etc/letsencrypt/fullchain.pem` & `/etc/letsencrypt/privkey.pem` for HTTPS

---

## Repository Layout

```text
├── backend/
│   ├── main.py
│   └── requirements.txt
├── Dockerfile            # production frontend
├── Dockerfile.dev        # development frontend
├── docker-compose.yml    # production frontend stack
├── docker-compose.override.yml  # extends compose for dev
├── docker-compose.backend.yml   # backend-only stack
├── ethelapp_dev          # dev script
├── ethelapp_back         # backend script
├── ethelapp_prod         # prod script
├── nginx.ssl.conf        # Nginx config for prod frontend
├── src/                  # React app source
├── vite.config.ts        # dev proxy & HTTPS config
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Development Mode (Full Stack)

1. **Start** the dev frontend + proxy:
   ```bash
   ./ethelapp_dev up
   ```
2. **Browse**:
   - HTTPS: `https://localhost:8444/`  
   - HTTP: `http://localhost:3000/`  
3. **Stop**:
   ```bash
   ./ethelapp_dev down
   ```

---

## Backend‑Only Mode

1. **Deploy** the backend service:
   ```bash
   ./ethelapp_back up
   ```
2. **List tasks**:
   ```bash
   ./ethelapp_back ps
   ```
3. **View logs** for a task:
   ```bash
   ./ethelapp_back log <task-number>
   ```
4. **Remove**:
   ```bash
   ./ethelapp_back down
   ```

---

## Production Mode (Frontend)

1. **Ensure** the backend is running on `ethel_net`.  
2. **Deploy** the frontend stack:
   ```bash
   ./ethelapp_prod up
   ```
3. **Remove**:
   ```bash
   ./ethelapp_prod down
   ```

Nginx serves static files at `/` and proxies `/app/` to `ethelappbackend:8000`.

---

## Scripts & Commands

| Script            | Action                                          |
|-------------------|-------------------------------------------------|
| `./ethelapp_dev`  | Start/stop frontend dev mode (port 8444)        |
| `./ethelapp_back` | Manage backend Swarm service (port 8000)        |
| `./ethelapp_prod` | Deploy/remove prod frontend stack (port 8443)   |

---

## Endpoint Example

**GET** `/app/user/fullname`  
```json
{ 
  "available": true,
  "fullname": "Zaphod Beeblebrox"
}
```  
or when unavailable:  
```json
{ "available": false }
```

The frontend fetches this on mount and displays the `fullname` next to the “View as” icon.

---

## Internationalization

- Powered by **i18next** and `react-i18next`.  
- Base English resources in `src/i18n.ts`.  
- Add additional languages under the `resources` object.

---
