const take = (jobName, { interval=2000 }) => {
  return detect => {
    const job = judge => async execute => {
      const res = await detect()
      if(!judge(res)) {
        if (typeof interval === 'function') {
          interval = interval()
        }
        setTimeout(() => {
          job(judge)(execute)
        }, interval)
      } else {
        await execute(res)
      }
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
