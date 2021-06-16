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
    getApp().data.userinfo = userinfo
    console.log(userinfo)
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
  },
  handleInfo:function(){
     wx.navigateTo({
       url: 'url',
     })
  },
  handleOrder:function(){
    wx.navigateTo({
      url: '../dealList/index',
    })
  },
  handleCollect:function(){
    wx.navigateTo({
      url: '../collect/index',
    })
  },
  writeMessage:function(){
    wx.navigateTo({
      url: '../pause_order/index',
    })
  },
  handAfterSale:function(){
    wx.navigateTo({
      url: '../after_sales/index',
    })
  }
})