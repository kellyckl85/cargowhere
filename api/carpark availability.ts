// Re-export handler for /api/carpark availability.ts
import handler, { 
  LTACarParkRecord, 
  LTACarParkResponse, 
  NormalizedCarPark, 
  ApiResponsePayload 
} from './carpark-availability';

export default handler;
export { 
  handler, 
  type LTACarParkRecord, 
  type LTACarParkResponse, 
  type NormalizedCarPark, 
  type ApiResponsePayload 
};
