import * as Datastore from 'nedb'
import { app } from 'electron'
import { join } from 'path'

const dbPath = join(app.getPath('userData'), 'stars.db')

export function createDatastore() {
  return new Datastore({ filename: dbPath, autoload: true })
}
