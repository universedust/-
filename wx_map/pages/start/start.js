// pages/login/login.js
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../utils/qqmap-wx-jssdk');
var qqmapsdk;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: { 
      x: '', 
      y:''
      }, 
      latitude:0,
      longitude:0
  },

  onLoad: function(){
    qqmapsdk = new QQMapWX({
      key: 'EMOBZ-U3IC4-MAMUV-XGYSF-HBIY2-IRBDP'
    });
  },

  onShow: function () {
    // 调用接口
    qqmapsdk.reverseGeocoder({
        success: function (res) {
            let result = res.result;
            console.log(res.status, res.message);
        },
        fail: function (res) {
            console.log(res.status, res.message);
        },
        complete: function (res) {
        console.log(res.status, res.message);
    }
  });
  },
 
  initGetLocationFlunction(isRefresh){
    let that = this;
    this.setData({isUpdateLocatin:true})
    qqmapsdk.reverseGeocoder({
      success: function(res) {
        let result = res.result;
        console.log(res);
      },
      fail: function(res) {
        console.log(res.status, res.message);
       
      },
      complete: function(res) {
        console.log(res.status, res.message);
      }
    })
  },

  toregister() {
    wx.navigateTo({
        url: '/pages/register/register',
      })
  },


  denglu: function () {
   
    // this.initGetLocationFlunction();
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
      console.log(res)

      that.setData({
        latitude: res.latitude,
        longitude: res.longitude
      })
      getApp().globalData.x1 = res.longitude;
      getApp().globalData.y1 = res.latitude;
      console.log(that.data);
      wx.redirectTo({
        url: '/pages/history/history'
      })
      // wx.openLocation({
      //   latitude: res.latitude,
      //   longitude: res.longitude,
      //   scale: 28
      // })
    }
    })
    var app = getApp();
    console.log(getApp().globalData.x1)
    console.log(getApp().globalData.y1)
   
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