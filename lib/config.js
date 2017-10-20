const fs = require('fs-promise');
const extend = require('util')._extend;

module.exports = class ConfigStore {
  constructor(configPath = './config.json') {
    this.configPath = configPath;
    this.config = {};
  }

  async load() {
    try {
      const data = await fs.readFile(this.configPath, 'utf8');
      this.config = JSON.parse(data);
      return this.config;
    } catch (err) {
      Promise.reject('No config');
    }
  }

  save(delta = {}) {
    const combinedConfig = extend(this.config, delta);
    return fs.writeFile(
      this.configPath,
      JSON.stringify(combinedConfig, null, 2)
    );
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    this.config[key] = value;
    return { key: value };
  }
};
