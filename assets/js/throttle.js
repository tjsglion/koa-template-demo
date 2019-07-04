class Throttle {
  constructor () {
    version: '0.1'
  }

  useThrottle (fn, wait) {
    let timer;
    return function (...args) {
      if (!timer) {
        timer = setTimeout(() => timer = null, wait);
        return fn.apply(this, args);
      }
    }
  }
}