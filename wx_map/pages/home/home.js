// 引入腾讯地图SDK
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
        address:'',
        name:'',
        longitude:'',
        latitude:''
    },
 
    
  map(v){
    var that = this;
    wx.chooseLocation({
      success: function (res) {
          console.log(res)
          that.setData({
            address: res.address,      //调用成功直接设置地址
            name: res.name,
            longitude: res.longitude,
            latitude: res.latitude
        })
      }
     })
    },
})