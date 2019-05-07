/* 全局变量 */
import CryptoJS from "crypto-js"

export default {
    name: `萤火云`,
    //adminUrl: `http://www.firefly.test`,
    adminUrl: `http://www.firefly.test:81`,

    getFileMd5: function(file, callback) {
        var reader = new FileReader()
        reader.onload = (event) => {
            console.log(event)
            var res = event.target.result
            res = CryptoJS.lib.WordArray.create(res)
            var sha1 = CryptoJS.MD5(res).toString()
            callback(sha1)
        }
        reader.readAsArrayBuffer(file)
    },

    getFileMd5_2: /* 文件md5操作 */
    function getFileMd5(file, self, status, callback){
        console.log(self)
  
      var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
      //file = this.files[0],
      chunkSize = 5 * 1024 * 1024,                             // Read in chunks of 5MB
     // chunks = Math.ceil(file.size / chunkSize),
      chunks = 20,
      currentChunk = 0,
      spark = new SparkMD5.ArrayBuffer(),
      fileReader = new FileReader();
  
      fileReader.onload =  (e) => {
          //console.log('read chunk nr', currentChunk + 1, 'of', chunks);
          spark.append(e.target.result);                   // Append array buffer
          currentChunk++;
          let percent = ((currentChunk/chunks)*100).toFixed(0)
          //console.log(percent)
            self.uplist[self.uplist.indexOf(status)].progress = percent
            //console.log(status.name+': '+ percent)
            //console.log(self.uplist[self.uplist.indexOf(status)].progress)
          //element.progress('event-file-progress', percent);
          //ele.text(percent)
          if (currentChunk < chunks) {
              loadNext();
          } else {
            //console.log('finished loading');
            //ele.fadeOut(500)
            callback(spark.end());  // Compute hash
            //return spark.end()
          }
      }
  
      fileReader.onerror = function () {
          console.warn('oops, something went wrong.');
      }
  
      function loadNext() {
          var start = currentChunk * chunkSize,
              end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
  
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }
  
      loadNext();
  
    },

    /** 
     * 时间戳格式化函数 
     * @param  {string} format    格式 
     * @param  {int}    timestamp 要格式化的时间 默认为当前时间 
     * @return {string}           格式化的时间字符串 
     */
    formatTime: function (timestamp, format = 'Y-m-d H:i:s'){  
        var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date())
        var pad = function(n, c){ 
            if((n = n + "").length < c){ 
                return new Array(++c - n.length).join("0") + n
            } else { 
                return n
            } 
        }
        var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"}
        var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        var f = { 
            // Day 
            d: function(){return pad(f.j(), 2)}, 
            D: function(){return f.l().substr(0,3)}, 
            j: function(){return jsdate.getDate()}, 
            l: function(){return txt_weekdays[f.w()]}, 
            N: function(){return f.w() + 1}, 
            S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'}, 
            w: function(){return jsdate.getDay()}, 
            z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0}, 
            
            // Week 
            W: function(){ 
                var a = f.z(), b = 364 + f.L() - a
                var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1
                if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){ 
                    return 1
                } else{ 
                    if(a <= 2 && nd >= 4 && a >= (6 - nd)){ 
                        nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31")
                        return date("W", Math.round(nd2.getTime()/1000))
                    } else{ 
                        return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0)
                    } 
                } 
            }, 
            
            // Month 
            F: function(){return txt_months[f.n()]}, 
            m: function(){return pad(f.n(), 2)}, 
            M: function(){return f.F().substr(0,3)}, 
            n: function(){return jsdate.getMonth() + 1}, 
            t: function(){ 
                var n
                if( (n = jsdate.getMonth() + 1) == 2 ){ 
                    return 28 + f.L()
                } else{ 
                    if( n & 1 && n < 8 || !(n & 1) && n > 7 ){ 
                        return 31
                    } else{ 
                        return 30
                    } 
                } 
            }, 
            
            // Year 
            L: function(){var y = f.Y()
                return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0}, 
            //o not supported yet 
            Y: function(){return jsdate.getFullYear()}, 
            y: function(){return (jsdate.getFullYear() + "").slice(2)}, 
            
            // Time 
            a: function(){return jsdate.getHours() > 11 ? "pm" : "am"}, 
            A: function(){return f.a().toUpperCase()}, 
            B: function(){ 
                // peter paul koch: 
                var off = (jsdate.getTimezoneOffset() + 60)*60
                var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off
                var beat = Math.floor(theSeconds/86.4)
                if (beat > 1000) beat -= 1000
                if (beat < 0) beat += 1000
                if ((String(beat)).length == 1) beat = "00"+beat
                if ((String(beat)).length == 2) beat = "0"+beat
                return beat
            }, 
            g: function(){return jsdate.getHours() % 12 || 12}, 
            G: function(){return jsdate.getHours()}, 
            h: function(){return pad(f.g(), 2)}, 
            H: function(){return pad(jsdate.getHours(), 2)}, 
            i: function(){return pad(jsdate.getMinutes(), 2)}, 
            s: function(){return pad(jsdate.getSeconds(), 2)}, 
            //u not supported yet 
            
            // Timezone 
            //e not supported yet 
            //I not supported yet 
            O: function(){ 
                var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4)
                if (jsdate.getTimezoneOffset() > 0) 
                    t = "-" + t
                else 
                    t = "+" + t
                return t
            }, 
            P: function(){var O = f.O()
                return (O.substr(0, 3) + ":" + O.substr(3, 2))}, 
            //T not supported yet 
            //Z not supported yet 
            
            // Full Date/Time 
            c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()}, 
            //r not supported yet 
            U: function(){return Math.round(jsdate.getTime()/1000)
            } 
        }
            
        return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){ 
            let ret
            if( t!=s ){ 
                // escaped 
                ret = s
            } else if( f[s] ){ 
                // a date function exists 
                ret = f[s]()
            } else{ 
                // nothing special 
                ret = s
            } 
            return ret
        })
    },

    /**
     * 获取文件大小
     * Returns a human readable filesize
     */
    easyFileSize: size => {
        size = parseInt(size)
        let mod = 1024
        let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
        let i = 0
        for (i = 0; size > mod; i ++) {
            size /= mod
        }
        return Math.round(size * 100)/100 + ' ' + units[i]
    },
    /* 获取文件名[原来是文件名+后缀]，返回对象 */
    getName_Ext: name => {
        let ind = name.lastIndexOf('.')
        return {
            name: name.substr(0, ind),
            ext: name.substr(ind+1)
        }
    },
    // 下载文件
    download (data, file) {
        if (!data) {
            return
        }
        //console.log(data)
        //return
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', file.name)

        document.body.appendChild(link)
        link.click()
    },
    //复制
    copy(){
        let clipboard = new $vue.$clipboard('.copyBtn')
        clipboard.on('success', function () {
            console.log('复制成功')
            $vue.$message({
                message: '复制成功',
                type: 'success'
            })
        })
        clipboard.on('error', function () {
            console.log('复制失败')
            $vue.$message({
                message: '复制失败，请手动复制',
                type: 'error'
            })
        })
    },
    //获取图片图标
    getIcon(ext) {
        ext = ext.toLowerCase()
        switch(ext) {
            case 'doc': case 'docx': return require(`./assets/icons/files/word.png`)
            case 'zip' : case 'rar': return require(`./assets/icons/files/zip.png`)
            case 'ppt' : case 'pptx': return require(`./assets/icons/files/ppt.png`)
            case 'xls' : case 'xlsx': return require(`./assets/icons/files/excel.png`)
            case 'apk' : case 'exe': return require(`./assets/icons/files/exe.png`)
            case 'png' : case 'jpg': case 'jpeg' : case 'bmp' : case 'gif' : case 'webp': case 'ico': return require(`./assets/icons/files/img.png`)
            case 'txt': return require(`./assets/icons/files/txt.png`)
            case 'pdf': return require(`./assets/icons/files/pdf.png`)
            case 'py': return require(`./assets/icons/files/python.png`)
            case 'php': return require(`./assets/icons/files/php.png`)
            case 'java': case 'jar': return require(`./assets/icons/files/java.png`)
            case 'js': return require(`./assets/icons/files/js.png`)
            case 'css': return require(`./assets/icons/files/css.png`)
            case 'html': return require(`./assets/icons/files/html.png`)
            case 'sql': case 'db': return require(`./assets/icons/files/sql.png`)
            case 'go': return require(`./assets/icons/files/golang.png`)
            case 'bat': return require(`./assets/icons/files/bat.png`)
            case 'sh': return require(`./assets/icons/files/shell.png`)
            case 'c': case 'cpp': case 'h': return require(`./assets/icons/files/c.png`)
            case 'mp4': case 'mkv': case 'rmvb': case 'avi': case '3gp': case 'rm': case 'mov': return require(`./assets/icons/files/movie.png`)
            case 'mp3': case 'flac': case 'aac': case 'amr': case 'wav': case 'ogg': case 'mpeg': return require(`./assets/icons/files/music.png`)
            default: return require('./assets/icons/files/file.png')
        }
    }
}