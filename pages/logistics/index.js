// pages/about/about.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk');
var qqmapsdk;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    points:[{
      'latitude':''+1,
      'longitude':''+1
    },
    {
      
      'latitude':22.050448+1,
      'longitude':113.40511+1
    }],
    markers: [{ 
      iconPath: 'https://img-qn.51miz.com/Element/00/37/34/55/903987f3_E373455_494c04eb.png!/quality/90/unsharp/true/compress/true/format/png/fh/630',
      id: 0,
      latitude: 22.050448,
      longitude: 113.40511,
      width: 30,
      height: 30,
      title:"",
      callout:{
        content:"",
        color:"#2c8df6",
        fontSize:20,
        borderRadius:10,
        bgColor:"#fff",
        display:"ALWAYS",
        boxShadow:"2px 2px 10px #aaa"
        }, 
      label: {
        color: "#000",
        fontSize: 12, 
        content: "为标记点旁边增加标签",
        x: 34.780439,
        y: 113.699774
      }
    }],
    polyline: [{
      points: [{
        latitude:  22.050448,
        longitude: 113.40511
      },
       {
          longitude: 113.701855,
        latitude: 34.779778
      }],
      color: "#ff6600",
      width: 8,
      dottedLine: false,
      arrowLine: true,
    }],
    controls: [{
      id: 1,
      iconPath: '',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
            key: 'LVCBZ-6QRCO-CAQW7-SEQTL-KQQMS-5OB6T'
        });
    let that = this;
  //  wx.getLocation({
  //    altitude: 'altitude',
  //    highAccuracyExpireTime: 0,
  //    isHighAccuracy: true,
  //    type: 'wgs84',
  //    success: (res) => {
  //      let logisticsList =  wx.getStorageSync('dealList')
  //      console.log(logisticsList)
  //      that.setData({
  //        'polyline[0].points[1].latitude':logisticsList.latitude,
  //        'polyline[0].points[1].longitude':logisticsList.longitude,
  //        'points[0].latitude':logisticsList.latitude,
  //        'points[0].longitude':logisticsList.longitude
  //      })
  //      console.log()
  //    },
     
  //  })
  },
  backToCart:function(){
    wx.navigateBack({
      delta: 1
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
  qqmapsdk.search({
            keyword: '酒店',
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            },
        complete: function (res) {
            console.log(res);
        }
     });
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