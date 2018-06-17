import { remote } from 'electron'
import { join } from 'path'

export function getDBPath() {
  return join(remote.app.getPath('userData'), 'stars.db')
}
