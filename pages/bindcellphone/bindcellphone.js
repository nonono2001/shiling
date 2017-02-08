// pages/register/register.js
var app = getApp()
Page({
  data:{
    yzm:'验证码',
    yzmBind:'getYzm',
    btn_queding:'确定',
    btn_queding_disabled:false,
  },
  //检查手机号是否正确
  checkMobile:function (mobile){
    var mobileReg = /^1[34578]\d{9}$/;
    
    return mobileReg.test(mobile);
  },
  mobileInput:function(e){
    
    this.setData({
      mobile:e.detail.value
    })
  },
  
  getYzm:function(e){
    var that = this;  
    //console.log(this.data.mobile);
    if(!this.checkMobile(this.data.mobile)){

     this.wetoast.toast({
            title: '请输入正确的手机号',
            duration: 1000
      })
      return
    }
    //发送验证码
    wx.request({  
      url: getApp().globalData.domain+'fajax.php?mod=vali_code&act=gen_valicode_bindphone',  
      data: {
        mobile: that.data.mobile,
      },  
      header: {  
          'Content-Type': 'application/json'  
      },  
      success: function(res) { 
        if(res.data.done)
        {
          //短信验证码发送成功
          that.wetoast.toast({
            title: "验证码已发送",
            duration: 2000
          })

          //让按钮失去效果
          var time = 6;
          that.setData({
              yzm:time,
              yzmBind:''
          })

          var timer = setInterval (() => {
            time--;
            that.setData({
                yzm:time
            })
            if(that.data.yzm==0){
              //让按钮恢复效果
              that.setData({
                    yzm:'验证码',
                    yzmBind:'getYzm'
                })
              clearInterval(timer);
            }
          }, 1000)
        }
        else
        {
          //短信验证码因系统原因，未发送成功
          that.wetoast.toast({
          title: res.data.msg,
          duration: 2000
          })

        }
        
      } 

    })  
  },

  checkPassword:function(pwd){
    if(!pwd){
      return false
    }else{
      return true;
    }
  },
  
  formSubmit:function(e){
    
    var that = this;  
    var formData = e.detail.value; 
    if(!this.checkMobile(formData.mobile)){
     
     this.wetoast.toast({
            title: '请输入正确的手机号',
            duration: 1000
      })
      return
    }

    
    
    if(!formData.yzm){

     this.wetoast.toast({
            title: '请输入正确的验证码',
            duration: 1000
      })
      return
    }
    if(!this.checkPassword(formData.password)){
    
     this.wetoast.toast({
            title: '请输入密码',
            duration: 1000
      })
      return
    }
    if(formData.password!=formData.repassword){
    
     this.wetoast.toast({
            title: '两次密码不一致',
            duration: 1000
      })
      return
    }

    //让按钮失去效果
    this.setData({
        btn_queding:'请稍候',
        btn_queding_disabled:true
    })

    //先生成code登录凭证证
    wx.login({
        success: function(res) {
        if (res.code) {
            wx.request({  
              //请求绑定
              url: getApp().globalData.domain+'fajax.php?mod=login&act=do_bind_cellphone_openid',
              data: {
                'mobile':formData.mobile,
                'yzm':formData.yzm,
                'password':formData.password,
                'repassword':formData.repassword,
                'xcx_code':res.code
              },  
              header: {  
                  'Content-Type': 'application/json'  
              },  
              success: function(res) {  
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
                else
                {
                  //绑定失败，40011-code可能过期，无法用code换取到openid和session_key；40013-操作失误，直接提示给用户
                  if(res.data.retval == '40013')
                  {
                    //恢复按钮功能
                    that.setData({
                            btn_queding:'确定',
                            btn_queding_disabled:false
                        })

                    that.wetoast.toast({
                    title: res.data.msg,
                    duration: 2000
                    })
                  }
                  else if(res.data.retval == '40011')
                  {
                    //无法用code换取到openid和session_key,code可能过期
                    //这时需要重新获取code。即跳到login页面面
                    wx.redirectTo({
                                    url: '../login/login'
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
      
  },
    
  onLoad:function(options){
     new app.WeToast()
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})