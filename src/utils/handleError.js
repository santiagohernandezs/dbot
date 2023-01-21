const chalk = require('chalk')

function handleError(err) {
  console.log(chalk.yellowBright(`Quizás debas revisar algo`))
  throw Error(chalk.red(`Error: ${err.message}\nStack: ${err.stack}`))
}

module.exports = {
  handleError
}
