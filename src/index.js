const take = (jobName, { interval=2000 }) => {
  return detect => {
    const job = judge => execute => {
      return detect().then((res) => {
        if(!judge(res)) {
          if (typeof interval === 'function') {
            interval = interval()
          }
          setTimeout(() => {
            job(judge)(execute)
          }, interval)
          return res
        } else {
          return execute(res)
        }
      })
    }
    return judge => {
      return execute => {
        return job(judge)(execute)
      }
    }
  }
}

export default {
  take
}
