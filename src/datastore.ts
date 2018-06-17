import * as nedb from 'nedb'
import { promisify } from 'util'

export class Datastore {
  db: nedb
  dbPath: string
  _insert: Function
  _update: Function
  _find: Function
  _findOne: Function

  constructor(dbPath: string) {
    this.dbPath = dbPath
    this.db = new nedb({ filename: this.dbPath, autoload: true })
    this._insert = promisify(this.db.insert.bind(this.db))
    this._update = promisify(this.db.update.bind(this.db))
    this._find = promisify(this.db.find.bind(this.db))
    this._findOne = promisify(this.db.findOne.bind(this.db))
  }

  async insert(newDoc: any) {
    return this._insert(newDoc)
  }

  async update(query: any, target: any) {
    return this._update(query, target)
  }

  async findById(id: number) {
    return this._findOne({ id })
  }

  async find(query: any) {
    return this._find(query)
  }

  async exist(id: number) {
    const result = await this.findById(id)
    return result != null
  }
}
