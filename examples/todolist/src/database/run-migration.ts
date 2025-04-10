import { dataSource } from './data-source'

async function runMigrations() {
  await dataSource.initialize()
}

runMigrations().catch((error) => {
  console.error('Error during migrations', error)
})
