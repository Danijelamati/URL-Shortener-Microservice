const Shortener = require("./model");

const shortUrl = function(req,res){
  
  const {shortURL} = req.params;
    
  Shortener.find({name: shortURL}, function(err, data){
    
    if(err || !data.length) return res.json({error:"No short url found for given input"});
        
    const page = "http://" + data[0].location;
    
    res.redirect(page);
    
  }) 
  
  
}


module.exports = shortUrl;