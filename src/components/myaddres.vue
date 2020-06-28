<template>
    <div class="content">
        <div id="container" style="width:600px;height:500px;"></div>
    </div>
</template>
<script charset="utf-8" src="https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js"></script>
<script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp&key=MV4BZ-YGBK5-LYXIO-QAHE5-UQ2SH-AHFQA"></script>
<script>
export default {
    data() {
        return {
            longitude:0,//经度
            latitude:0,//纬度
            city:'',
            location:""
        }
    },
    methods:{
        //第一部分
        //定位获得当前位置信息
        getMyLocation() {
            var geolocation = new qq.maps.Geolocation("MV4BZ-YGBK5-LYXIO-QAHE5-UQ2SH-AHFQA", "ceshi");
            geolocation.getIpLocation(this.showPosition, this.showErr);
            // geolocation.getLocation(this.showPosition, this.showErr);//或者用getLocation精确度比较高
        },
        showPosition(position) {
            console.log('position:',position.addr);
            this.latitude = position.lat;
            this.longitude = position.lng;
            this.city = position.city;
            console.log(position.nation+position.province+position.city)
            // alert(position.nation+position.province+position.city)
            this.setMap();
        },
        showErr() {
            console.log("定位失败");
            this.getMyLocation();//定位失败再请求定位，测试使用
        },
        //位置信息在地图上展示
        setMap() {
            //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
            //设置地图中心点
            var myLatlng = new qq.maps.LatLng(this.latitude,this.longitude);
            this.location = this.latitude,this.longitude
            console.log('地图中心点：',this.latitude,this.longitude)
            //定义工厂模式函数
            var myOptions = {
                zoom: 15,               //设置地图缩放级别
                center: myLatlng,    //设置中心点样式
                mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
            }
            // //获取dom元素添加地图信息
            var map = new qq.maps.Map(document.getElementById("container"), myOptions);
            //第三部分
            //给定位的位置添加图片标注
            var marker = new qq.maps.Marker({
                position: myLatlng,
                map: map
            });
            //给定位的位置添加文本标注
            var marker = new qq.maps.Label({
                position: myLatlng,
                map: map,
                // content:'这是我当前的位置，偏差有点大，哈哈'
            });
        },
    },
    mounted(){
        this.getMyLocation();
    }
}
</script>
<style scoped>
* {
    margin: 0px;
    padding: 0px;
}
body,button,input,select,textarea {
    font: 12px/16px Verdana, Helvetica, Arial, sans-serif;
}
#container {
    min-width: 600px;
    min-height: 767px;
}
</style>