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
  return fetch('http://somesite.com')
    .then((res) => {
      return res.json()
    })
})((res) => {
  // step two
  // check the result
  if (res.evidence) {
    return true
  }
})((res) => {
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

#### options

* interval[Number|Function] the interval of the running job, default to be 2s

#### detectFn

DetectFn as the first step, should be a function and must return a `Promise`.

#### judgeFn(result)

JudgeFn is the second step, it receives just on param, the result from detectFn, this Function is for user to check if this detective got the truth, if so, return true. The job will be completed after that.

#### executeFn(result)

ExecuteFn is the last step of the Job, will be triggered when judgeFn return true.
