
<template>
    <div>
        <!-- <div>
            <input id="keyword" type="textbox" value="酒店" v-model="value">
            <input type="button" value="搜索" @click="searchKeyword()">
        </div> -->
        <!-- <div id="aToMap"></div> -->
        <a id="aToMap" style="width:100%;height:500px;" href="#">
            <!-- <div id="container" style="width:100%;height:500px;"></div> -->
            <!-- <div style='width: 500px; height: 180px' id="infoDiv"></div> -->
        </a>
</div>
</template>
<script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp"></script>

<script>
// https://map.qq.com/api/js?v=2.exp&key=MV4BZ-YGBK5-LYXIO-QAHE5-UQ2SH-AHFQA

// http://map.qq.com/api/js?v=2.exp

// 22.532772,114.013451
// var searchService = []
    export default{
        name:'news',
        data() {
            return {
                longitude:22.532772,//经度
                latitude:114.013451,//纬度
                markers:[],
                searchService:[],
                value:'酒店'
            }
        },
        methods:{
            // init() {
            //     //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
            //     //设置地图中心点
            //     var myLatlng = new qq.maps.LatLng(this.longitude,this.latitude);
            //     //定义工厂模式函数
            //     var myOptions = {
            //       zoom: 16,               //设置地图缩放级别
            //       center: myLatlng,      //设置中心点样式
            //       mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
            //     }
            //     //获取dom元素添加地图信息
            //     var map = new qq.maps.Map(document.getElementById("container"), myOptions);
            //     //给地图添加点击事件
            //     //并获取鼠标点击的经纬度
            //     // qq.maps.event.addListener(map, 'click', function(event) {
            //     //     this.longitude = event.latLng.getLat();
            //     //     this.latitude = event.latLng.getLng();
            //     //     alert("经度:"+this.longitude+","+"纬度:"+this.latitude);
            //     // });

            //     var marker = new qq.maps.Marker({// 添加标注
            //         position: myLatlng,
            //         map: map,
            //     });
            //     var cirle = new qq.maps.Circle({//添加圆形覆盖物
            //         center: new qq.maps.LatLng(this.longitude,this.latitude),
            //         radius: 20000,
            //         map: map
            //     });
            //     // -------------------检索周边
            //     var latlngBounds = new qq.maps.latlngBounds();
            //     var getsear = new qq.map.searchService(abc)
            //     var abc = {
            //         location:"深圳",//搜索范围
            //         pageIndex:1,//搜索页码
            //         pageCapacity:5,//搜索结果条数
            //         panel:document.getElementById("infoDiv"),//查询数据展示到指定dom中
            //         autoExtend:true,//设置扩大检索区域
            //         complete: function(results) {
            //             //设置回调函数参数
            //             var pois = results.detail.pois;
            //             for (var i = 0, l = pois.length; i < l; i++) {
            //                 var poi = pois[i];
            //                 //扩展边界范围，用来包含搜索到的Poi点
            //                 latlngBounds.extend(poi.latLng);
            //                 var marker = new qq.maps.Marker({
            //                     map: map,
            //                     position: poi.latLng
            //                 });

            //                 marker.setTitle(i + 1);

            //                 this.markers.push(marker);

            //             }
            //             //调整地图视野
            //             map.fitBounds(latlngBounds);
            //         },
            //         //若服务请求失败，则运行以下函数
            //         error: function() {
            //             alert("出错了。");
            //         }
            //     }
            //     this.searchService.push(getsear)
            // },
            init(){
                    var citylocation,map,marker = null;
                    //给外层的a标签加上url，方便一会点击小地图的时候直接跳转。
                    function newMapGo(id,lat,lng){
                    // var markUrl = 'https://apis.map.qq.com/tools/poimarker' +
                    // '?marker=coord:' + lat + ',' + lng + 
                    // '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp';

                    var markUrl = 'https://apis.map.qq.com/tools/poimarker' +
                    '?type=1&region=祁东县&keyword=祁东县妇幼保健院&center=26.788458,112.112188&radius=10000'+
                    '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp';

                    //给位置展示组件赋值
                    document.getElementById(id).href = markUrl;
                    document.getElementById(id).click()
                }
                    //需要外层元素id和对应地址的经纬度
                    function newMap(id,lat,lng){
                        var center = new qq.maps.LatLng(lat, lng);
                        var map = new qq.maps.Map(document.getElementById(id), {
                            center: center,
                            zoom: 18
                        });
                    //调用城市服务信息
                    citylocation = new qq.maps.CityService({
                        complete : function(results){
                            map.setCenter(results.detail.latLng);
                            if (marker != null) {
                            // marker.setMap(null);
                            }
                            //设置marker标记
                            marker = new qq.maps.Marker({
                                map: map,
                                position: results.detail.latLng
                            });
                        }
                    });
                    citylocation.searchCityByLatLng(center);
                    newMapGo('aToMap',lat,lng);
                    }
                    //给id,经纬度
                    newMap('container',this.longitude,this.latitude)
            }
            // clearOverlays(overlays){
            //     var overlay;
            //     while (overlay = overlays.pop()) {
            //         overlay.setMap(null);
            //     }
            // },
            // //设置搜索的范围和关键字等属性
            // searchKeyword() {
            //     // var keyword = document.getElementById("keyword").value;
            //     this.clearOverlays(this.markers);
            //     //根据输入的城市设置搜索范围
            //     // searchService.setLocation("北京");
            //     //根据输入的关键字在搜索范围内检索
            //     // var searchService = this.searchService
            //     // searchService.search(keyword);
            //     console.log("111:",this.searchService)
            //     // searchService.search(this.value)
            // }
        },
        mounted() {
            // 解决返回的上一层时，页面空白问题
            if(history.length>2){
                history.back()
            }else{
                this.init();
            }   
        }
    }
</script>