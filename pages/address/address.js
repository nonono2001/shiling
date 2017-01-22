// pages/register/register.js
var app = getApp()
Page({
  data:{
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
  
  
  formSubmit:function(e){
    

    var that = this;  
    var formData = e.detail.value; 

    if(!formData.user_address){
    
     this.wetoast.toast({
            title: '请输入收货地址',
            duration: 1000
      })
      return
    }
    if(!formData.street_address){
    
     this.wetoast.toast({
            title: '请输入街道地址',
            duration: 1000
      })
      return
    }


    if(!this.checkMobile(formData.mobile)){
     
     this.wetoast.toast({
            title: '请输入正确的联系方式',
            duration: 1000
      })
      return
    }

    
    
    
    if(!formData.recevier){
    
     this.wetoast.toast({
            title: '请输入收件人',
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