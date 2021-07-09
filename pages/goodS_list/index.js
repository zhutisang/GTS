// pages/goodS_list/index.js
const app = getApp().data;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     lists:[],
     title:'',
     index:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = wx.getStorageSync('index')
    console.log(index)
    if(index == 0)
    {
      this.setData({
        lists:app.right_menu[13].menu,
        title:'蔬菜'
      })
    }
    else if(index == 1)
    {
      this.setData({
        lists:app.right_menu[4].menu,
        title:'肉禽'
      })
    }
    else if(index == 2)
    {
        this.setData({
          lists:app.right_menu[6].menu,
          title:'鸡蛋'
        })
    }
    else if(index == 3)
    {
        this.setData({
          lists:app.right_menu[8].menu.concat(app.right_menu[3].menu),
          title:'水果'
        })
    }
    else if(index == 4)
    {
        this.setData({
          lists:app.right_menu[1].menu,
          title:'海鲜'
        })
    }
    else if(index == 5)
    {
        this.setData({
          lists:app.right_menu[5].menu,
          title:'调料'
        })
    }
    else if(index == 6)
    {
        this.setData({
          lists:app.right_menu[7].menu,
          title:'奶制品'
        })
    }
    else if(index == 7)
    {
        this.setData({
          lists:app.right_menu[0].menu.concat(app.right_menu[11].menu.concat(app.right_menu[2].menu.concat(app.right_menu[12].menu))),
          title:'速食'
        })
    }
    console.log(this.data.lists)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  toDetail:function(e){
     console.log(e)
     this.setData({
       index:e.currentTarget.dataset.index
     })
     wx.setStorageSync('goods', this.data.lists[this.data.index])
     wx.navigateTo({
       url: '../goods_detail/index',
     })
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})