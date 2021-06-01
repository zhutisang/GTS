// pages/goods_detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods_arr:[],      //商品数据
    nums:0,            //选择的商品数量
    sum:0,             //商品总价
    showView:true
  },
  //增加数量
  add_num:function(){
    const new_num = this.data.nums+1; 
    this.setData({
       nums:new_num
     })
  },
  //减少数量
  minus_num:function(){
    const new_num = this.data.nums-1; 
    if(new_num >= 0){ 
      this.setData({
       nums:new_num
     })}
     else
     {
       return 0
     }
   
  },
  //计算总价
  sum:function(){
    const goods = wx.getStorageSync("goods")   
    const sum = this.data.nums * goods.price.substring(1,7);
    wx.setStorageSync('name', goods.txt)
    wx.setStorageSync("sum", sum);
    wx.setStorageSync("nums", this.data.nums);
    getApp().cart();
  },
  //弹出加入购物车提示框
  change:function(){
    let that = this;
    that.setData({
      showView:false
    });
    setTimeout(this.hide,2000)
  },
  //隐藏提示框
  hide:function(){
    let that = this;
    that.setData({
      showView:(!that.data.showView)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     showView:(options.showView == "true" ? true :false);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  //从缓存中获取从category存入的数据
  onShow: function () {
    const goods = wx.getStorageSync("goods");
    this.setData({goods});
    var goods_arr = goods; 
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