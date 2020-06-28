<template>
    <div class="content">

        <!-- <p class="nav_title">科室分布</p> -->
        <!-- <div class="nav_one">
            <div></div>
        </div> -->
        <!-- <table width="100%">
            <tr><th rowspan="5" class="floor_single">1F</th></tr>
            <tr><th>挂号收款室</th></tr>
            <tr><th>门诊（儿科诊室 西药房 中药房）</th></tr>
            <tr><th>急诊：（妇科/儿科急诊 抢救室 留观院）</th></tr>
            <tr><th>儿童输液室 成人输液室 皮试采血室</th></tr>
            <tr><th rowspan="8" class="floor_double">2F</th></tr>
            <tr><th>妇科门诊:(妇科诊室 妇科治疗室)</th></tr>
            <tr><th>计生服务:(流产 上环 取环)</th></tr>
            <tr><th>保健门诊:(小儿口腔/听力/眼保健 生育保健</th></tr>
            <tr><th>孕妇学校 孕期/妇女保健 孕妇营养检测室</th></tr>
            <tr><th>母乳咨询室 青春期保健 预防接种室</th></tr>
            <tr><th>VIP产检门诊 儿童心理咨询/智力筛查)</th></tr>
            <tr><th>电子阴道镜 中医门诊 出生证办理</th></tr>
            <tr><th rowspan="4" class="floor_single">3F</th></tr>
            <tr><th>检验科 农合医保兑付</th></tr>
            <tr><th>特检科:(放射科 B超室 胎监室 心电图室)</th></tr>
            <tr><th>住院结算中心 中心药房 出生证办理</th></tr>
            <tr><th rowspan="2" class="floor_double">4F</th></tr>
            <tr><th>儿科住院部</th></tr>
            <tr><th rowspan="2" class="floor_single">5F</th></tr>
            <tr><th>新生儿科住院部 高端产科住院部</th></tr>
            <tr><th rowspan="2" class="floor_double">6F</th></tr>
            <tr><th>妇产科住院部（二）</th></tr>
            <tr><th rowspan="2" class="floor_single">7F</th></tr>
            <tr><th>妇产科住院部（一）</th></tr>
            <tr><th rowspan="2" class="floor_double">8F</th></tr>
            <tr><th>手术室 产房</th></tr>
            <tr><th rowspan="2" class="floor_single">9F</th></tr>
            <tr><th>行政职能办公室</th></tr>
            <tr><th rowspan="2" class="floor_double">10F</th></tr>
            <tr><th>药剂科 大型会议室 中型会议室</th></tr>
            <tr><th rowspan="2" class="floor_single">11F</th></tr>
            <tr><th>供应室</th></tr>
        </table> -->
    </div>
</template>
<script>
import Vue from 'vue'
import {getDeptAddress} from '../api/api'
export default {
    methods:{
        getDeptAddressAction:function(){//获取科室分布信息
            getDeptAddress().then(res => {
                window.location.replace(res.data)
            }).catch(error => {console.log(error)})
        }
    },
    mounted(){
        this.getDeptAddressAction()
    }
}
</script>
<style scoped>
.content{
    width: 100%;
    height: 100%;
}
.content table {
    color: white;
    font-size: 14px;
}
.content table th{
    background-color: #55aade;
}
.content table .floor_single{
    background-color: #21bef9;
}
.content table .floor_double{
    background-color: #57c29e;
}
</style>