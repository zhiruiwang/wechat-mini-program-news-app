// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    date: "",
    source: "",
    title: "",
    readCount:0,
    content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        let result = res.data.result
        this.setData({
          date: result.date.slice(11, 16),
          source: result.source,
          title: result.title,
          readCount: result.readCount,
          content: result.content
        })
      }
    })
  wx.setNavigationBarColor({
    frontColor: '#000000',
    backgroundColor: '#ffffff',
    })
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
})