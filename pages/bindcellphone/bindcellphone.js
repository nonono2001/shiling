// pages/register/register.js
var app = getApp()
Page({
  data:{
    yzm:'验证码',
    'yzmBind':'getYzm'
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
        console.log(getApp().globalData.domain); 
        if(res.data.done)
        {
          //短信验证码发送成功
          that.disabled = true;
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
    wx.request({  
      url: 'http://localhost/test/index.json',  
      data: formData,  
      header: {  
          'Content-Type': 'application/json'  
      },  
      success: function(res) {  
        console.log(res.data) 
        wx.navigateTo({
          url: '../register/register'
        })  
      }  
    })  
  },
    
  onLoad:function(options){
     new app.WeToast()
    // 页面初始化 options为页面跳转所带来的参数
    //console.log(options);
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