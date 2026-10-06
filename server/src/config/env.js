import 'dotenv/config';

const num = (value, fallback) =>
  value === undefined || value === '' ? fallback : Number(value);

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: num(process.env.PORT, 3000),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',

  mongodbUri: process.env.MONGODB_URI ?? '',

  jwtSecret: process.env.JWT_SECRET ?? 'dev-only-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',

  geminiApiKey: process.env.GEMINI_API_KEY ?? '',
  geminiModel: process.env.GEMINI_MODEL ?? '',

  openMeteoBaseUrl: process.env.OPEN_METEO_BASE_URL ?? 'https://api.open-meteo.com/v1',
  gdacsBaseUrl: process.env.GDACS_BASE_URL ?? '',

  tiktokOembedUrl: process.env.TIKTOK_OEMBED_URL ?? 'https://www.tiktok.com/oembed',

  stbApiKey: process.env.STB_API_KEY ?? '',
  travelBuddyApiKey: process.env.TRAVEL_BUDDY_API_KEY ?? '',
  tripcomApiKey: process.env.TRIPCOM_API_KEY ?? '',
};

if (env.isProd && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in production');
}
