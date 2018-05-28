import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'

let mainWindow: Electron.BrowserWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true,
    })
  )

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// const configStore = new ConfigStore()

// async function init() {
//   const config = await configStore.load()
//   const apiClient = new GitHubAPI(config.githubToken)

//   initDatabase((err: Error, db) => {
//     if (err) throw err

//     apiClient.starredWithReadme(record => {
//       db.add([record], (err: Error) => {
//         if (err) {
//           console.log('db error:', err)
//           return
//         }

//         configStore.save({
//           lastStarred: record.starred_at,
//           lastUpdated: new Date(),
//         })

//         console.log('added to database', record.full_name)
//       })
//     })
//   })
// }
