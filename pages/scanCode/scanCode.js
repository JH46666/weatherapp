// pages/scanCode/scanCode.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    bookList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let count = 0;
    try {
      const bookList = [];      
      var res = wx.getStorageInfoSync();
      const len = res.keys.length;
      res.keys.forEach(item=>{
        if (item === "logs") {} 
        else {
          wx.getStorage({
            key: item,
            success: res => {
              bookList.push(res.data);
              count++;
              if (count === len-1) {
                this.setData({
                  bookList: bookList
                });
                console.log('9', this.data.bookList)                
              }
            }
          })
        }
      })
      bookList.forEach(key=>{
        if(key.price.indexof('元')){
          console.log('元')
        } else {
          key.price = key.price + "元 "
        }
      })

    } catch (e) {
      // Do something when catch error
    }
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

  },
  scanCode(event){
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success: res =>{
      console.log(res.result);
      wx.request({
        url: 'http://jh46666.cn/v2/book/isbn/' + res.result,
        data: {},
        header: {
          'content-type': 'application/text' // 默认值
        },
        success:res => {
          let bookList = [];
          bookList = this.data.bookList;
          const price = res.data.price;
          if (price.indexOf('元') > -1) {
            console.log('无');
          } else {
            res.data.price = res.data.price + "元"
          }
          bookList.push(res.data);
          this.setData({
            bookList: bookList,
          })
          try {
            wx.setStorage({
              key: res.data.id,
              data: res.data
            })
          } catch(e) {
            console.log(e)
          }
        }
      })
      }
    })
  },
  onView(id){
    wx.navigateTo({
      url: '../bookDetail?id='+ id,
    })
  }
})