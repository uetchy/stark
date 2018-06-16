import * as Datastore from 'nedb'
import { app } from 'electron'
import { join } from 'path'

let dbPath: string
if (process.env.NODE_ENV == 'production') {
  dbPath = join(app.getPath('userData'), 'stars.db')
} else {
  dbPath = './stars.db'
}

export function createDatastore() {
  return new Datastore({ filename: dbPath, autoload: true })
}
