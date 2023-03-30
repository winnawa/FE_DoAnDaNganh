import { LampStatus } from './lamp-status';

export interface Lamp {
  id: string;
  status: LampStatus;
  name?: string;
  note?: string;
  imageUrl?: string;
}
