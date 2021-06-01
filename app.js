wx-App({
data:{
  arr_goods:[],
    arr_goods1:[],
},
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },
cart:function(){
    const sums = wx.getStorageSync("sum");
    const goods = wx.getStorageSync('goods');
    const nums = wx.getStorageSync('nums');
    const name = wx.getStorageSync('name');
    // for(let i = 0 ; i < this.data.arr_goods ; i ++)
    // {
    //   console.log('3123')
    //   if(name == this.data.arr_goods[i].name)
    //   {
    //     console.log('3123')
    //     this.data.arr_goods[i].nums += nums
    //     this.data.arr_goods[i].sums += sums
    //   }
    // }
    this.data.arr_goods.unshift({name:name,nums:nums,sums,checked:''})
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
