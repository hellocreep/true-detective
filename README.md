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
  // step one
  // detect something
  return fetch('https://api.github.com/users/github')
    .then((res) => {
      return res.json()
    })
})((res, times) => {
  // step two
  // check the result
  if (times > 5) {
    return true
  }
})((res, times) => {
  // step three
  // execution
  // tigger something here
})
```

Or with `forever` run this job in the background.

`forever start -c 'babel-node' -m 1 job.js`

## API

### detective.take(jobName, [options])(detectFn)(judgeFn)(executeFn)

This is the only method of detective, with 3 steps to do its job.

#### detectFn

DetectFn as the first step, should be a function and must return a `Promise`.

#### judgeFn(result, times)

JudgeFn is the second step, it receives tow params, the result from detectFn, and times this Job ran. this Function is for user to check if this detective got the truth, if so, return true. The job will be completed after that.

#### executeFn(result, times)

ExecuteFn is the last step of the Job, will be triggered when judgeFn return true.

#### options

* interval[Number|Function] the interval(second) of the running job, default to be 1
* logPath[String] log path of the running job, default to be 'detective.log'
