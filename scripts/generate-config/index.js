require('dotenv').config();

process.env['NODE_CONFIG_DIR'] = __dirname + '/../../config';

const config = require('config');
const fse = require('fs-extra');
const path = require('path');

try {
  const configFile = path.join(__dirname, '/../../src/config/default.json');
  const content = config.get('content');

  fse.writeJSON(configFile, content, (err) => {
    if (err) {
      console.error(err);
    }

    console.error(`Config generated ${configFile}`);
  });
} catch (err) {
  console.error('Error while generating config', err.message);
  process.exit(1);
}
