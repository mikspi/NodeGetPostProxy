// Constructor
var fullNodeProxy = function() {
    
    this.target = null;

}

fullNodeProxy.prototype.createProxyServer = function(options) {

	if(options.target) this.target = options.target;

    function clone(obj){
        if(obj == null || typeof(obj) != 'object')
            return obj;

        var temp = new obj.constructor(); 
        for(var key in obj)
            temp[key] = clone(obj[key]);

        return temp;
    }
    
    return clone(this);

}

fullNodeProxy.prototype.web = function(req, res) {

	if(this.target) {
    
        if(req.method=='GET'){
            
            require('request').get({
                uri:this.target+req.originalUrl,
                headers:{'content-type': 'application/x-www-form-urlencoded'},
                },function(err,response,body){
            }).pipe(res);
            
        } else {

            require('request').post({
                uri:this.target+req.originalUrl,
                headers:{'content-type': 'application/x-www-form-urlencoded'},
                form:req.body
                },function(err,response,body){
            }).pipe(res);

        }
    
    }

}

module.exports = new fullNodeProxy();