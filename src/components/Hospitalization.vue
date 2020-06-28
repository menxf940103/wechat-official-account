<template>
    <div class="content">
        <div class="list_money">
            <h3>{{this.dataList.totalAmout}}</h3>
            <p class="list_money_desc">总费用（元）</p>
        </div>
        <div class="ifcation_detail">
            <p class="detail_title">
                <span>项目名称</span>
                <span>金额(元)</span>
            </p>
            <van-cell :title="item.typeName" :value="item.typeAmout" v-for="item in this.dataList.feeInfo" :key="item.typeCode" is-link :to="{path:'/hospitaliexdatils',query:{inpatientId:inpatientId,typeCode:item.typeCode}}" />
        </div>
        <p class="tips">
            <span style="color:#0297d7;">温馨提示：</span>
            <span>数据仅供参考，实际费用以医院纸质明细为标准。</span>
        </p>
    </div>
</template>
<script>
import Vue from 'vue';
import { gethospitialFee } from '../api/api'
export default {
    data(){
        return{
            name:'',
            dataList:"",//界面数据
            inpatientId:"",//就诊卡号
            data:"",//日期
        }
    },
    methods:{
        getInfor:function(){//获取数据信息--每日清单
            let parm = {
                inpatientId:this.inpatientId,//就诊卡号
                // inpatientId:'Z0010732',//就诊卡号
            }
            gethospitialFee(parm).then((res) => {
                this.dataList = res.data.totalCode
                this.inpatientId = res.data.inpatientId
            })
        },
    },
    mounted(){
        this.inpatientId = this.$route.query.inpatientId
        this.getInfor()//获取信息
    }
}
</script>
<style scoped>
.content{
    width: 100%;
}

.content .nav_input_text{   
    border: none;
    width: 40%;
}
.content input[type="date" i]{
    width: 36%;
    line-height: 2.2rem;
    font-size: 0.8rem;
    height: 100%;
    background:url('../assets/images/xia.png') no-repeat;
    background-position: right;
    background-size: 80px!important;
    padding-inline-start: 0px;
    -webkit-appearance: button;
}
/* 顶部总费用 */
.content .list_money{
    height: 3rem;
    background: #0297d7;
    width: 100%;
    padding: 1rem 0px;
    color: white;
}
.content .list_money .list_money_desc{
    font-size: 0.8rem;
}
/* 费用明细 */
.content .van-cell__title{
    text-align: left;
}
.content .ifcation_detail{
    width: 100%;
    background-color: #eeeeee;
    border-bottom: 1px solid #eeeeee;
}
.content .ifcation_detail .detail_title{
    width: 90%;
    margin: auto;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 0.8rem;
    display: flex;
    flex-direction: row;
}
.content .ifcation_detail .detail_title span:nth-child(1){
    text-align: left;
    display: inline-block;
    flex: 1;
}
.content .ifcation_detail .detail_title span:nth-child(2){
    text-align: right;
    display: inline-block;
    flex: 1;
}
.content .ifcation_detail .detail_title span:nth-child(2) i{
    font-style:inherit;
    color: #0297d7;
}
.content .tips{
    font-size: 12px;
    width: 100%;
    margin-top: 1rem;
}

</style>