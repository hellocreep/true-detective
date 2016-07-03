# True Detective

Simple wrapper for persistent detecting something until get the truth.

## Usage

### Installation

`npm install true-detective`

### Example

```js
import detective from 'true-detective'
import fetch from 'node-fetch'

detective.take('job', {
  interval: () => {
    return 2
  }
})(() => {
  return fetch('https://api.github.com/users/github')
    .then((res) => {
      return res.json()
    })
})((res, times) => {
  if (times > 5) {
    // trigger something here
    return true
  }
})
```

Or with `forever` run this job in the background.

`forever start -c 'babel-node' -m 1 job.js`

## API

### detective.take(jobName, [options])(detectFn)(judgeFn)

This is the only method of detective.

`detective.take` will return a function which has a callback for any web detections function in there, and must return a `Promise`.

And then it will return another function which has a callback for user to check if this detective got the truth, if so, return true. The job will be completed after that.

#### options

* interval[Number|Function] the interval(second) of the running job, default to be 1
* logPath[String] log path of the running job, default to be 'detective.log'
