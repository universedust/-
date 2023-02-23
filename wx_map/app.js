// app.js
App({
  globalData: {
    pid: 0,
    name:'',
    address:'',
    phone:'',
    x1:"31.11",
    y1:'31.11',
    x2:'31.11',
    y2:'31.11',
    angle:30,
    diatance:10000
  },

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
