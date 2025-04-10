/* eslint-disable @typescript-eslint/no-var-requires */

import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import * as fs from 'fs'
import * as path from 'path'
import { Config } from 'src/config/config'
import { Category, Todolist } from 'src/entities'

config({
  path: __dirname + '/../../.env'
})

const migrationDirectory = path.join(__dirname, 'migration')
const migrationFiles = fs.readdirSync(migrationDirectory).filter((file) => file.endsWith('.js'))

const migrations = migrationFiles.map((file) => {
  const requiredModule = require(path.join(migrationDirectory, file))
  return requiredModule[Object.keys(requiredModule)[0]]
})

export const dataSource = new DataSource({
  type: 'postgres',
  host: Config.db.host,
  port: Number(Config.db.port),
  password: Config.db.password,
  username: Config.db.username,
  entities: [Category, Todolist],
  database: Config.db.database,
  logging: true,
  migrations
})
