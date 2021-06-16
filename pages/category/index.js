// pages/category/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左栏目数据
     left_menu:[
       {
         'txt':'时令水果'
       },
       {
        'txt':'进口水果'
      },
       {
        'txt':'新鲜蔬菜'
      },
      {
        'txt':'精选肉类'
      },
      {
        'txt':'农家鸡蛋'
      },
      {
        'txt':'海鲜水产'
      },
      {
        'txt':'粮油调味'
      },
      {
        'txt':'水饮名茶',
      },
      {
        'txt':'生鲜牛奶'
      },
      {
        'txt':'速溶冲调',
      },
      {
        'txt':'方便面'
      },
      {
        'txt':'休闲零食'
      },
      {
        'txt':'进口零食'
      },
      {
        'txt':'食用酒品'
      },
      {
        'txt':'速冻食品'
      },    
     ],
     //右栏目数据
     right_menu:[
       {
          menu:[
            {
              'img':'https://img14.360buyimg.com/n0/jfs/t1/144589/6/5764/78888/5f3a665bE1d1c468a/229a1ec824c10fc4.jpg',
              'txt':'雪莲果',
              'price':'￥15.9'
            },
            {
             'img':'https://img14.360buyimg.com/n0/jfs/t1/66440/11/13538/150721/5dad115dEd892300d/78f5ca58beeed232.jpg',
             'txt':'青枣',
             'price':'￥20.9'
           },
           {
             'img':'https://img14.360buyimg.com/n0/jfs/t1/156506/39/3214/158490/5febf898Eb083a93f/b34118cdf268da41.jpg',
             'txt':'苹果',
             'price':'￥18.9'
           },
           {
             'img':'https://img14.360buyimg.com/n0/jfs/t1/56771/12/3897/162168/5d1a1365E66bb0278/28d784473a082a5e.jpg',
             'txt':'杨桃',
             'price':'￥17.9'
           },
           {
             'img':'https://img14.360buyimg.com/n0/jfs/t1/123042/23/17205/188464/5f9f788fE78c73c13/73c28da6b9afd561.jpg',
             'txt':'猕猴桃',
             'price':'￥29.9'
           },
           {
             'img':'https://img14.360buyimg.com/n0/jfs/t1/96074/19/2629/124991/5dd3a5a6E2906ed07/815e556559bb3b7e.jpg',
             'txt':'无花果',
             'price':'￥27.9'
           },
           {
             'img':'https://img14.360buyimg.com/n0/jfs/t1/170293/3/9788/106487/6042f199E6022b619/0f88a76ebfa47df3.jpg',
             'txt':'黄杏',
             'price':'￥21.9'
           },
           {
             'img':'https://img14.360buyimg.com/n0/jfs/t1/89592/10/897/123514/5db5a9b4E85880a6c/99eed7617e1dc318.jpg',
             'txt':'枇杷',
             'price':'￥22.9'
           },
           {
             'img':'https://img14.360buyimg.com/n0/jfs/t1/110558/40/13477/218492/5ea1511aEf8625693/677ac368989ea5d8.jpg',
             'txt':'人参果',
             'price':'￥24.9'
           },
           {
             'img':'https://img14.360buyimg.com/n0/jfs/t1/169043/24/7209/120611/6031cd9aE20802f6a/92f4c29daa5034dd.jpg',
             'txt':'桃子',
             'price':'￥25.9'
           },
           {
             'img':'https://img14.360buyimg.com/n0/jfs/t1/146308/9/18478/221812/5fd814c9E743cbdac/2f44212aeddbb6b7.jpg',
             'txt':'草莓',
             'price':'￥30.9'
           },
           {
             'img':'https://img14.360buyimg.com/n0/jfs/t1/158687/2/9005/287355/603b5d48E082e8d52/ce1bcff98a59d353.jpg',
             'txt':'西梅',
             'price':'￥26.9'
           }
           ]      
       },
       {
         menu:[{
          'img':'https://img14.360buyimg.com/n0/jfs/t1/89592/10/897/123514/5db5a9b4E85880a6c/99eed7617e1dc318.jpg',
          'txt':'枇杷',
          'price':'￥22.9'
         }]
       }  ,
       {
         menu:[]
       },
       {
        menu:[]
      },
      {
        menu:[]
      },
      {
        menu:[]
      },
      {
        menu:[]
      },
      {
        menu:[]
      },
      {
        menu:[]
      },
      {
        menu:[]
      },
      {
        menu:[]
      },
      {
        menu:[]
      },
       ],    
  //左栏目选中的下标
     currentIndex:0
    },
    //将选中的商品存入缓存
 goodsDetail: function(e){
   wx.setStorageSync("goods", e.currentTarget.dataset.index);
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.onShow();
    // wx.request({
    //   url: 'http://localhost:8080/getAllGoodsInfo02',
    //   data:{},
    //   header:{
    //        "content-type":"application/json"
    //   },
    //   method:"POST",
    //   dataType:"json",
    //   success:function(res){
    //      console.log(JSON.parse( res.data.left_menu))
    //      console.log(JSON.parse( res.data.right_menu))
    //      that.setData({
    //        left_menu:JSON.parse( res.data.left_menu),
    //        right_menu:JSON.parse( res.data.right_menu)
    //      })
         
    //   },
    //   fail(res){

    //   }
    // })
    
    
    this.setData({
      left_menu:wx.getStorageSync('left_menu'),
      right_menu:wx.getStorageSync('right_menu')
    })
    console.log(this.data.left_menu)
    
if(getCurrentPages.length!=0)
    {
      getCurrentPages()[getCurrentPages.length-1].onLoad()
    }
  },

  //选中左栏后显示右栏内容
  handleItemTap:function (e){
    console.log(e);
      const{index} = e.currentTarget.dataset;     
      this.setData(
        {
           currentIndex:index,
        } ) 
      },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     
  },

})