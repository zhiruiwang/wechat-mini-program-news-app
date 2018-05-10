const cat_map={"国内":"gn",
"国际":"gj",
"财经":"cj",
"娱乐":"yl",
"军事":"js",
"体育":"ty",
"其他":"other"}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    date:"",
    image:"",
    source:"",
    title:"",
    cat:["国内", "国际", "财经", "娱乐", "军事", "体育", "其他"],
    currentTab: "国内",
    tab: "gn",
    rest_news:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getNews()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 从API获得新闻列表
   */
  getNews: function (callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.tab
      },
      success: res => {
        let result1 = res.data.result[0]
        let result_rest = res.data.result.slice(1)
        result_rest.forEach(function (element, index, array) {
          array[index].date = array[index].date.slice(11, 16)
        })
        this.setData({
          id: result1.id,
          date: result1.date.slice(11, 16),
          image: result1.firstImage,
          source: result1.source,
          title: result1.title,
          rest_news: result_rest
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  /**
   * 点击切换页面
   */
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        tab: cat_map[e.target.dataset.current]
      })
      this.onLoad()
    }
  },
  /**
   * 处理缺失图片
   */
  binderrorimg: function (e) {
    var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
    var imgObject = "carlistData[" + errorImgIndex + "].img" //carlistData为数据源，对象数组
    var errorImg = {}
    errorImg[imgObject] = "http://cs.pes.edu/wp-content/uploads/2016/06/default-2.jpg" //我们构建一个对象
    this.setData(errorImg) //修改数据源对应的数据
  },
  /**
   * 点击新闻view切换至详细新闻
   */
  onTabnews:res=>{
    let id = res.currentTarget.dataset.current
    wx.navigateTo({
      url: '/pages/list/list?id='+id,
    })
  }
})