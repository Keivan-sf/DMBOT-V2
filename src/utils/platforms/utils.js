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

const numberToTimestamp = {

    /**
     * 
     * @param {Number} duration 
     */

    convert(duration , unit="second"){

        let seconds = duration;
    
        if(unit === "milisecond") seconds /= 1000;
    
        let sec = seconds%60;
        let hours = Math.floor(seconds/3600);
        let min = Math.floor(seconds/60) % 60;
    
        const time = [hours , min , sec]
    
        .map(part => part.toString().padStart(2 , "0"))
        
         // filters out "seconds" and "minutes" regardless of their value and filter "hours" if its value is not "00" 
         
        .filter((part , index) => part !== "00" || index > 0)
        
        .join(':') 
    
        return time;

    },

    reverse(){

    }
}

const convertToDmFriendly = (info , platform , type) => {
    
}


module.exports = { handleInfoPromise , numberToTimestamp};