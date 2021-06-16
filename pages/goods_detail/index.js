// pages/goods_detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods_arr:[],      //商品数据
    nums:0,            //选择的商品数量
    sum:0,             //商品总价
    showView:true,
    from_path:'',
    triggered:true,
    isPress:false,
    boxText:'已加入购物车'
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
  addCart:function(){
    const goods = wx.getStorageSync("goods")   
    const sum = this.data.nums * goods.price;
    if(this.data.nums == 0)
    {
      wx.showToast({
        title: '请选择数量',
        icon:'error',
        mask:true
      })
      return 0
    }
    if(this.data.isPress === false){
    wx.setStorageSync('name', goods.name)
    wx.setStorageSync("sum", sum);
    wx.setStorageSync("nums", this.data.nums);
    getApp().cart();
    this.setData({
      isPress:''
    })
    }
    else if(this.data.isPress === ''){
      wx.showToast({
        title: '请勿重复加入',
        mask:true,
        icon:'error'
      })
      return 0
    }
  },
  //弹出加入购物车提示框
  change:function(){
    if(this.data.isPress == false){
       wx.showToast({
         title: '已加入购物车',
         mask:true,
         icon:'success'
       })
      }
    else
    {
      wx.showToast({
        title: '请勿重复加入',
        mask:true,
        icon:'error'
      })
    }
    //setTimeout(this.hide,2000)
  },
  addOrder:function(){
    let goods = wx.getStorageSync("goods");
    if(this.data.nums == 0)
    {
      wx.showToast({
        title: '请选择数量',
        icon:'error',
        mask:true
      })
      return 0
    }
    else
    {
      let orderSum = this.data.nums * goods.price.substring(1,7);
      let orderGoods = [goods]
      orderGoods[0].name = goods.txt
      orderGoods[0].nums = this.data.nums
      orderGoods[0].sum = orderSum
      console.log(orderGoods)
      wx.setStorageSync('cartOrder', orderGoods)
      wx.setStorageSync('total', orderSum)
      wx.navigateTo({
        url: '../order/index',
      })
         
    }
  },
  //隐藏提示框
  hide:function(){
    let that = this;
    that.setData({
      showView:(!that.data.showView)
    })
  },
  phoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: '13924680329' //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     showView:(options.showView == "true" ? true :false);
     let pages = getCurrentPages();
     let prepage = pages[pages.length - 2];
     this.setData({
      from_path:prepage.route
     })
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
    if(this.data.from_path == 'pages/category/index')
    {
      const goods = wx.getStorageSync("goods");
    this.setData({goods});
    }
    else if(this.data.from_path == 'pages/cart/index')
    {
       const goods = wx.getStorageSync('cart_goods_detail');
       this.setData({
         goods,
         nums:goods.nums
       })
    }
    else
    {
      const goods = wx.getStorageSync("goods");
      this.setData({goods});
    }
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
    wx.showNavigationBarLoading();
    setTimeout(function(){
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        },1500)
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