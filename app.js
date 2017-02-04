//app.js
let {WeToast} = require('src/wetoast.js')
App({
  WeToast,
  
  
   getUserInfo:function(cb){
    console.log(2)
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
        wx.login({
        success: function (e) {
          
           wx.request({  
            url:that.globalData.url+'?mod=login&act=login', 
            data: {code:e.code},  
            header: {  
                'content-Type': 'application/json'  
            },  
            success: function(res) { 
              
              var rand = res.data.rand
              var session_id = res.data.session_id
       

               that.globalData.session_id=session_id
               that.globalData.rand=rand
                
              wx.getUserInfo({
                success: function(res){
                  var userInfo = res
                  console.log(res)
                  wx.request({
                    url:that.globalData.url+'?mod=login&act=userinfo', 
                    data: {encryptData:userInfo.encryptData,encryptedData:userInfo.encryptedData,iv:userInfo.iv,rawData:userInfo.rawData,signature:userInfo.signature,rand:rand,session_id:session_id},
                    method: 'POST',  
                    header: {  
      "Content-Type": "application/x-www-form-urlencoded"  
    },
                    success: function(res){
                     console.log(res)
                      that.globalData.userInfo = res.userInfo
                      console.log(that.globalData.userInfo)
                      typeof cb == "function" && cb(that.globalData.userInfo)
                    
                    },
                    
                  })
                },
                
              })
              
              
               
            
            }  
          })  


  

        }
      })




    }
  },
  globalData:{
    userInfo:null,
    session_id:null,
    rand:null,
     url:'https://www.sharingfoods.com/index.php'
  }
})
