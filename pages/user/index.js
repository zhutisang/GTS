// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userinfo:{}
  },
  onShow(){
    const userinfo = wx.getStorageSync("userinfo");
    this.setData({userinfo})
    if(userinfo != '')
    {
      this.setData({
        hide:'none'
      })
    }
    else
    {
      this.setData({
        hide:'block'
      })
    }
  },
  login:function(){
      wx.navigateTo({
        url: '/pages/login/index',
      });
      
   
  }
})