# Kubernetes Deployment Guide

This directory contains Kubernetes manifests for deploying the EthelApp stack.

## Prerequisites

- Kubernetes cluster (v1.19+)
- kubectl configured
- cert-manager installed (for automatic TLS certificate management)
- nginx-ingress-controller installed

## Components

### Frontend (ethelapp)
- **Deployment**: `deployment.yaml` - Runs the React frontend served by Nginx
- **Service**: `service.yaml` - ClusterIP service exposing port 80
- **Image**: `ghcr.io/irony/ethelapp:latest`
- **Replicas**: 2 (matching docker-compose.yml)

### Backend (ethelappbackend)
- **Deployment**: `backend-deployment.yaml` - Runs the FastAPI backend
- **Service**: `backend-service.yaml` - ClusterIP service exposing port 8000
- **Image**: `ghcr.io/irony/ethelapp-backend:latest`
- **Replicas**: 5 (matching docker-compose.backend.yml)

### Networking
- **Namespace**: `namespace.yaml` - Isolated namespace for the application
- **Ingress**: `ingress.yaml` - Routes external traffic:
  - `/app/*` → backend service (port 8000)
  - `/*` → frontend service (port 80)

## Deployment Instructions

1. **Create the namespace:**
   ```bash
   kubectl apply -f namespace.yaml
   ```

2. **Deploy the backend:**
   ```bash
   kubectl apply -f backend-deployment.yaml
   kubectl apply -f backend-service.yaml
   ```

3. **Deploy the frontend:**
   ```bash
   kubectl apply -f deployment.yaml
   kubectl apply -f service.yaml
   ```

4. **Configure ingress:**
   ```bash
   kubectl apply -f ingress.yaml
   ```

5. **Verify deployments:**
   ```bash
   kubectl get pods -n ethelapp
   kubectl get services -n ethelapp
   kubectl get ingress -n ethelapp
   ```

## Image Building & Pushing

Images are automatically built and pushed to GitHub Container Registry (ghcr.io) via GitHub Actions workflow on every push to the main branch.

The workflow builds:
- Frontend image: `ghcr.io/irony/ethelapp:latest`
- Backend image: `ghcr.io/irony/ethelapp-backend:latest`

### Manual Build (if needed)

Frontend:
```bash
docker build -t ghcr.io/irony/ethelapp:latest .
docker push ghcr.io/irony/ethelapp:latest
```

Backend:
```bash
docker build -t ghcr.io/irony/ethelapp-backend:latest -f backend/Dockerfile .
docker push ghcr.io/irony/ethelapp-backend:latest
```

## Comparison with Docker Compose

The Kubernetes manifests mirror the configuration in docker-compose files:

| Component | Docker Compose | Kubernetes |
|-----------|----------------|------------|
| Frontend replicas | 2 (docker-compose.yml) | 2 (deployment.yaml) |
| Backend replicas | 5 (docker-compose.backend.yml) | 5 (backend-deployment.yaml) |
| Frontend network | ethel_net (overlay) | ethelapp namespace |
| Backend network | ethel_net (overlay) | ethelapp namespace |
| Restart policy | on-failure | Always (default) |

## Resource Limits

Both frontend and backend pods have resource limits defined:
- **Requests**: 100m CPU, 128Mi memory
- **Limits**: 200m CPU, 256Mi memory

Adjust these values in the deployment files based on your cluster capacity and application needs.

## Health Checks

- **Frontend**: HTTP GET on `/` (port 80)
- **Backend**: HTTP GET on `/docs` (port 8000)

## TLS/HTTPS

The ingress is configured to use cert-manager with Let's Encrypt for automatic TLS certificate provisioning. Ensure cert-manager is installed and the cluster-issuer `letsencrypt-prod` is configured.

## Troubleshooting

Check pod logs:
```bash
kubectl logs -n ethelapp -l app=ethelapp
kubectl logs -n ethelapp -l app=ethelappbackend
```

Check pod status:
```bash
kubectl describe pod -n ethelapp <pod-name>
```

Check ingress:
```bash
kubectl describe ingress -n ethelapp ethelapp
```
