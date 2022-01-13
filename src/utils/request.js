// @ts-check

const PromiseOptions = require('./Promises')

/**
 * Used to throw an error if the promise is still pending after the given time
 * @example
 * const promiseFunction = async () => {
 * 
 *      const promise = new PromiseOptions();
 *      
 *      detectTimeout(promise , 1000 , 'Error Message');
 *      
 *      new Promise((resolve , reject) => setTimeout(resolve , 3000))
 *      .then(promise.SetResolved)
 *      .catch(promise.setRejected)
 *      
 * })
 * @param {PromiseOptions} promise The promise to be checked
 * @param {Number} ms Timeout in ms
 * @param {String} error The error to be thrown if the promise is still pending
 * @param {any} [reject] Reject function of the parent promise *(if not provided , will use `throw new Error()`)*
 * @returns {Promise} Timer ID
 */

const detectTimeout = async(promise , ms , error , reject) => {
    await sleep(ms);

    if(!promise.isPending) return;

    promise.setRejected();

    if(!reject) throw new Error(error);

    reject(error)
}


/**
 * used to stop the proccess until the given time range has been fulfilled
 * @param {Number} ms timeout in ms
 * @returns {Promise}
 */

const sleep = ms => new Promise((resolve) => setTimeout(resolve , ms));


module.exports = { detectTimeout , sleep };
