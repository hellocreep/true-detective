import fetch from 'node-fetch'
import detective from '../src/index'

let times = 0

detective.take('job', {
  interval: 1
})(() => {
  return fetch('https://api.github.com/users/github')
    .then((res) => {
      times++
      return res.json()
    })
})((res) => {
  console.log('job ran ' + times)
  return new Promise(resolve => {
    setTimeout(() => {
      if (times > 5) {
        resolve(true)
      } else {
        resolve(false)
      }
    }, 2000)
  })
})((res) => {
  console.log('done')
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(res)
    }, 2000)
  })
}).then((res) => {
  console.log(res)
})
