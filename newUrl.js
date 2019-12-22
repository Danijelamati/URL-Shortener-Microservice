const dns = require("dns");
const Shortener = require("./model");

const newUrl = async function(req, res) {
  try{
    const regex = /^(https?:\/\/)/g;
    let url = req.body.url.replace(regex, "");
    
    if(url[url.length-1] === "/") url = url.slice(0,-1);   

    const lookup = await dns.promises.lookup(url);
    
    const finds = await Shortener.find({location: url});
    
    if(finds.length) return res.json({"original_url":finds[0].location,"short_url": finds[0].name});
    
    let count = await Shortener.countDocuments({});
    count++;
    
    const shorty = new Shortener({name: count, location: url});
                                   
    const save = await shorty.save();
                
    return res.json({"original_url":shorty.location,"short_url": shorty.name});
   
    
  }catch(err){
    console.log(err);
    return res.json({"error":"invalid URL"});
  }
};


module.exports = newUrl;
