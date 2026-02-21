# 🚀 GeoTarget Pro — Deployment, Testing & Integration

## 1. Architecture

```
React Frontend (Vercel) ──REST API──> Express Backend (Railway) ──> MongoDB Atlas
                                              │
                                        Redis (Cache)
```

## 2. Deployment Options

### Option A: Vercel + Railway (Recommended)

- **Frontend**: `cd client && vercel --prod`
- **Backend**: Connect GitHub repo to Railway, set env vars

### Option B: AWS

- EC2/ECS (Backend), S3+CloudFront (Frontend), DocumentDB (Database)

### Option C: Heroku

- `heroku create geotarget-api && git push heroku main`

## 3. Environment Variables

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/geotarget
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## 4. Testing

### Frontend: `cd client && npm run test`

### Backend: `cd server && npm test`

### Privacy Audit Checklist

- [ ] GDPR consent flow works
- [ ] Data download exports correctly
- [ ] Account deletion removes all data
- [ ] Anonymization applied
- [ ] HTTPS enforced
- [ ] Rate limiting works
- [ ] JWT expiration enforced

### Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| API Response Time | < 200ms |
| Lighthouse Score | > 90 |

## 5. Scaling

| Phase | Users | Actions |
|-------|-------|---------|
| Launch | 0-1K | Single server, MongoDB Atlas free |
| Growth | 1K-10K | Redis cache, CDN, Atlas M10 |
| Scale | 10K-100K | Load balancer, replica set, job queue |
