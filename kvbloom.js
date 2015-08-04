/**
 * class  StorableBloomFilter
 * used to filter objects
 * with save() and load() methods
 * to store filter to external key-value storage
 * by passing key, storer and retriver functions
 */

//TODO load()

var BloomFilter = require('bloomfilter').BloomFilter;

StorableBloomFilter.prototype = Object.create(BloomFilter.prototype);
StorableBloomFilter.prototype.constructor = StorableBloomFilter;

function StorableBloomFilter(key, retriver, storer, options, callback){
  //TODO: add parameters check
  this.key = key;
  this.storer = storer;
  options =  options || {};
  var self = this;
  retriver(key, function (err, data) {
        var initialData;
        try {
          initialData = JSON.parse(data);
        } catch (e){
            //will create default empty bucket
        }
        if(!initialData || !initialData instanceof Array)
          initialData = options.size ? options.size : 32 * 256;
        BloomFilter.call(self,initialData,options.hashes ? options.hashes : 16);
        if (callback)
          try {
            callback(self)
          } catch (e) {
            console.log(e);
          };
  });
}

StorableBloomFilter.prototype.save = function (){
  var array = [].slice.call(this.buckets),
      json = JSON.stringify(array);
  this.storer(this.key, json);
};

module.exports = StorableBloomFilter;