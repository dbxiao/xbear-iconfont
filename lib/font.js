var http = require('http');
var fs   = require('fs');
// var request   = require('request');

var font = {
    
    /**
     * 获取远程样式文件
     */ 
    getFile: function(_url, _path){
        http.get(_url, (res) => {
            res.setEncoding('utf8');
            var rawData = '';
            res.on('data', (chunk) => rawData += chunk);
            res.on('end', () => {
                try {
                    var parsedData = rawData;
                    parsedData = parsedData.replace(/\/\/.*.eot/gi, "./font/iconfont.eot")
                                           .replace(/\/\/.*.woff/gi, "./font/iconfont.woff")
                                           .replace(/\/\/.*.ttf/gi, "./font/iconfont.ttf")
                                           .replace(/\/\/.*.svg/gi, "./font/iconfont.svg");

                    fs.writeFile(_path+'iconfont.css', parsedData, 'utf8');
                } catch (e) {
                    console.log(e.message);
                }
            });
        })
    },

    /**
     * 检查font目录是否存在
     */
    checkOutFontFolder: function(_path, callback){
        fs.exists(_path+'font', function(res){
            if(res == true){ // font目录存在
                callback();
            }else{ // font目录不存在
                fs.mkdirSync(_path+'font');
                callback();
            }
        });
    },

    /**
     * 获取文字库文件
     * @param  {Array} fontArr 文字库链接数组
     */
    getIcon: function(fontArr, _path){
        var fileUrl,
            fileName;
        var x = 0;

        function start(){
            if(x < fontArr.length){
                fileUrl = fontArr[x];
                fileName = "iconfont."+fontArr[x].split(".").pop();
                downloadFile(fileUrl, fileName, function(data){
                    console.log(fileName+'下载完毕');
                    x++;
                    start();
                });
            }else{
                return false;
            }
        }

        function downloadFile(fileurl, filename, callback){
            http.get(fileurl, (res) => {
                res.setEncoding('utf8');
                var rawData = '';
                res.on('data', (chunk) => rawData += chunk);
                res.on('end', () => {
                    try {
                        var parsedData = rawData;
                        fs.writeFile(_path+'font/'+filename, parsedData, 'utf8');
                        callback(filename);
                    } catch (e) {
                        console.log(e.message);
                    }
                });
            })

            // XX
            // var stream = fs.createWriteStream(_path+'font/'+filename);
            // request(fileurl).pipe(stream).on('close', callback); 
        }
        font.checkOutFontFolder(_path, function(){
            start();    
        })
        
    }
}

module.exports = font;