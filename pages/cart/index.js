// pages/cart/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr_goods:[],             //商品信息表1(图片url，单价含单位，商品名txt)
    arr_goods1:[],            //商品信息表2(商品数量，商品总价，商品名name)
    lists:[],                 //购物车最终列表
    checkedValue:'',          //全选判断
    deal_delete:'结算',       //结算/删除判断
    manage_text:'管理',       //管理/完成判断
    ready_del:[],             //选中商品暂存列表
    clear:'',                 //清除选项(无用)
    all_check_true:false,     //全选按钮可用判断
    index:'',                 //商品列表下标
    total:0,                  //选中商品总价
    setNum:true,              //(无用)
    ischecked:false,           //(无用)
    triggered:true
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      arr_goods:getApp().data.arr_goods,
      arr_goods1:getApp().data.arr_goods1,
    })
    //拼合数组形成暂存list表
    let list = this.data.arr_goods1.map((key,index)=>{return{...key,...this.data.arr_goods[index]}})
    //当重复添加商品的时候只显示一个商品
    for(let i = 0 ; i < list.length; i ++)
    {
      for(let m = i + 1 ; m < list.length; m ++)
      {        
        if(list[m].name == list[i].name )
        {
          list[i].sums += list[m].sums;
          list[i].nums += list[m].nums;
          list.splice(m,1)
          m--;
      }
    }
  }
    this.setData({
      lists:list,
    })
    //购物车为空时
    if(this.data.lists.length == 0)
    { 
      this.setData({
        all_check_true:true,                   //全选设置为不可用
        manage_text:'',                        //隐藏管理按钮
        deal_delete:'购物车为空'                //结算按钮显示购物车为空
      })
    }
    else{
      //当购物车不为空
      this.setData({
        all_check_true:false,                   //全选可用
        manage_text:'管理',                     //显示管理按钮
        deal_delete:'结算'                      //显示结算按钮
      })
    }
  //  for(let i = 0 ; i < this.data.lists.length ; i ++)
  //  {
  //   //  this.data.total = Math.round(this.data.lists[i].sums*100)/100;
  //    this.data.total = Math.round((this.data.total + this.data.lists[i].sums)*100)/100
  //  }
  //  this.setData({
  //    total:this.data.total
  //  })
  console.log(this.data.lists)
  },
  //管理按钮
  manage:function(){
    //当显示管理按钮或者隐藏管理按钮
     if(this.data.manage_text == '管理' || this.data.manage_text == '')
    {
      this.setData({
      manage_text:'完成',              //管理按钮显示为完成
      checkedValue:'',                //全选可用
      clear:'清理',                    //显示清理按钮
      deal_delete:'删除'               //结算按钮转变成删除按钮
    })
     if(this.data.manage_text =='完成')
    {
      this.setData({
        deal_delete:'删除'
      })
    }
  }
    else{
      //当显示完成按钮
      this.setData({
        deal_delete:'结算',             //显示结算按钮
        manage_text:'管理',             //显示管理按钮
        clear:''                        //隐藏清理按钮
      }) 
    }
  },
  // 结算or删除按钮
  dealOrDelete:function(){
    if(this.data.deal_delete == '删除'){        //删除功能
      for(let i = 0 ; i < this.data.lists.length ; i ++)
      {
        for(let m = 0 ; m < this.data.ready_del.length ; m ++)
        {
          if(this.data.ready_del[m] == this.data.lists[i].name)
          {
            this.data.total -= this.data.lists[i].sums; 
            this.data.lists.splice(i,1);
            getApp().data.arr_goods.splice(i,1);
            getApp().data.arr_goods1.splice(i,1);
          }
        }
      }
      this.setData({
        lists:this.data.lists,
        total:Math.round((this.data.total)*100)/100
      })
    }
    else if(this.data.deal_delete == '结算')    //结算功能
    {
       let cartOrder = [];
       for(let i = 0 ; i < this.data.lists.length ; i ++)
       {
         if(this.data.lists[i].checked == true)
         {                                     
           cartOrder.push(this.data.lists[i]);               //将已选中并准备结算的按钮存入cartOrder数组
           this.data.lists.splice(i,1);
           getApp().data.arr_goods.splice(i,1);
            getApp().data.arr_goods1.splice(i,1);
            i --;
           wx.navigateTo({                           //跳转到订单页面
             url: '../order/index',
           })
         }
       } 
       wx.setStorageSync('cartOrder', cartOrder)            //将cartOrder数组放入缓存
       wx.setStorageSync('total', this.data.total)          //将选中商品总价total放入缓存
    }
    else
    {
      return 0
    }
  },
  //选中
  checkboxChange:function(e){
    //获取已选中商品的名字的数组并赋值给ready_del数组
    this.setData({
      ready_del:e.detail.value,      
    })
    this.data.total = 0
    for(let i = 0 ; i < this.data.lists.length ; i ++)          
    {
      this.data.lists[i].checked = false
      if(this.data.ready_del == '')                  //没用选中商品时
      {
        this.data.total = 0;
      }
      else   
      {                                             //计算已选中的商品的总价
        for(let m = 0 ; m < this.data.ready_del.length ; m ++)
      { 
        
        if(this.data.lists[i].name == this.data.ready_del[m])
        {
          this.data.total = Math.round((this.data.total + this.data.lists[i].sums)*100)/100;
          this.data.lists[i].checked = true
        }
      }
    }
    }
    this.setData({
      total:this.data.total
    })
  },
  //全选
  checkboxChangeAll:function(){
    //当全选按钮没被选中
    if(this.data.checkedValue != true){
      for(let i = 0 ;i < this.data.lists.length ; i++)
    {
      let onCheckedSum = 0;
      if(this.data.lists[i].checked == true)
      {
         onCheckedSum = this.data.lists[i].sums
      }
     this.data.lists[i].checked = true;
     this.data.total = Math.round((this.data.total + this.data.lists[i].sums - onCheckedSum)*100)/100
    }
    this.setData({
      lists:this.data.lists,
      checkedValue:true,
      total:this.data.total
    })
    }
    else
    {
      for(let i = 0 ;i < this.data.lists.length ; i++)
      {
       this.data.lists[i].checked = '';
       this.data.total = 0
      }
      this.setData({
        lists:this.data.lists,
        checkedValue:'',
        total:this.data.total
      })
    }
  },
  //清理
  once_del:function(){
    if(this.data.manage_text =='完成') 
    { 
      this.setData({
       lists:'',
       total:0
     })
     console.log(this.data.lists)
     if(this.data.lists == ''){
       getApp().data.arr_goods.splice(0,getApp().data.arr_goods.length);
     getApp().data.arr_goods1.splice(0,getApp().data.arr_goods1.length);
     }
    }
  },
  //减少数量
  minus_num:function(){
    const index = this.data.index
   if(this.data.lists[index].nums > 0)
   {
    if(this.data.lists[index].nums == 1)
    {
      return 0
    }
    const pre_nums = this.data.lists[index].nums
    let singleSums = Math.round((this.data.lists[index].sums/pre_nums)*100)/100;
    //this.data.total = Math.round((this.data.total - singleSums)*100)/100
    this.data.lists[index].nums --;
    this.data.lists[index].sums = this.data.lists[index].sums - singleSums;
    getApp().data.arr_goods[index].sums = this.data.lists[index].sums
    getApp().data.arr_goods[index].nums --
    //Math.round(this.data.total -= singleSums)
    //this.data.total = Math.round((this.data.total - singleSums)*100)/100
    if(this.data.lists[index].checked == true)
     {
       this.data.total = Math.round((this.data.total)*100)/100
       this.setData({
         total:Math.round((this.data.total -= singleSums)*100)/100
       })
     }
    this.setData({
      lists:this.data.lists,
      //total:this.data.total
    })
    
   }
  },
  //增加数量
  add_num:function(){
    const index = this.data.index
   if(this.data.lists[index].nums > 0)
   {
     const pre_nums = this.data.lists[index].nums
     let singleSums = Math.round((this.data.lists[index].sums/pre_nums)*100)/100;
     this.data.lists[index].nums ++;
     this.data.lists[index].sums = this.data.lists[index].sums+singleSums;
     getApp().data.arr_goods[index].sums = this.data.lists[index].sums
     getApp().data.arr_goods[index].nums++
     if(this.data.lists[index].checked == true)
     {
       this.setData({
         total: Math.round((this.data.total += singleSums)*100)/100
       })
     }
     //this.data.total = Math.round((this.data.total + singleSums)*100)/100;
     this.setData({
       lists:this.data.lists,
       //total:this.data.total
     })
   }
  },
  //获取下标
  get_index:function(e){
    console.log(e)
    this.setData({
        index:e.currentTarget.dataset.index
      })
      let that = this;
      wx.createSelectorQuery().select('.cur_nums').boundingClientRect(function(res){
        if(e.detail.x < res.left&& e.detail.x > 66.875 )
        {
          //cur_nums_left = res.left;
          wx.setStorageSync('cart_goods_detail', that.data.lists[that.data.index])
          wx.navigateTo({
            url: '../goods_detail/index',
          })
        }
        else if(e.detail.x > res.left&&that.data.lists[that.data.index].small == true&&that.data.lists[that.data.index].big == false){
          // if(that.data.lists[that.data.index].small == true)
          // {
            that.data.lists[that.data.index].small = false;
            that.data.lists[that.data.index].big = true;
            that.data.lists[that.data.index].isopen = false
            that.data.setNum = true
            that.setData({
            lists:that.data.lists
            })
          // }
        }
      }).exec()
      wx.createSelectorQuery().select('.sm_cur_nums').boundingClientRect(function(res){
        if(e.detail.x < res.left && e.detail.x > 66.875)
        {
          wx.setStorageSync('cart_goods_detail', that.data.lists[that.data.index])
          wx.navigateTo({
            url: '../goods_detail/index',
          })
        }
        else if(e.detail.x > res.left && that.data.lists[that.data.index].small == false&&that.data.lists[that.data.index].big == true&&that.data.lists[that.data.index].isopen == false)
        {
        //   if(that.data.lists[that.data.index].small == false)
        //  {
           that.data.lists[that.data.index].small = true;
           that.data.lists[that.data.index].big = false;
           that.data.setNum = false
           //that.data.lists[that.data.index].isopen = true
           that.setData({
           lists:that.data.lists,
           setNum:that.data.setNum
           })
        //  }
        }
      }).exec()
      wx.createSelectorQuery().select('.png').boundingClientRect(function(res){
      console.log(res)
      }).exec()
  },
  //打开数量增添(无用)
  nums_style_change:function(){

  },
  //关闭数量增添(无用)
  close_sm:function(){

  },
  onPullDownRefresh(){
    console.log('31')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
     this.setData({
       total:0
     })
     this.close_sm()
  },
})
