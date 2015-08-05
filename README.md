# bloomkvs
## Bloom filter with key-value storage


### installation:
npm i --save bloomkvs

###usage
    var BFilter = require('bloomkvs');
    
    var options = {
            
    }
    var arrayOfStrangers = [
        {id:'12839e1280',name:'Natan'},
        {id:'123e291280',name:'Ivan'},
        {id:'1ZYdd91280',name:'Plato'}
    ]
    /**
    * BloomFilter(keyName,dbGetter,dbSetter,options,callback);
    * params to pass: 
    * keyName {string} (required)- used to save and retrieve bloomfilter from database
    * dbGetter = function(key,callback)  (required)
    * dbSetter = function(key,value) (required)
    * options =  {size: <filter size> , hashes: <number of functions> }, by default is 8kb in size with 16 functions, 
    * You can pass null if default values suits Your aim. 
    * callback = function(aFilter) is called when bloomfilter is ready to serve Your needs
    */
    var bFilter = new BFilter('weStoreFilterWithThisKey', yourDBMS.getKey, yourDBMS.setKey, options, function (aFilter){
        // your code here for storing elements to bloom filter
        arrayOfStrangers.forEach( function(el){
            aFilter.add(el.id);
        });
        
        //here we check if element is already in filter
        
        bloom.test("12839e1280"); // returns true
        
        bloom.test("QWEx39e180"); // returns false
        
        // by this we save bloomfilter to database
        aFilter.save();
        
    });
    
### TODO 
1. Write tests
2. Use separate key to save\restore filter options 
 
### license
MIT