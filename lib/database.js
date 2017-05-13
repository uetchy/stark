const yuno = require('yunodb')

const dbPath = './stars_db'

function initDatabase(callback) {
  return yuno({
    location: dbPath,
    keyField: 'id',
    indexMap: {name: false, description: true, readme: true},
  }, callback)
}

module.exports = {
  initDatabase
}
