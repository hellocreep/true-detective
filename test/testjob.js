import fetch from 'node-fetch'
import detective from '../src/index'

let times = 0

detective.take('job', {
  interval: 2000
})(() => {
  return fetch('https://api.github.com/users/github')
    .then((res) => {
      times++
      return res.json()
    })
})((res) => {
  console.log('job ran ' + times)
  if (times > 10) {
    return true
  }
})((res) => {
  console.log('done')
})
