// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: { 
      x: '', 
      y:''
      }, 
  },


  toregister() {
    wx.navigateTo({
        url: '/pages/register/register',
      })
  },


  denglu: function () {
    console.log(this.data);
    if (this.data.x == '' || this.data.x == undefined || this.data.y == '' || this.data.y == undefined) {
        wx.showModal({
            title: '系统提示',
            content: '经度纬度数据不能为空！',
            showCancel: false,
            confirmText: '知道了',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }
            }
        })
    } else {
      var app = getApp();
      getApp().globalData.x1 = this.data.x;
      getApp().globalData.y1 = this.data.y;

      wx.redirectTo({
        url: '/pages/history/history?x='+this.data.x+'&y='+this.data.y,
      })
    }
},
nameInput: function (e) {
    this.setData({
      x: e.detail.value
    })
},
passwordInput: function (e) {
    this.setData({
        y: e.detail.value
    })
},
toRes:function(){
    wx.redirectTo({
  url:"/pages/home/home"
})
}
})