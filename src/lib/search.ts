import { initDatabase } from './database'

initDatabase((err: Error, db) => {
  if (err) throw err

  const cursor = db.search(process.argv[2], (err: Error, results) => {
    if (err) throw err

    console.log(results.totalHits)
    console.log(results.hits.map(hit => JSON.parse(hit.document).full_name))
  })
})
