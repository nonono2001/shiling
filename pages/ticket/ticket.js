//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  },
  
  
  
  formSubmit:function(e){
    var that = this;  
    var formData = e.detail.value; 
    if(!formData.ticket){
     this.wetoast.toast({
            title: '请输入提货卡号',
            duration: 1000
      })
      return
    }
    if(!formData.ticketpassword){
    
     this.wetoast.toast({
            title: '请输入密码',
            duration: 1000
      })
      return
    }

    //先获取3rd_session_id
    var xcx_session_id = wx.getStorageSync('3rd_session_id');
    wx.request({  
      url: getApp().globalData.domain+'fajax.php?mod=tihuo_apply&act=do_send_cardinfo&xcx_session_id='+xcx_session_id,  
      data: formData,  
      header: {  
          'Content-Type': 'application/json'  
      },  
      success: function(res) {  
        if(res.data.done)
        {
            //检查卡号+密码正确
            //进入下一页面，收货地址信息页
            wx.navigateTo({
              url: '../address/address?ticket='+formData.ticket+'&ticketpassword='+formData.ticketpassword
            })  
        }
        else
        {
            //未登录
            if(res.data.retval == '40010')
            {
                wx.redirectTo({
                            url: '../login/login'
                        });

            }
            else if(res.data.retval == '40013')
            {
              //检查卡号+密码出错。也有可能是卡券礼品已发货。
              that.wetoast.toast({
                title: res.data.msg,
                duration: 1000
              });
            }
        }

      }  
    })  
  },
  onLoad: function () {
    new app.WeToast()
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })

    //有些页面，一进来首先要检查是否已登录。未登录，不允许访问，跳转到登录页。已登录则留在本页。
    app.checkLogin();
  }
})
