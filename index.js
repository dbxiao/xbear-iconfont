/**
 * @author [dbxiao]
 * @date   [2017-05]
 * @desc   [xbear-iconfont support develop updata alibaba iconfont platform text from cli]
 */

'use strict';

var $options = {};
var font = require('./lib/font.js');


function iconfont(avgs){
    $options = {
        type   : avgs[2],                 // 操作类型： iconfont
        action : avgs[3],                 // 操作事件： -u[updata] -a[add] -d[delete] 
        url    : "http:"+avgs[4],         // 远程连接: "http://at.alicdn.com/t/font_ec6iu8c9k3u6usor.css"
        path   : avgs[5] || "static/ui/"  // 目录 默认值：/static/ui/
    }; 

    try{
        iconfont.fn.init();
    }catch(e){
        console.log(e);
    }
    
}

iconfont.fn = {
    /**
     * 初始化 
     */
    init: function(){
    	if(iconfont.fn.checkAvgs()){
            font.getFile($options.url, $options.path);
            iconfont.fn.remoteURL(function(fontArr){
                font.getIcon(fontArr, $options.path);
            });
    	}else{	 
    		return false;
    	}
    },

    /**
     * 格式化链接
     */
    remoteURL: function(callback){
        console.log($options.url.match(/http.*\./)[0]);
        var fontArr = [
            $options.url.match(/http.*\./)[0]+"eot",
            $options.url.match(/http.*\./)[0]+"woff",
            $options.url.match(/http.*\./)[0]+"ttf",
            $options.url.match(/http.*\./)[0]+"svg"
        ];

        if(typeof callback == "function"){
            callback(fontArr);
        }
    },

    /**
     * 检查输入语法
     * @return {none} 
     */
    checkAvgs: function(){
    	if($options.type == undefined){
    		iconfont.fn.console("type");
    		return false;
    	}
    	if($options.action == undefined){
    		iconfont.fn.console("action");
    		return false;
    	}
    	if($options.url == undefined){
    		iconfont.fn.console("url");
    		return false;
    	}

    	return true;
    },

    /**
     * 日志打印
     * @param  {String} type 输入参数
     */
    console: function(type){
    	switch(type){
    		case "type": 
    			console.log("[Error] type is undefined");
    			break;
    		case "action": 
    			console.log("[Error] action is undefined");
    			break;
    		case "url": 
    			console.log("[Error] url is undefined");
    			break;
    		default:
    			break;
    	}

    	console.log("[Info] xbear iconfont -u 'http://at.alicdn.com/t/font_ec6iu8c9k3u6usor.css'");
    	console.log("[Info] more infomation please see ''");
    	console.log("");
    	console.log("command:");
    	console.log("	xbear {type} {action} {url}");
    	console.log("	{type} : iconfont文字库类型");
    	console.log("	{action} : -u [updata]更新文字库");
    	console.log("	{url} : 远程文字库更新链接");
    }
};


module.exports = iconfont;