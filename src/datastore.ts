import * as nedb from 'nedb'
import { app } from 'electron'
import { join } from 'path'
import { promisify } from 'util'

export class Datastore {
  db: nedb
  dbPath: string
  _insert: any

  constructor() {
    if (process.env.NODE_ENV == 'production') {
      this.dbPath = join(app.getPath('userData'), 'stars.db')
    } else {
      this.dbPath = './stars.db'
    }
    this.db = new nedb({ filename: this.dbPath, autoload: true })
    this._insert = promisify(this.db.insert.bind(this.db))
  }

  async insert(newDoc: any) {
    return this._insert(newDoc)
  }
}
