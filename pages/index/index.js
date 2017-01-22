//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  },
  
  //检查手机号是否正确
  checkMobile:function (mobile){
    var mobileReg = /^1[34578]\d{9}$/;
    
    return mobileReg.test(mobile);
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
    if(!this.checkPassword(formData.password)){
    
     this.wetoast.toast({
            title: '请输入密码',
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
  onLoad: function () {
    new app.WeToast()
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
     wx.navigateTo({
          url: '../success/success'
        })  
  }
})
