import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'
import postgres from 'postgres'
import { config } from 'dotenv'

config({ path: '.env' })

const client = postgres(process.env.DATABASE_URL!, { max: 1 })

export const postgresDb = drizzle(client, { schema })
