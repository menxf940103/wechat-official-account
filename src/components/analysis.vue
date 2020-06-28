
<template>
    <div class="content">
        <div id="panel">
            <b>起点: </b>
            <select id="start" @change="search();">
                <option value="深大地铁站"></option>
                <option value="银科大厦">银科大厦</option>
                <option value="清华大学">清华大学</option>
            </select>
            <b>终点: </b>
            <select id="end" @change="search();">
                <option value="深圳北站">深圳北站</option>
                <option value="天坛公园">天坛公园</option>
                <option value="地铁西单站">地铁西单站</option>
            </select>
            <b>换乘策略：</b>
            <select id="policy" @change="search();">
                <option value="LEAST_TIME">较快捷</option>
                <option value="LEAST_TRANSFER">少换乘</option>
                <option value="LEAST_WALKING">少步行</option>
                <option value="NO_SUBWAY">不坐地铁</option>
            </select>
        </div>
        <div id="container" style="width:603px;height:300px"></div>
        <div style='width: 500px; height: 180px' id="infoDiv"></div>
    </div>
</template>
<script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp&key=MV4BZ-YGBK5-LYXIO-QAHE5-UQ2SH-AHFQA&referer=myapp"></script>

<script>

    export default{
        name:'news',
        data() {
            return {
                longitude:0,//经度
                latitude:0,//纬度
                city:'',
                address:""
            }
        },
        methods:{
            init(){
                var center = new qq.maps.LatLng(39.916527, 116.397128);
                var map = new qq.maps.Map(document.getElementById("container"), {
                    center: center
                });
                //设置获取公交换乘线路方案的服务
                var transferService = new qq.maps.TransferService({
                    //设置回调函数
                    complete: function(result) {
                        if (result.type == qq.maps.ServiceResultType.MULTI_DESTINATION) {
                            alert("起终点不唯一");
                        }
                    },
                    //设置检索失败回调函数
                    error: function(data) {
                        alert(data);
                    },
                    //设置公交换乘的区域范围
                    location: "深圳",
                    //展现结果的地图实例
                    map: map,
                    zoom:6,
                    //展现结果
                    panel: document.getElementById('infoDiv')
                });
                //设置搜索地点信息、乘坐方案等属性
                var start = document.getElementById('start').value;
                var end = document.getElementById('end').value;
                var policy = document.getElementById("policy").value;
                //设置乘坐方案
                transferService.setPolicy(qq.maps.TransferPolicy[policy]);
                //设置公交换乘的起点和终点
                transferService.search(start, end);
                transferService.setPolicy(policy)
            },
            search(transferService){
                this.init()
                //设置搜索地点信息、乘坐方案等属性
                var start = document.getElementById('start').value;
                var end = document.getElementById('end').value;
                var policy = document.getElementById("policy").value;
            },
            
        },
        mounted() {
            this.init();
        },
    }
</script>
<style scoped>
*{
    margin:0px;
    padding:0px;
}
body, button, input, select, textarea {
    font: 12px/16px Verdana, Helvetica, Arial, sans-serif;
}
#container {
   width:100%;
   height:300px;
}
.content{
    width: 100%;
    overflow: hidden;
}
</style>