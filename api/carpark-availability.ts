import type { Request, Response } from 'express';

const LTA_DATAMALL_ENDPOINT = 'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2';

export interface LTACarParkRecord {
  CarParkID: string;
  Area: string;
  Development: string;
  Location: string;
  AvailableLots: number;
  LotType: 'C' | 'Y' | 'H';
  Agency: 'HDB' | 'LTA' | 'URA' | string;
}

export interface LTACarParkResponse {
  'odata.metadata'?: string;
  value: LTACarParkRecord[];
}

export interface NormalizedCarPark {
  id: string;
  carparkNo: string;
  development: string;
  area: string;
  agency: string;
  lotType: 'C' | 'Y' | 'H';
  availableLots: number;
  lat: number | null;
  lng: number | null;
}

export interface ApiResponsePayload {
  status: 'success' | 'awaiting_api_key' | 'error';
  message: string;
  endpoint: string;
  timestamp: string;
  source: 'LTA DataMall' | 'Unconfigured';
  totalRecords: number;
  data: NormalizedCarPark[];
  value: LTACarParkRecord[];
}

/**
 * Serverless / Express handler for live LTA DataMall CarParkAvailabilityv2
 * GET /api/carpark-availability
 */
export default async function handler(req: Request, res: Response): Promise<void> {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Retrieve AccountKey from environment or optionally from request header
  const accountKey = 
    process.env.LTA_ACCOUNT_KEY || 
    process.env.LTA_DATAMALL_KEY || 
    process.env.ACCOUNT_KEY || 
    (typeof req.headers['accountkey'] === 'string' ? req.headers['accountkey'] : undefined);

  const timestamp = new Date().toISOString();

  // If key is not configured yet
  if (!accountKey || accountKey.trim().length === 0) {
    res.status(200).json({
      status: 'awaiting_api_key',
      message: 'LTA_ACCOUNT_KEY is not configured yet. Set LTA_ACCOUNT_KEY in your environment variables to pull live lots from LTA DataMall.',
      endpoint: LTA_DATAMALL_ENDPOINT,
      timestamp,
      source: 'Unconfigured',
      totalRecords: 0,
      data: [],
      value: []
    } satisfies ApiResponsePayload);
    return;
  }

  try {
    const fetchAll = req.query.all === 'true';
    const skipParam = typeof req.query.skip === 'string' ? req.query.skip : '0';

    let records: LTACarParkRecord[] = [];

    // Function to fetch a batch from LTA
    const fetchBatch = async (skip: number): Promise<LTACarParkRecord[]> => {
      const url = skip > 0 ? `${LTA_DATAMALL_ENDPOINT}?$skip=${skip}` : LTA_DATAMALL_ENDPOINT;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const ltaRes = await fetch(url, {
        method: 'GET',
        headers: {
          'AccountKey': accountKey.trim(),
          'Accept': 'application/json'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!ltaRes.ok) {
        throw new Error(`LTA DataMall responded with HTTP status ${ltaRes.status} (${ltaRes.statusText})`);
      }

      const json: LTACarParkResponse = await ltaRes.json();
      return json.value || [];
    };

    if (fetchAll) {
      // LTA returns up to 500 records per call; fetch pages until exhausted or limit reached
      let currentSkip = 0;
      let hasMore = true;
      const maxPages = 6; // Safety cap (up to 3000 records)
      let page = 0;

      while (hasMore && page < maxPages) {
        const batch = await fetchBatch(currentSkip);
        if (batch.length === 0) {
          hasMore = false;
        } else {
          records.push(...batch);
          if (batch.length < 500) {
            hasMore = false;
          } else {
            currentSkip += 500;
            page++;
          }
        }
      }
    } else {
      const skipNum = parseInt(skipParam, 10) || 0;
      records = await fetchBatch(skipNum);
    }

    // Normalize carparks and parse coordinates
    const normalized: NormalizedCarPark[] = records.map(r => {
      let lat: number | null = null;
      let lng: number | null = null;

      if (r.Location && typeof r.Location === 'string') {
        const parts = r.Location.trim().split(/\s+/);
        if (parts.length >= 2) {
          const parsedLat = parseFloat(parts[0]);
          const parsedLng = parseFloat(parts[1]);
          if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
            lat = parsedLat;
            lng = parsedLng;
          }
        }
      }

      return {
        id: `${r.Agency}-${r.CarParkID}`,
        carparkNo: r.CarParkID,
        development: r.Development,
        area: r.Area,
        agency: r.Agency,
        lotType: r.LotType,
        availableLots: typeof r.AvailableLots === 'number' ? r.AvailableLots : parseInt(String(r.AvailableLots), 10) || 0,
        lat,
        lng
      };
    });

    res.status(200).json({
      status: 'success',
      message: `Successfully retrieved ${records.length} carpark records from LTA DataMall`,
      endpoint: LTA_DATAMALL_ENDPOINT,
      timestamp,
      source: 'LTA DataMall',
      totalRecords: records.length,
      data: normalized,
      value: records
    } satisfies ApiResponsePayload);

  } catch (error: any) {
    console.error('Error connecting to LTA DataMall:', error);
    res.status(502).json({
      status: 'error',
      message: error?.message || 'Failed to connect to LTA DataMall',
      endpoint: LTA_DATAMALL_ENDPOINT,
      timestamp,
      source: 'LTA DataMall',
      totalRecords: 0,
      data: [],
      value: []
    } satisfies ApiResponsePayload);
  }
}

export { handler };
