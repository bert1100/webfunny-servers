require("./extension")
var myAtob = require("atob")
var crypto = require('crypto')
var nodemailer = require('nodemailer');
module.exports = {
  isObject(obj) {
    return (Object.prototype.toString.call(obj) == '[object Object]');
  },
  guid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  },
  handleDateResult: function(result, scope = 30) {
    function addDate(date, days) {
      var d=new Date(date);
      d.setDate(d.getDate()+days);
      var month = d.getMonth()+1;
      var m= month >= 10 ? month : '0' + month;
      var day = d.getDate();
      var dayValue = day >= 10 ? day : '0' + day;
      // return d.getFullYear() + '-' + m + '-' + dayValue;
      return d.getFullYear() + '-' + m + '-' + dayValue;
    }
    var newResult = [];
    for (var i = 0; i < scope; i ++) {
      var tempDate = addDate(new Date(), -i);
      var tempObj = {day: tempDate.substring(5, 10), count: 0, loadTime: 0};
      for (var j = 0; j < result.length; j ++) {
        if (tempDate === result[j].day) {
          tempObj.count = result[j].count;
          tempObj.loadTime = result[j].loadTime ? result[j].loadTime : 0;
          continue;
        }
      }
      newResult.push(tempObj);
    }
    return newResult.reverse();
  },
  addDays: function(dayIn) {
    var CurrentDate
    var date = new Date();
    var myDate = new Date(date.getTime() + dayIn * 24 * 60 * 60 * 1000);
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    CurrentDate = year + "-";
    if (month >= 10) {
      CurrentDate = CurrentDate + month + "-";
    } else {
      CurrentDate = CurrentDate + "0" + month + "-";
    }
    if (day >= 10) {
      CurrentDate = CurrentDate + day;
    } else {
      CurrentDate = CurrentDate + "0" + day;
    }
    return CurrentDate;
  },
  parseQs: function (s) {
    var index = s.indexOf("?")
    var result = {}
    if (index === -1) return result
    var arr = s.substr(index + 1).split("&")
    arr.forEach(function(item) {
      var equals = item.split("=")
      var key = decodeURIComponent(equals[0])
      var val = decodeURIComponent(equals[1] || "")
      var i = 0
      var splitting = key.split(".")
      var len = splitting.length
      key = splitting[len - 1]
      var temp = result
      if (len > 1) {
        for (; i < len - 1; i++) {
          if (!temp[splitting[i]] || !this.isObject(temp[splitting[i]])) temp[splitting[i]] = {}
          temp = temp[splitting[i]]
        }
      }
      if (key.substr(-2) !== "[]") {
        temp[key] = val
      } else {
        key = key.substr(0, key.length - 2)
        if (!temp[key]) temp[key] = [val]
        else temp[key].push(val)
      }
    })
    return result
  },
  b64EncodeUnicode: function(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode("0x" + p1)
    }))
  },
  b64DecodeUnicode: function(str) {
    try {
      return decodeURIComponent(myAtob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (e) {
      return str
    }

  },
  md5Encrypt: function(encryptString) {
    var hash = crypto.createHash('md5');
    return hash.update(encryptString).digest('base64');
  },
  sendEmail: (email, subject, html) => {
    var transporter = nodemailer.createTransport({
      host: "smtp.163.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "jiang1125712@163.com", // generated ethereal user
        pass: "yingwei1125712" // generated ethereal password
      }
    });
    // send mail with defined transport object
    transporter.sendMail({
      from: '"邮箱验证码" <jiang1125712@163.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: html, // plain text body
      html: html // html body
    });
  }
}
