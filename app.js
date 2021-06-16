wx-App({
data:{
  arr_goods:[],
    arr_goods1:[],
    userinfo:{},
    left_menu:[],
    right_menu:[]
    
},
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  globalData:{
    left_menu:[],
    right_menu:[]
  },
  onLaunch: function () {
    let that = this;
    wx.request({
      url: 'http://localhost:8080/getAllGoodsInfo02',
      data:{},
      dataType:'json',
      header:{
           "content-type":"application/json"
      },
      method:"POST",
      success:function(res){
        console.log(res)
         console.log(JSON.parse( res.data.left_menu))
         console.log(JSON.parse( res.data.right_menu))
         wx.setStorageSync('left_menu',JSON.parse( res.data.left_menu) )
         wx.setStorageSync('right_menu',JSON.parse( res.data.right_menu) )
      },
      fail(res){
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    console.log(this.data.arr_goods)
    console.log(this.data.arr_goods1)
  },
cart:function(){
    let sums = wx.getStorageSync("sum");
    const goods = wx.getStorageSync('goods');
    const nums = wx.getStorageSync('nums');
    const name = wx.getStorageSync('name');
    sums = Math.round((sums)*100)/100           
    this.data.arr_goods.unshift({name:name,nums:nums,sums,checked:'',small:false,big:true,isopen:false})
    this.data.arr_goods1.unshift(goods);
},
  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
  ,
})
