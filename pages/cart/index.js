// pages/cart/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr_goods:[],
    arr_goods1:[],   
    lists:[],
    checkedValue:'',
    deal_delete:'结算',
    manage_text:'管理',
    ready_del:[],
    clear:'',
    all_check_true:false,
    index:0,
    s1:false,
    s2:true
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
    let list = this.data.arr_goods1.map((key,index)=>{return{...key,...this.data.arr_goods[index]}})
    for(let i = 0 ; i < list.length; i ++)
    {
      for(let m = i + 1 ; m < list.length; m ++)
      {        
        if(list[m].name == list[i].name )
        {
          console.log('231')
          list[i].sums += list[m].sums;
          list[i].nums += list[m].nums;
          list.splice(m,1)
          m--;
          console.log(list)
      }
    }

    // if(list.length == 1){
    //   this.setData({
    //     lists:list
    //   })
    // }
  }
    this.setData({
      lists:list
    })
    if(this.data.lists.length != 0)
    {
      this.setData({
        all_check_true:false,
        manage_text:'管理',
        deal_delete:'结算'
      })
    }
    else
    { 
      this.setData({
        all_check_true:true,
        manage_text:'',
        deal_delete:'购物车为空'
      })
    }
  },
  manage:function(e){
     if(this.data.manage_text == '管理')
    {
      this.setData({
      manage_text:'完成',
      checkedValue:'',
      clear:'清理'
    })
    if(this.data.manage_text =='完成')
    {
      this.setData({
        deal_delete:'删除'
      })
      this.once_del();
      this.delete();
    }
  }
    else{
      this.setData({
        deal_delete:'结算',
        manage_text:'管理',
        clear:''
      }) 
    }
  },
  delete:function(){
    if(this.data.deal_delete == '删除'){
      for(let i = 0 ; i < this.data.lists.length ; i ++)
      {
        for(let m = 0 ; m < this.data.ready_del.length ; m ++)
        {
          if(this.data.ready_del[m] == this.data.lists[i].name)
          {
            this.data.lists.splice(i,1);
            getApp().data.arr_goods.splice(i,1);
            getApp().data.arr_goods1.splice(i,1);
          }
        }
      }
      this.setData({
        lists:this.data.lists
      })
    }
    else
    {
      return 0
    }
  },
  checkboxChange:function(e){
    console.log(e.detail.value)
    this.setData({
      ready_del:e.detail.value,      
    })
    
  },
  checkboxChangeAll:function(e){
    if(this.data.checkedValue != true){
      for(let i = 0 ;i < this.data.lists.length ; i++)
    {
     this.data.lists[i].checked = true;
    }
    this.setData({
      lists:this.data.lists,
      checkedValue:true
    })
    }
    else
    {
      for(let i = 0 ;i < this.data.lists.length ; i++)
      {
       this.data.lists[i].checked = '';
      }
      this.setData({
        lists:this.data.lists,
        checkedValue:''
      })
    }
  },
  once_del:function(){
    if(this.data.manage_text =='完成') 
    { this.setData({
       lists:''
     })
    }
  },
  minus_num:function(){
    const index = this.data.index
   if(this.data.lists[index].nums > 0)
   {
    if(this.data.lists[index].nums == 1)
    {
      return 0
    }
     const pre_nums = this.data.lists[index].nums
     this.data.lists[index].nums --;
     this.data.lists[index].sums = this.data.lists[index].sums-(this.data.lists[index].sums/pre_nums)
     getApp().data.arr_goods[index].sums = this.data.lists[index].sums
     getApp().data.arr_goods[index].nums--
     this.setData({
       lists:this.data.lists
     })
    
   }
  //  else if(this.data.lists[index].nums == 1)
  //  {
  //   const pre_nums = this.data.lists[index].nums
  //   this.data.lists[index].nums = 1;
  //   this.data.lists[index].sums = this.data.lists[index].sums/this.data.lists[index].nums
  //   getApp().data.arr_goods[index].sums = this.data.lists[index].sums
  //   getApp().data.arr_goods[index].nums = 1
  //   this.setData({
  //     lists:this.data.lists
  //   })
  //  }
  //  else
  //  {

  //  }
  },
  add_num:function(e){
    const index = this.data.index
   if(this.data.lists[index].nums > 0)
   {
     const pre_nums = this.data.lists[index].nums
     this.data.lists[index].nums ++;
     this.data.lists[index].sums = this.data.lists[index].sums+(this.data.lists[index].sums/pre_nums)
     getApp().data.arr_goods[index].sums = this.data.lists[index].sums
     getApp().data.arr_goods[index].nums++
     this.setData({
       lists:this.data.lists
     })
   }
  },
  get_index:function(e){
    this.setData({
        index:e.currentTarget.dataset.index
      })
      return e.currentTarget.dataset.index
  },
  nums_style_change:function(e){
    console.log(this.data.index)
    for(let i = 0 ; i < this.data.lists.length ; i ++)
    { 
      console.log('das')
    if(this.data.s1 == false && i == this.data.index)
    {
      this.setData({
        s1:true,
        s2:false
      })
    }
  }
  },
  close_sm:function(){
    if(this.data.s2 == false)
    {
      this.setData({
        s1:false,
        s2:true
      })
    }
  }

})
