//@ts-check
const PromiseOptions = require('../PromiseOptions');

const handleInfoPromise = (link , error_code , cl , params , method) => new Promise(async(resolve , reject) => {

    const promise = new PromiseOptions();
    promise.autoReject(12000 , '#DM06' , reject);

    try{    

        let info;

        if(method){

            if(params?.length > 0){

                info = await cl[method](link , ...params);
                
            }else{

                info = await cl[method](link);

            }


        }else{

            if(params?.length > 0){

                info = await cl(link , ...params);
                
            }else{

                info = await cl(link);

            }

        }

        if(!promise.isPending) return;

        promise.setFullfilled();

        resolve(info);


    }catch(err){

        console.log(err)

        if(!promise.isPending) return;

        promise.setRejected();

        reject(error_code);

    }

}) 


module.exports = { handleInfoPromise };