import * as fs from 'fs'
import { promisify } from 'util'

interface Config {
  [index: string]: string
}

export class ConfigStore {
  configPath: string
  config: Config

  constructor(configPath = './config.json') {
    this.configPath = configPath
    this.config = {}
  }

  async load() {
    try {
      const data = await promisify(fs.readFile)(this.configPath, 'utf8')
      this.config = JSON.parse(data)
      return this.config
    } catch (err) {
      Promise.reject('No config')
    }
  }

  save(delta = {}): Promise<any> {
    const combinedConfig = Object.assign(this.config, delta)
    return promisify(fs.writeFile)(
      this.configPath,
      JSON.stringify(combinedConfig, null, 2)
    )
  }

  get(key: string) {
    return this.config[key]
  }

  set(key: string, value: any) {
    this.config[key] = value
    return { key: value }
  }
}
