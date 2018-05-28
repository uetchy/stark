import yuno from 'yunodb'

const dbPath = './stars_db'

export function initDatabase(callback: Function) {
  return yuno(
    {
      location: dbPath,
      keyField: 'id',
      indexMap: { name: false, description: true, readme: true },
    },
    callback
  )
}
