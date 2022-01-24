// @ts-check


/**
 * used to stop the proccess until the given time range has been fulfilled
 * @param {Number} ms timeout in ms
 * @returns {Promise}
 */

const sleep = ms => new Promise((resolve) => setTimeout(resolve , ms));


module.exports = { sleep };
