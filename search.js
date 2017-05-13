const { initDatabase } = require('./lib/database')

initDatabase((err, db) => {
  if (err) throw err

  const cursor = db.search(process.argv[2], (err, results) => {
    if (err) throw err

    console.log(results.totalHits)
    console.log(results.hits.map(hit => JSON.parse(hit.document).full_name))
  })
})
