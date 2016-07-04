import fetch from 'node-fetch'
import detective from '../src/index'

detective.take('job', {
  interval: 2
})(() => {
  return fetch('https://api.github.com/users/github')
    .then((res) => {
      return res.json()
    })
})((res, times) => {
  if (times > 5) {
    return true
  }
})((res, times) => {
  console.log('done')
})
