const chalk = require('chalk')

module.exports = {
  name: 'connected',
  execute(err) {
    err ? console.log(chalk.red(`[Database Status]: Error: ${err}`)) : null
  }
}
