import { neonDb } from './connection-neon'
import { postgresDb } from './connection-postgres'

const useNeon = process.env.USE_NEON === 'true'

export const db = useNeon ? neonDb : postgresDb
