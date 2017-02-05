//app.js
let {WeToast} = require('src/wetoast.js')
App({
  WeToast,
  onLaunch: function () {
   //this.getUserInfo()

  },

  //检查是否登录
  checkLogin:function(cb){
    //先检查微信联合登录是否正常，也就是wx.login()它是否过期。
    wx.checkSession({
      success: function(){
        //登录态未过期

        //检查3rd session是否过期期
        //调用php端检查3rd session是否过期的接口。
        var xcx_session_id = wx.getStorageSync('3rd_session_id');
        
        wx.request({
          url: getApp().globalData.domain + 'fajax.php?mod=check_login',
          data: {xcx_session_id:xcx_session_id},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            console.log(res.data);
            // success
            if(res.data.done)
            {
              //3rd session处于登录状态
              console.log('do nothing');
              return true;
            }
            else
            {
              //3rd session处于非登录状态，说明本地存储的这个session id已过期。也许本地根本不存在session id。
              //跳转到login页面，重新走一遍登录流程。
              wx.redirectTo({
                            url: '../login/login'
                        });

            }
          },

          fail: function(res){
            //fail的话，可能是第三方服务器挂了或怎样。也让小程序重新登录。
            wx.redirectTo({
                            url: '../login/login'
                        });
          }
        });
      },
      fail: function(){
        //登录态过期
        //进入login页面面
        wx.redirectTo({
                       url: '../login/login',
                      })
      }
    })
  },

  /*
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
        wx.login({
        success: function (e) {
          
           wx.request({
            url:that.globalData.domain+'index.php?mod=login&act=login',  
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
  }, */
  globalData:{
    userInfo:null,
    session_id:null,
    rand:null,
    domain:'https://www.sharingfoods.com/'
  }
})
