//该页面专门负责登录相关。

//获取应用实例
var app = getApp()
Page({
  data: {
  },
    
  onLoad: function () {
    //console.log(getApp().globalData.domain)
    wx.login({
        success: function(res) {
        if (res.code) {
            
            // console.log('code is '+res.code)
            // wx.showModal({
            // title: '提示',
            // content: res.code,
            // success: function(res) {
            //     if (res.confirm) {
            //     console.log('用户点击确定')
            //     }
            // }
            // })
            // 发起网络请求
              wx.request({
                url: getApp().globalData.domain+'fajax.php?mod=login',
                data: {
                  code: res.code
                },

                success: function(res) {
                    //res.data.done为真时，登录成功
                    if(res.data.done)
                    {
                        //绑定成功retval即为3rd_session_id
                        //把3rd_session_id写入storage
                        wx.setStorageSync('3rd_session_id', res.data.retval);
                        //这就算登录成功了，跳转到提货页。
                        wx.redirectTo({
                            url: '../ticket/ticket'
                        })
                    }
                    else //res.data.done为假时，登录失败败
                    {
                        //一种可能是code过期，后端无法用code换取session_key和openid。这时要刷新本页面面。这种可能性很小，code有五分钟寿命。retval为40011
                        if(res.data.retval == '40011')
                        {
                            //刷新登录页，重新wx.login()。
                            wx.redirectTo({
                                url: './login'
                            })
                        }

                        //一种可能是尚未绑定手机号。retval为40012
                        if(res.data.retval == '40012')
                        {
                            //跳转到绑定手机号的页面。
                            var xcx_code = res.data.msg;//刚才wx.login生成的code，打到后端，又从后端带回来。再带到绑定页面，绑定页面就不用重新wx.login了。所有整个小程序wx.login就唯一一处，login.js。
                            wx.redirectTo({
                                url: '../bindcellphone/bindcellphone?xcx_code='+xcx_code
                            })
                        }
                    }
                    
                }

              })
        }
        else
        {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }



    });
  }
})