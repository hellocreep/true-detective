import sleep from 'sleep'
import moment from 'moment'
import winston from 'winston'

const createLogger = (logPath) => {
  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({
        filename: logPath,
        timestamp: () => {
          return moment().format('YYYY-M-D h:mm:ss a')
        }
       })
    ]
  })
}

const take = (jobName, { interval='1', logPath='detective.log' }) => {
  let times = 0
  const logger = createLogger(logPath)
  return detect => {
    const job = async judge => {
      const res = await detect()
      if(!judge(res, ++times)) {
        if (typeof interval === 'function') {
          interval = interval()
        }
        logger.info(`${jobName} ran ${times} times`)
        sleep.sleep(interval)
        job(judge)
      } else {
        logger.info(`${jobName} completed`)
      }
    }
    return judge => {
      return job(judge)
    }
  }
}

export default {
  take
}
