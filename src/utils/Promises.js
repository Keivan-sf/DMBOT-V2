class PromiseOptions{

    #status = {
        isRejected : false,
        isResolved : false,
        isPending : true,
    }

    setRejected(){
        this.#status.isPending = false;
        this.#status.isRejected = true;
    }

    setFullfilled(){
        this.#status.isPending = false;
        this.#status.isResolved = true;
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