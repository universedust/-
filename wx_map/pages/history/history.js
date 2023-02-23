// pages/home/home.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk');
var qqmap;
Page({
      /**
       * 页面的初始数据
       */
      data: {
          stitle: '个人坐标',
          latitude: "31.146740",
          longitude: "121.527690",
          scale: 14,//缩放级别，取值范围为3-20
          // markers Array    标记点
          markers: [
  //            {
  //             latitude: "32",
  //             longitude: "121",
  //            }
          ]
      },

    exit: function () {
      wx.redirectTo({
        url: '/pages/exit/exit'
      })
    },

  

    onLoad: function (options) {
    //   wx.getLocation({
    //     success: function(res) {
    //     //用腾讯地图的api，根据经纬度定位当前位置信息
    //       qqmap.reverseGeocoder({
    //          location: {
    //             latitude: res.latitude,  //回调的纬度
    //             longitude: res.longitude //回调的经度
    //          },
    //          //回调成功显示位置的详细数据
    //             success:(res)=> {
    //               consle.log(res)
    //             },
    //              //回调失败  （调用成功之后这个可以不需要 ，回调失败会有报错信息方便调试）
    //             fail: function (res) {
    //               console.log(res);
    //             },
    //            //成功失败都会执行
    //             complete: function (res) {
    //                consle.log(res)
    //           }
    //       })
    //    },
    // })
      this.getMapList()
      // 获取页面参数并赋值
      var app = getApp();
      console.log("测试数据：")
      console.log(app.globalData.x1)
      console.log(app.globalData.y1)

      this.setData({
        latitude: app.globalData.y1,//纬度
        longitude: app.globalData.x1,
      })
 
    },

     // 获取地图标点的计算数据
   getMapList(){
    var app = getApp();
    wx.request({
      url: 'http://81.68.216.192:8375/map/address.do?x='+app.globalData.x1+'&y='+app.globalData.y1,
      method:'GET',
      // data:{
      //   page: this.data.page,
      //   limit: this.data.pageSize
      // },
      success: (res) =>{
        console.log(res)
        this.setData({
          markers : res.data
        })
      }
    })
  }

  })

  var mapNumberUtil = {
		rad: function rad(d) {
			return d * Math.PI / 180.0;
		},
		deg: function deg(d) {
			return d * 180/ Math.PI
		}
  };
  
  

  const getLonAndLat = function (lon,lat,brng,dist){
          //大地坐标系资料WGS-84 长半径a=6378137 短半径b=6356752.3142 扁率f=1/298.2572236
          var a=6378137;
          var b=6356752.3142;  
          var f=1/298.257223563; 
          var lon1 = lon*1;
          var lat1 = lat*1; 
          var s = dist;   
          var alpha1 = mapNumberUtil.rad(brng);
          var sinAlpha1 = Math.sin(alpha1);
          var cosAlpha1 = Math.cos(alpha1); 
          var tanU1 = (1-f) * Math.tan(mapNumberUtil.rad(lat1));
          var cosU1 = 1 / Math.sqrt((1 + tanU1*tanU1)), sinU1 = tanU1*cosU1;
          var sigma1 = Math.atan2(tanU1, cosAlpha1)   
          var sinAlpha = cosU1 * sinAlpha1;
          var cosSqAlpha = 1 - sinAlpha*sinAlpha;   
          var uSq = cosSqAlpha * (a*a - b*b) / (b*b);
          var A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq))); 
          var B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq)));
          var sigma = s / (b*A), sigmaP = 2*Math.PI;
          while (Math.abs(sigma-sigmaP) > 1e-12) {
              var cos2SigmaM = Math.cos(2*sigma1 + sigma);
              var sinSigma = Math.sin(sigma);
              var cosSigma = Math.cos(sigma);
              var deltaSigma = B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
              B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));
              sigmaP = sigma;
              sigma = s / (b*A) + deltaSigma;
          }
    
          var tmp = sinU1*sinSigma - cosU1*cosSigma*cosAlpha1;
          var lat2 = Math.atan2(sinU1*cosSigma + cosU1*sinSigma*cosAlpha1,(1-f)*Math.sqrt(sinAlpha*sinAlpha + tmp*tmp));
          var lambda = Math.atan2(sinSigma*sinAlpha1, cosU1*cosSigma - sinU1*sinSigma*cosAlpha1);
          var C = f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));
          var L = lambda - (1-C) * f * sinAlpha * (sigma + C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));
          var revAz = Math.atan2(sinAlpha, -tmp); // final bearing
          var lonLatObj = {lon:lon1+mapNumberUtil.deg(L),lat:mapNumberUtil.deg(lat2)}
          return lonLatObj;
      }
  // 备注·角度计算参考：https://blog.csdn.net/zengmingen/article/details/68490497