# Predictive Healthcare Analytics Engine - Production Setup

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+
- Python 3.8+
- Docker (optional, for containerization)

### Step 1: Clone & Install Backend
```bash
git clone https://github.com/prajwal185/Predictive-Healthcare-Analytics-Engine.git
cd Predictive-Healthcare-Analytics-Engine

# Setup backend
mkdir backend && cd backend
npm init -y
npm install express socket.io cors dotenv
npm install -D typescript @types/node nodemon
```

### Step 2: Create Backend Server (src/server.ts)
```typescript
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:3000', credentials: true }
});

app.use(cors());
app.use(express.json());

// Health metrics in-memory store
const healthMetrics: any[] = [];

// REST API endpoint for predictions
app.post('/api/predictions', (req, res) => {
  const { bloodPressure, heartRate, glucose, oxygen } = req.body;
  
  // Simple prediction logic
  const riskScore = calculateRisk(bloodPressure, heartRate, glucose, oxygen);
  const prediction = {
    timestamp: new Date(),
    riskScore,
    status: riskScore > 70 ? 'HIGH_RISK' : 'NORMAL',
    metrics: { bloodPressure, heartRate, glucose, oxygen }
  };
  
  healthMetrics.push(prediction);
  io.emit('prediction', prediction); // Broadcast to all clients
  
  res.json({ success: true, prediction });
});

// WebSocket: Real-time health monitoring
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  // Send current metrics to new client
  socket.emit('metrics_history', healthMetrics.slice(-100));
  
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

function calculateRisk(bp: number, hr: number, glucose: number, o2: number): number {
  let risk = 0;
  if (bp > 140) risk += 30;
  if (hr > 100 || hr < 60) risk += 25;
  if (glucose > 200) risk += 30;
  if (o2 < 95) risk += 15;
  return Math.min(risk, 100);
}

httpServer.listen(4000, () => {
  console.log('\ud83d\ude80 Healthcare Analytics Server running on http://localhost:4000');
  console.log('\ud83d\udcca WebSocket: ws://localhost:4000');
});
```

### Step 3: Create Frontend (src/Dashboard.tsx)
```tsx
'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface HealthPrediction {
  timestamp: string;
  riskScore: number;
  status: string;
  metrics: { bloodPressure: number; heartRate: number; glucose: number; oxygen: number };
}

export default function Dashboard() {
  const [predictions, setPredictions] = useState<HealthPrediction[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:4000');
    
    socket.on('connect', () => setConnected(true));
    socket.on('metrics_history', (data) => setPredictions(data));
    socket.on('prediction', (data) => {
      setPredictions(prev => [...prev, data].slice(-50));
    });
    
    return () => socket.disconnect();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🏥 Healthcare Analytics Dashboard</h1>
      <p>Status: {connected ? '✅ Connected' : '❌ Disconnected'}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {predictions.length > 0 && (
          <>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
              <h3>Latest Risk Score</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{predictions[predictions.length - 1].riskScore}</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
              <h3>Status</h3>
              <p style={{ fontSize: '18px', color: predictions[predictions.length - 1].riskScore > 70 ? 'red' : 'green' }}>
                {predictions[predictions.length - 1].status}
              </p>
            </div>
          </>
        )}
      </div>
      
      <h2>Prediction History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            <th style={{ padding: '0.5rem' }}>Timestamp</th>
            <th style={{ padding: '0.5rem' }}>Risk Score</th>
            <th style={{ padding: '0.5rem' }}>Status</th>
            <th style={{ padding: '0.5rem' }}>Heart Rate</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((p, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.5rem' }}>{new Date(p.timestamp).toLocaleTimeString()}</td>
              <td style={{ padding: '0.5rem' }}>{p.riskScore}</td>
              <td style={{ padding: '0.5rem' }}>{p.status}</td>
              <td style={{ padding: '0.5rem' }}>{p.metrics.heartRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Step 4: Run the Application
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd ../frontend
npm install
npm run dev
```

Access at: `http://localhost:3000`

## 🎯 Architecture

```
Predictive Healthcare Analytics Engine
├── Backend (NestJS/Express)
│   ├── /api/predictions (REST)
│   ├── WebSocket for real-time metrics
│   └── Health prediction engine
├── Frontend (Next.js/React)
│   ├── Real-time dashboard
│   ├── Prediction charts
│   └── Risk alerts
└── Database (MongoDB/PostgreSQL)
    └── Health records + predictions
```

## 📊 Features

- ✅ Real-time health metric streaming
- ✅ Predictive risk scoring
- ✅ WebSocket live updates
- ✅ REST API for integrations
- ✅ Time-series data storage
- ✅ Alerting system

## 🚀 Deployment

### Heroku (Backend)
```bash
git push heroku main
```

### Vercel (Frontend)
```bash
vercel deploy
```

## 📝 Environment Variables
```
NODE_ENV=production
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_secret
CORS_ORIGIN=https://yourdomain.com
```
