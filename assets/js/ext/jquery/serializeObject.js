// From https://github.com/macek/jquery-to-json/blob/master/jquery.to_json.js

/*
Copyright (c) 2011 Paul Macek

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Patrick : Modified to point to jQuery.fn.serializeObject insteed of jQuery.fn.toJSON

jQuery.fn.serializeObject = function(options){
    
  options = $.extend({}, options);
    
  var self = this,
      json = {},
      push_counters = {},
      patterns = {
          "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
          "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
          "push":     /^$/,
          "fixed":    /^\d+$/,
          "named":    /^[a-zA-Z0-9_]+$/
      };
    
    
  this.build = function(base, key, value){
      base[key] = value;
      return base;
  };
    
  this.push_counter = function(key, i){
    if(push_counters[key] === undefined){
        push_counters[key] = 0;
    }
    if(i === undefined){
      return push_counters[key]++;
    } else if(i !== undefined && i > push_counters[key]){
      return push_counters[key] = ++i;
    }
  };
    
  $.each($(this).serializeArray(), function(){  
    if(!patterns.validate.test(this.name)){
        return;
    }
      
    var k,
        keys = this.name.match(patterns.key),
        merge = this.value,
        reverse_key = this.name;
      
    while((k = keys.pop()) !== undefined){
        
      reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');
      
      if(k.match(patterns.push)){
          merge = self.build([], self.push_counter(reverse_key), merge);
      } else if(k.match(patterns.fixed)){
        self.push_counter(reverse_key, k);
        merge = self.build([], k, merge);
      } else if(k.match(patterns.named)){
        merge = self.build({}, k, merge);
      }
    }
    
    json = $.extend(true, json, merge);
  });
    
  return json;
};