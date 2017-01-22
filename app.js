//app.js
let {WeToast} = require('src/wetoast.js')
App({
  WeToast,
  onLaunch: function () {
   this.getUserInfo()

  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (e) {
          
           wx.request({  
            url:that.globalData.url+'/index.php?mod=login&act=login',  
            data: {code:e.code},  
            header: {  
                'Content-Type': 'application/json'  
            },  
            success: function(res) {  
              
              console.log(res) 
             
            }  
          })  


          // wx.getUserInfo({
          //   success: function (res) {
          //     that.globalData.userInfo = res.userInfo
          //     typeof cb == "function" && cb(that.globalData.userInfo)
          //   }
          // })

        }
      })
    }
  },
  globalData:{
    userInfo:null,
    url:'https://www.sharingfoods.com'
  }
})
