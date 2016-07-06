import sleep from 'sleep'

const take = (jobName, ...args) => {
  let { interval } = args
  return detect => {
    return judge => execute => job(judge)(execute)

    function job(judge) {
      return execute => {
        return detect().then((res) => {
          let judgeResult = judge(res)
          const next = evidence => {
            if (!evidence) {
              if (typeof interval === 'function') {
                interval = interval()
              }
              sleep.sleep(interval || 2)
              return job(judge)(execute)
            } else {
              return execute(res)
            }
          }
          if (judgeResult instanceof Promise) {
            return judgeResult.then(evidence => next(evidence))
          } else {
            return next(judgeResult)
          }
        })
      }
    }
  }
}

export default {
  take
}
