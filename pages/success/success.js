//index.js
//获取应用实例
var app = getApp()
Page({
  data: {

  },
  
  //事件处理函数
  gotoShop: function() {
    // wx.navigateTo({
    //   url: 'https://kdt.im/-s2PEr'
    // })
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

    //这个页面没啥，就不检查登录状态了。
    
  }
})
