//@ts-check
const PromiseOptions = require('../PromiseOptions');

const handleInfoPromise = (link , error_code , cl , method) => new Promise(async(resolve , reject) => {

    const promise = new PromiseOptions();
    promise.autoReject(12000 , '#DM06' , reject);

    try{    

        let info;

        if(method){
            info = await cl[method](link);
        }else{
            info = await cl(link);
        }

        if(!promise.isPending) return;

        promise.setFullfilled();

        resolve(info);


    }catch(err){

        if(!promise.isPending) return;

        promise.setRejected();

        reject(error_code);

    }

}) 


module.exports = { handleInfoPromise };