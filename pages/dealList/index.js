
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dealList:'',
    //dealList:[],
    viewHeight:0,
    dealListAll:[],   //后端传参时使用
    nowTime:'',
    dealTotal:'',
    deal:'成功',
    show:''
  },
  backToCart:function(){  
    wx.switchTab({
      url: '../user/index',
      })     
  },
  deleteDealOrder:function(){
    //需要获取该订单在数组/对象的下标
     wx.showModal({
       cancelColor: '提示',
       content:'删除后将不可恢复',
       confirmColor:'red',
       success (res) {
        if (res.confirm) {
            console.log('此处在后端传参后获取该订单的下标删除')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
     })
  },
  showLogisticsMessage:function(){
    //需要获取该订单在数组/对象的下标
    // this.setData({
    //   show:true
    // })
    //wx.setStorageSync('logisticsMessage', data)   //data为后端传入数组的某一下标中的dealList
    wx.navigateTo({
      url: '../logistics/index',
    })
  },
  pauseDealOrder:function(){
    let that = this
    wx.showModal({
      cancelColor: '警告',
      content:'确认取消订单?',
      confirmColor:'red',
      success (res) {
       if (res.confirm) {
           console.log('此处在后端传参后获取该订单的交易取消，并将结果返回后端')
          that.setData({
             deal:'失败'
            })
       } else if (res.cancel) {
         console.log('用户点击取消')
       }
     },
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'url',
    //   data:{
    //      dealList:this.data.dealList
    //   },
    //   method:'post',
    //   success:function(res){
         
    //   }
    // })
    let deal = wx.getStorageSync('orderList');
    let nowTime = wx.getStorageSync('nowTime',nowTime)
    let dealTotal = wx.getStorageSync('dealTotal',dealTotal)
    let dealList = wx.getStorageSync('dealList',dealList)
    //this.data.dealList.unshift(deal)
    console.log(this.data.dealList)
    this.setData({
       dealList:dealList
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
  onShow: function () {
    console.log(this.data.dealList)
    let viewHeight = (this.data.dealList.list.length)* 150;
    this.setData({
      viewHeight:viewHeight
    })
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