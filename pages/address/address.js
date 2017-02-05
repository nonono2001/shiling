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

    if(!formData.city_address){
    
     this.wetoast.toast({
            title: '请输入省市区',
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
            title: '请输入正确的手机号',
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
      url: getApp().globalData.domain+'fajax.php?mod=tihuo_apply&act=do_send_shouhuoinfo&xcx_session_id='+xcx_session_id,   
      data: {
        address_city:formData.city_address,
        address_street:formData.street_address,
        lianxidianhua:formData.mobile,
        shuohuoren:formData.recevier,
        tihuo_card_no:this.data.ticket,
        tihuo_password:this.data.ticketpassword
      }  ,
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

    //有些页面，一进来首先要检查是否已登录。未登录，不允许访问，跳转到登录页。已登录则留在本页。
    app.checkLogin();

    //从ticket页面传过来卡号+密码
    var ticket = options.ticket;
    var ticketpassword = options.ticketpassword;

    this.setData({
      ticket: ticket,
      ticketpassword:ticketpassword
    });

    
    
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