const { initDatabase } = require('./lib/database')
const ConfigStore = require('./lib/config')
const GitHubAPI = require('./lib/api')

const configStore = new ConfigStore()

async function init() {
  const config = await configStore.load()
  const apiClient = new GitHubAPI(config.githubToken)

  initDatabase((err, db) => {
    if (err) throw err

    apiClient.starredWithReadme(record => {
      db.add([record], err => {
        if (err) {
          console.log('db error:', err)
          return
        }

        configStore.save({
          lastStarred: record.starred_at,
          lastUpdated: new Date()
        })

        console.log('added to database', record.full_name)
      })
    })
  })
}

init()
