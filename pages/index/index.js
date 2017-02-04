//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo:{}
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
      //url: 'http://localhost/test/index.json',
      url:  'https://www.sharingfoods.com/index.php?mod=test&act=testinserttemp',
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
    var that=this;
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      if(that.data.userInfo){
        console.log('ok')
      }
    })
      


    

  },


})
