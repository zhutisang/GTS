const app = getApp().data
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //dealList:'',
    dealListView:[],
    viewHeight:0,
    dealListAll:[],   //后端传参时使用
    nowTime:'',
    dealTotal:'',
    deal:'成功',
    show:'',
    index:''
  },
  backToCart:function(){  
    wx.switchTab({
      url: '../user/index',
      })     
  },
  deleteDealOrder:function(){
    //需要获取该订单在数组/对象的下标
    let that = this
     wx.showModal({
       cancelColor: '提示',
       content:'删除后将不可恢复',
       confirmColor:'red',
       success (res) {
        if (res.confirm) {
            console.log('此处在后端传参后获取该订单的下标删除')
            that.delete()
            let deleteSimpleOrder = that.data.dealListView[that.data.index].orderId
            wx.request({
              url: 'http://localhost:8080/deleteOrder',
              method:"POST",
              data:{
                orderId:deleteSimpleOrder
              },
              // header:{"Content-Type":"application/x-www-form-urlencoded"}
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
     })
  },
  delete:function(){
    this.data.dealListView.splice(this.data.index,1)
    this.setData({
      dealListView:this.data.dealListView
    })
  },
  showLogisticsMessage:function(){
    //需要获取该订单在数组/对象的下标
    // this.setData({
    //   show:true
    // })
    //wx.setStorageSync('logisticsMessage', data)   //data为后端传入数组的某一下标中的dealList
    // wx.navigateTo({
    //   url: '../logistics/index',
    // })
    this.data.dealListView[this.data.index].showLogistics = true
    this.setData({
      dealListView:this.data.dealListView
    })
    console.log(this.data.dealListView)
  },
  pauseDealOrder:function(){
    console.log(this.data.dealListView)
    let that = this
    wx.showModal({
      cancelColor: '警告',
      content:'确认取消订单?',
      confirmColor:'red',
      success : (res) => {
       if (res.confirm) {
           console.log('此处在后端传参后获取该订单的交易取消，并将结果返回后端')
           this.data.dealListView[this.data.index].isReturn = '失败'
           this.data.dealListView[this.data.index].show = true
           this.setData({
               dealListView:this.data.dealListView
           })
      let pauseSimpleOrder = this.data.dealListView[this.data.index].orderId
      let that = this;
            wx.request({
              url: 'http://localhost:8080/cancelOrder',
              method:"POST",
              data:{
                orderId:pauseSimpleOrder
              },
              // header:{"Content-Type":"application/x-www-form-urlencoded"}
            })
       } else if (res.cancel) {
         console.log('用户点击取消')
       }
     },
    })
  },
  pause:function(){
   
  },
  getIndex:function(e){
    console.log(e)
    this.setData({
      index:e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // let dealListView = getApp().data.dealListView
    // let personPhone = getApp().data.personPhone
    let personPhone = app.personPhone
    console.log(personPhone)
    wx.request({
      url: 'http://localhost:8080/getMyOrderHistory',
      method:"POST",
      data:{
         personPhone:personPhone
      },
      // dataType:'json',
      // header:{
      //      "content-type":"application/json"
      // },
      success:function(res){
         console.log(res.data.history)
         console.log(JSON.parse(res.data.history) )
         let dealListView = JSON.parse(res.data.history)
         that.pngAdd(dealListView);
        //  this.data.dealListView = JSON.parse(res.data.history) 
        //  that.setData({
        //     dealListView:JSON.parse(res.data.history)
        //  })
        console.log("312312312")
      }
    })
    // let dealListView = wx.getStorageSync('dealListView',dealListView)
    // console.log(dealListView)
    // console.log(app.right_menu)
    //this.data.dealList.unshift(deal)
    
    console.log(that.data.dealListView)
  },
  pngAdd:function(dealListView){
    for(let i = 0 ; i <dealListView.length ; i ++)
    {
      dealListView[i].deal = '成功';
      for(let k = 0 ; k < dealListView[i].list.length ; k ++)
      {
        for(let m = 0 ; m < app.right_menu.length ; m ++)
      {
        for(let j = 0 ; j < app.right_menu[m].menu.length ; j ++)
        {
           if(dealListView[i].list[k].goodsId == app.right_menu[m].menu[j].id)
           {

            dealListView[i].list[k].img = app.right_menu[m].menu[j].img
            dealListView[i].list[k].price = app.right_menu[m].menu[j].price
            dealListView[i].show = '',
            dealListView[i].showLogistics = false
            dealListView[i]
           }
        }
      }
      }
    }
    for(let i = 0 ; i < dealListView.length ; i ++)
    {
      if(dealListView[i].isReturn == 0)
      {
        dealListView[i].isReturn = '成功'
      }
      else
      {
         dealListView[i].isReturn = '失败'
         if(dealListView[i].isReturn = '失败')
         {
            dealListView[i].show = true
         }
      }
    }
    console.log(dealListView)
    this.setData({
       dealListView:dealListView
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

    for(let i = 0 ; i < this.data.dealListView ; i ++)
    {
      let viewHeight = (this.data.dealListView[i].list.length)* 150;
    this.setData({
      viewHeight:viewHeight
    })
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