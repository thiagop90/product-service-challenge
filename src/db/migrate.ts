import { config } from 'dotenv'
import postgres from 'postgres'

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

config({ path: '.env' })

const connection = postgres(process.env.DATABASE_URL!, { max: 1 })
const db = drizzle(connection)

await migrate(db, { migrationsFolder: 'migrations' })

console.log('Migrations applied successfully!')

await connection.end()

process.exit()
