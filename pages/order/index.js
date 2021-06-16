// pages/order/index.js
const citySelector = requirePlugin('citySelector');
const chooseLocation = requirePlugin('chooseLocation');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectorVisible: false,
    selectedProvince: null,
    selectedCity: null,
    userinfo:'',   //微信个人信息
    latitude:'',    //纬度
    longitude:'',   //经度
    province:'',   //省份
    city:'',       //市
    district:'',   //区
    mName:'',   //模糊地址
    show:'',       //展开浮窗
    located_btn_hide:false,   
    located_hide:true,
    userName:'',   //收货人
    phoneNumber:'',  //电话
    detailPosition:'',  //具体位置
    cartOrder:[],       //已完成的订单列表
    total:'',           //总价
    from_path:''        //上一级页面路径
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  backToCart:function(){  
    if(this.data.from_path == 'pages/cart/index')
    {
      wx.showModal({
        title: '提示',
        content: '此操作需要重新选择商品',
        success (res) {
          if (res.confirm) {
              wx.switchTab({
                url: '../cart/index',
              })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })  
    }
    else if(this.data.from_path == 'pages/goods_detail/index'){
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  getAddress:function(){
    const key = 'H6YBZ-7KTC2-WXFUJ-CZEG2-ANMD6-YUB5R'; //使用在腾讯位置服务申请的key
    const referer = '0410作业demo'; //调用插件的app的名称
    const location = JSON.stringify({
    latitude: 39.89631551,
    longitude: 116.323459711
  });
   const category = '生活服务,娱乐休闲';
   wx.navigateTo({
   url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
});
  },
 show:function () {
   this.setData({
     show:true
   })
 },
 inputUser:function(e){
    this.setData({
      userName:e.detail.value
    })
 },
 inputPhoneNumber:function(e){
  this.setData({
    phoneNumber:e.detail.value
  })
 },
 inputDetailPosition:function(e){
  this.setData({
    detailPosition:e.detail.value
  })
 },
 handleSubmitOrder:function(){
     if(this.data.userName == '' ||this.data.phoneNumber =='' 
     || this.data.province =='' || this.data.detailPosition == '')
     {
       wx.showToast({
         title: '请完善配送信息',
         icon:'error',
         mask:true
       })
     }
     else
     {
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
      let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
      let hour = nowDate.getHours();
      let minutes = nowDate.getMinutes();
      let second = nowDate.getSeconds();
      let nowTime = year + "-" + month + "-" + day + "-" + hour + ":" + minutes + ":" + second;
      console.log(nowTime)
      wx.setStorageSync('nowTime', nowTime)
      wx.setStorageSync('orderList', this.data.cartOrder)
      wx.setStorageSync('dealTotal', this.data.total)
      let dealList = {
        time:nowTime,
        list:this.data.cartOrder,
        total:this.data.total,
        province:this.data.province,
        city:this.data.city,
        district:this.data.district,
        mName:this.data.mName,   
        userName:this.data.userName,   
        phoneNumber:this.data.phoneNumber, 
        detailPosition:this.data.detailPosition, 
        longitude:this.data.longitude,   
        latitude:this.data.latitude,   
      }
      wx.setStorageSync('dealList', dealList)
      wx.request({
        url: 'url',
        method:"POST",
        data:{
          //dealList:dealList
        },
        success:function(res){

        }
      })
       wx.switchTab({
         url: '../cart/index',
       })
     }
 },
 switchDefault:function(e){
   let that = this;
 if(wx.chooseAddress){
      wx.chooseAddress({
        success: function (res) {
            let userName = res.userName
            let phoneNumber = res.telNumber
            let province = res.provinceName
            let city = res.cityName
            let district = res.countyName
            let detailPosition = res.detailInfo
            that.setData({
              userName:userName,
              phoneNumber:phoneNumber,
              province:province,
              city:city,
              district:district,
              detailPosition:detailPosition             
        })
        },
        fail: function(err){
          console.log(JSON.stringify(err))
        }
      })
    }else{
      console.log('当前微信版本不支持chooseAddress');
    }
 },
 noneFn:function(){

 },
  onLoad: function (options) {
    let pages = getCurrentPages();
     let prepage = pages[pages.length - 2];
     this.setData({
      from_path:prepage.route
     })
     const userinfo = wx.getStorageSync('userinfo',userinfo)
     const cartOrder = wx.getStorageSync('cartOrder',cartOrder)
     const total = wx.getStorageSync('total',total)
     this.setData({
       userinfo:userinfo,
       cartOrder:cartOrder,
       total:total
      })
  },
  onUnload:function (){
    // 页面卸载时清空插件数据，防止再次进入页面，getCity返回的是上次的结果
    //citySelector.clearCity();
    chooseLocation.setLocation(null);
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
    const location = chooseLocation.getLocation();
    if(location == null)
    {
      return 0
    }
    else
    {
      console.log(location)
      this.setData({
      province:location.province,
      city:location.city,
      district:location.district,
      mName:location.name,
      located_btn_hide:true,
      located_hide:false,
      latitude:location.latitude,
      longitude:location.longitude
    })
    }
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.removeStorageSync('cartOrder')
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