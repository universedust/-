// pages/home/home.js
Page({
      /**
       * 页面的初始数据
       */
      data: {
          stitle: '结束寻物',
          latitude: "31.146740",
          longitude: "121.527690",
          scale: 14,//缩放级别，取值范围为3-20
          // markers Array    标记点
          markers: [//标记点，传入经纬度，更多详细参数见官网
             {
              latitude: "31.146740",
              longitude: "121.527690",
             }
          ],
      },
    
      /**
       * 生命周期函数--监听页面加载
       * 页面开始加载 就会触发
       */
  //     onLoad: function(options) {
  //         //获取当前的地理位置
  //         //赋值经纬度
  //         console(this.options)
  //         this.setData({
  //             latitude: this.options.x,
  //             longitude: this.options.y,
  //         })
  //     },

    onLoad: function (options) {
      // 获取页面参数并赋值
      var app = getApp();
      var a = {lon:0,lat:0};
      this.setData({
        latitude: app.globalData.x1,
        longitude: app.globalData.y1,
        a: getLonAndLat(app.globalData.x1,app.globalData.y1,app.globalData.angle,app.globalData.diatance)
      })
      console.log(getLonAndLat(app.globalData.x1,app.globalData.y1,app.globalData.angle,app.globalData.diatance))
      console.log(a)
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