import { createClient } from '@supabase/supabase-js';
import { RealtimeClient } from '@supabase/realtime-js';

import { Database } from './database.types';

const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

/**
 * develop: 'ws://localhost:5042/socket'
 * product: 'wss://<project_ref>.supabase.co/realtime/v1'
 */
const REATIME_URL = import.meta.env.DEV
  ? 'ws://localhost:5042/socket'
  : `${import.meta.env.VITE_SUPABASE_PROJECT_REF}/realtime/v1`;

/**
 * Supabase realtime client usage: https://github.com/supabase/realtime-js
 */
const realtimeClient = new RealtimeClient(REATIME_URL, { params: { apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY } });

/**
 * connect QR-order project channel
 */
export const channel = realtimeClient.channel('qr-order-orderList-realtime');

export default supabase;
