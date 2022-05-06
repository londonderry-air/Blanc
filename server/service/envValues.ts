import dotenv from 'dotenv'

dotenv.config()

const API_JWT_SECRET = process.env.API_JWT_SECRET ?? ''
const API_USER_ID = process.env.API_USER_ID ?? ''
const API_USER_PASS = process.env.API_USER_PASS ?? ''
const API_SERVER_PORT = process.env.PORT ?? process.env.API_SERVER_PORT ?? '8080'
const API_BASE_PATH = process.env.API_BASE_PATH ?? ''
const API_ORIGIN = process.env.API_ORIGIN ?? ''
const API_UPLOAD_DIR = process.env.API_UPLOAD_DIR ?? ''
const BLANC_ADMIN_ORIGIN = process.env.BLANC_ADMIN_ORIGIN ?? 'http://localhost:8000'
const BLANC_CLIENT_ORIGIN = process.env.BLANC_CLIENT_ORIGIN ?? 'http://localhost:8000'
const GCP_BUCKETNAME = process.env.GCP_BUCKETNAME ?? ''
const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID ?? ''
const GCP_CLIENT_EMAIL = process.env.GCP_CLIENT_EMAIL ?? ''
const GCP_PRIVATE_KEY = process.env.GCP_PRIVATE_KEY ? process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n') : ''

export {
  API_JWT_SECRET,
  API_USER_ID,
  API_USER_PASS,
  API_SERVER_PORT,
  API_BASE_PATH,
  API_ORIGIN,
  API_UPLOAD_DIR,
  BLANC_CLIENT_ORIGIN,
  BLANC_ADMIN_ORIGIN,
  GCP_BUCKETNAME,
  GCP_PROJECT_ID,
  GCP_CLIENT_EMAIL,
  GCP_PRIVATE_KEY
}
