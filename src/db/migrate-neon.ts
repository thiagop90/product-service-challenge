import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'

import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'

config({ path: '.env' })

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

await migrate(db, { migrationsFolder: 'migrations' })

console.log('Migrations applied successfully!')

process.exit(0)
