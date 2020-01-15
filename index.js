const md5 = require('md5');

function Get (req,url) {
    if(!req.session.cache){
        req.session.cache={};
        req.session.cacheExpiry={};
        // console.log('we set again')
    }

    if(req.session.cache[md5(url)] && req.session.cacheExpiry[md5(url)] > Date.now() ){
        return req.session.cache[md5(url)]
    }else{
        return false;

    }


}


function Set (req,url,payload,minutes_time) {

    if(!req.session.cache){
        req.session.cache=[]
    }
    req.session.cache[md5(url)] = payload;

    const now = new Date();
    now.setMinutes(now.getMinutes() + minutes_time); // timestamp
    let future = new Date(now); // Date object
    req.session.cacheExpiry[md5(url)] = future.getTime();

}

module.exports = {
    Get,Set
};



