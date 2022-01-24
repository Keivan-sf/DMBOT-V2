/**
 * Used to provide necessary options for Promise handling. **Such as:**
 * 
 * - Simulate the state of a promise being `pedning` / `rejected` / `fullfilled`
 * 
 * - Simulate auto rejecting after the provided time 
 * 
 * ### Usage:
 * 
 * **1. There needs to be an actual promise to handle**
 * 
 * **2. An object of `PromiseOptions` must be created**
 * 
 * ### Simulate the state of a promise example
 * 
 * ```
 * const doSth = () => {
 * 
 *      const promise = new PromiseOptions();
 * 
 *      new Promise((resolve , reject) => setTimeout(resolve , 2000)) 
 * 
 *      .then(()=> {
 *      
 *          promise.setFullfilled();
 *      
 *          console.log(promise.isPending) // false
 * 
 *          console.log(promise.isRejected) // false
 * 
 *          console.log(promise.isResovled) // true
 * 
 *      })
 * 
 *      .catch(()=> {
 * 
 *          promise.setRejected();
 * 
 *          console.log(promise.isPending) // false
 * 
 *          console.log(promise.isRejected) // true
 * 
 *          console.log(promise.isResovled) // false
 * 
 *      })
 * 
 * }
 * ```
 * 
 * ### Simulate auto rejection after a time example
 * 
 * ```
 * const doSth = () => new Promise((resolve , reject) => {
 * 
 *      const promise = new PromiseOptions();
 * 
 *      promise.autoReject(1000 , 'The promise took too long' , reject);
 * 
 *      new Promise((resolve , reject) => setTimeout(resolve , 2000))
 * 
 *      .then(()=> {
 *          promise.setFullfilled();
 *      })
 * 
 *      .catch(()=> {
 *          promise.setRejected();
 *      })
 * 
 * })
 *      
 * ```
 * 
 */
class PromiseOptions{

    #status = {
        isRejected : false,
        isResolved : false,
        isPending : true,
        timer : null,
    }

    /**
     * Auto rejects itself and calls upon the provided `reject()` function
     * @param {Number} ms The maximum time for the promise to be fullfilled or rejected
     * @param {String} error The error message to be called upon `reject()`
     * @param {*} reject The `reject()` function to throw the error into. **If not provided** , it will throw the error via `throw new Error()`
     */

    autoReject(ms , error , reject){

        this.#status.timer = setTimeout(() =>{

            if(!this.#status.isPending) return;

            this.setRejected();
        
            if(!reject) throw new Error(error);
        
            reject(error)

        } , ms)

    }

    setRejected(){
        if(!this.#status.isPending) return;
        this.#status.isPending = false;
        this.#status.isRejected = true;
        if(this.#status.timer) clearTimeout(this.#status.timer);
    }

    setFullfilled(){
        if(!this.#status.isPending) return;
        this.#status.isPending = false;
        this.#status.isResolved = true;
        if(this.#status.timer) clearTimeout(this.#status.timer);
    }

    get isRejected(){
        return this.#status.isRejected;
    }

    get isResovled(){
        return this.#status.isResolved;
    }

    get isPending(){
        return this.#status.isPending;
    }

}

module.exports = PromiseOptions;