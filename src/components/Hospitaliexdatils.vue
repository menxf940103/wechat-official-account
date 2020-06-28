<template>
    <div class="content">
        <table>
            <tr>
                <th>项目名称</th>
                <th>数量（规格）</th>
                <th>单价</th>
                <th>金额（元）</th>
            </tr>
            <tr v-for="item in this.dataList" :key="item.id">
                <th>{{item.detailName}}</th>
                <th>{{item.detailCount}}（个）</th>
                <th>{{item.detailPrice}}</th>
                <th>{{item.detailAmout}}</th>
            </tr>
        </table>
        <p class="tips">
            <span style="color:#0297d7;">温馨提示：</span>
            <span>数据仅供参考，实际费用以医院纸质明细为标准。</span>
        </p>
    </div>
</template>
<script>
import Vue from 'vue';
import { getfeeDetail } from '../api/api'
export default {
    data(){
        return{
            dataList:[],
            inpatientId:'',//住院号
            typeCode:'',//费用类别代码
            date:""//日期
        }
    },
    methods:{
        getInfor:function(){
            let parm = {
                inpatientId:this.inpatientId,//就诊卡号
                typeCode:this.typeCode,//费用类别
            }
            getfeeDetail(parm).then((res) => {
                if(res.code == 1){
                    this.dataList = res.data
                }else{
                    alert(res.data)
                }
                console.log('返回数据',res)
            }).catch((error) => {console.log(error)})
        }
    },
    mounted(){
        this.inpatientId = this.$route.query.inpatientId
        this.typeCode = this.$route.query.typeCode
        this.getInfor()
    }
}
</script>
<style scoped>
.content{
    width: 100%;
}
table{
    border-collapse: collapse; 
    font-size: 12px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

table tr:nth-child(1){
    background-color: #eeeeee;
    height: 3rem;
}
table tr{
    border-bottom: 1px solid #eeeeee;
}
.content table tr{
    font-size: 12px;
    font-weight: 100;
    height: 2rem;
}
.content table tr th:nth-child(1){
    width: 40%;
}
.content table tr th:nth-child(2){
    width: 20%;
}
.content table tr th:nth-child(3){
    width: 20%;
}
.content table tr th:nth-child(4){
    width: 20%;
}
.content .tips{
    font-size: 12px;
    width: 100%;
    margin-top: 1rem;
}
/* 底部公司标注 */
/* .content .cominfor{
    bottom: 0px;
    position: fixed;
    margin: auto;
    width: 100%;
}
.content .company{
    font-size: 12px;
    color: #cccccc;
} */
</style>