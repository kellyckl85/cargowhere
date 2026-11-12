import type { Request, Response } from 'express';

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded';
  service: string;
  timestamp: string;
  uptimeSeconds: number;
  environment: {
    nodeEnv: string;
    hasLtaKey: boolean;
    ltaKeyConfigured: boolean;
  };
  endpoints: {
    carparkAvailability: string;
    health: string;
  };
}

/**
 * Serverless / Express health check handler
 * GET /api/health
 */
export default async function handler(req: Request, res: Response): Promise<void> {
  const ltaKey = process.env.LTA_ACCOUNT_KEY || process.env.LTA_DATAMALL_KEY || process.env.ACCOUNT_KEY;
  const hasKey = Boolean(ltaKey && ltaKey.trim().length > 0);

  const responsePayload: HealthCheckResponse = {
    status: 'healthy',
    service: 'SG ParkPulse - LTA DataMall Connector',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      hasLtaKey: hasKey,
      ltaKeyConfigured: hasKey
    },
    endpoints: {
      carparkAvailability: '/api/carpark-availability',
      health: '/api/health'
    }
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.status(200).json(responsePayload);
}

export { handler };
