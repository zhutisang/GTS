Page({

    /**
     * 页面的初始数据
     */
    data: {
        slider: [
            { 'img': 'https://m.360buyimg.com/babel/jfs/t1/163695/36/9806/52019/60430f9fE40e83f3e/faeaaa0e81c49198.jpg' },
            { 'img': 'https://m.360buyimg.com/babel/jfs/t1/164104/10/10422/127270/6045debcE71cfaf79/c029ed7e64aa7f68.png' },
            { 'img': 'https://m.360buyimg.com/babel/jfs/t1/157252/7/10189/113518/6041d690Eb65c914b/ae21951c316cbe4b.jpg' }
        ],

        //分类

        category: [
            //蔬菜
            { 'img': 'http://tiebapic.baidu.com/forum/w%3D580/sign=a216206864f082022d9291377bfafb8a/cc6bdab44aed2e73848942679001a18b87d6fa2f.jpg' },
            //肉禽
            { 'img': 'http://tiebapic.baidu.com/forum/w%3D580/sign=c5c82038ba4bd11304cdb73a6aaea488/02088618367adab447b0df089cd4b31c8701e42f.jpg' },
            //鸡蛋
            { 'img': 'http://tiebapic.baidu.com/forum/w%3D580/sign=49fa2848df95d143da76e42b43f18296/490ab051f81986183d272bcf5ded2e738bd4e62f.jpg' },
            //水果
            { 'img': 'http://tiebapic.baidu.com/forum/w%3D580/sign=9718b2d29526cffc692abfba89004a7d/b6196e061d950a7b22558a8f1dd162d9f2d3c92f.jpg' },
            //海鲜
            { 'img': 'http://tiebapic.baidu.com/forum/w%3D580/sign=d56e39eec643ad4ba62e46c8b2035a89/4a40f8198618367ad6e9bb9639738bd4b31ce52f.jpg' },
           //调料
            { 'img': 'http://tiebapic.baidu.com/forum/w%3D580/sign=62f4735dd8fc1e17fdbf8c397a91f67c/94171d950a7b02085aa9fbaa75d9f2d3572cc82f.jpg' },
            //奶制品
            { 'img': 'http://tiebapic.baidu.com/forum/w%3D580/sign=905fabd4b30f4bfb8cd09e5c334e788f/d4628bd4b31c8701b3d676ad307f9e2f0708ff2f.jpg' },
            //速食
            { 'img': 'http://tiebapic.baidu.com/forum/w%3D580/sign=f499463e54a98226b8c12b2fba83b97a/53104c086e061d951526f3736cf40ad162d9ca2f.jpg' }
        ],
        floor: [
            //商品图片 
            {
                'img': 'https://img14.360buyimg.com/n0/jfs/t1/169233/4/8274/461938/603a30dcE6522b44c/cc78e52b260c297b.jpg',
                'txt': '新鲜四季草莓双流草莓水果烘焙奶油牛奶蛋糕商用酸草莓2盒起包邮',
                'price':'¥28'
                    //草莓
            },
            {
                'img': 'https://img14.360buyimg.com/n0/jfs/t2734/309/1027524695/113865/7c69e502/57330785N2a5be83d.jpg',
                'txt': '特大14大闸蟹螃蟹鲜活全母阳澄湖镇官方旗舰海鲜河蟹水产10只送4',
                'price':'¥108'
                    //螃蟹
            },
            {
                'img': 'https://img14.360buyimg.com/n0/jfs/t1/65943/26/448/172729/5cea5c19E103d95ba/170df44403f3090e.jpg',
                'txt': '新鲜黑猪肋排大别山农家散养现杀土猪肉黑猪排骨3斤装',
                'price':'¥48'
                    //排骨
            },
            {
                'img': 'https://img14.360buyimg.com/n0/jfs/t1/139548/3/15734/176803/5fbcfe21E7a2c2f14/fbb37eeea24434db.jpg',
                'txt': '新鲜牛腱子肉生鲜1.5kg真空包装冷冻牛肉自家现杀原切国产黄牛肉',
                'price':'¥68'
                    //牛肉
            },
            {
                'img': 'https://img14.360buyimg.com/n0/jfs/t22081/69/539975380/396180/50bb9d43/5b111ff9N250f9e54.jpg',
                'txt': '山东蜜薯烟薯25糖心红薯新鲜10斤红心番薯沙地香薯烤地瓜超甜山芋',
                'price':'¥18'
                    //番薯
            },
            {
                'img': 'https://img14.360buyimg.com/n0/jfs/t1/148444/3/18903/115413/5fe0337eEca3c49f5/e7125b5d22bebf83.jpg',
                'txt': '光明纯奶250mL*24盒苗条装新品整箱早餐纯牛奶早餐奶牛奶盒装',
                'price':'¥88'
                    //牛奶
            }
        ],

    },
    handleItemTap:function (e){
        wx.navigateTo({
          url: '../goodS_list/index',
        })
        },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})