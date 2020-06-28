<template>
    <div class="content">
        <div class="content_top">
            <p class="top_title">
                <img src="../assets/images/a1.png"/>
                <span>{{this.patientName}}&nbsp;|&nbsp;{{this.deptName}}</span>
                <input type="date" class="nav_input_text" :value="this.day" ref="input1" @change="clickTime">
            </p>
        </div>
        <div class="list_money">
            <h3>{{this.dataList.balance}}</h3>
            <p class="list_money_desc">截止至上一日结存余额（元）</p>
        </div>
        <div class="ification">
            <dl>
                <dt>截止当前的费用款项</dt>
                <dd>
                    <span>{{this.dataList.totalAmout}}</span>
                    <span>总费用（元）</span>
                </dd>
                <dd>
                    <span>{{this.dataList.prepayAmout}}</span>
                    <span>预交款（元）</span>
                </dd>
                <dd>
                    <span>{{this.dataList.unsettled}}</span>
                    <span>待清金额（元）</span>
                </dd>
                <dd>
                    <span>{{this.dataList.settled}}</span>
                    <span>已结算金额（元）</span>
                </dd>
            </dl>
        </div>
        <div class="ifcation_detail">
            <p class="detail_title">
                <span>费用明细</span>
                <span>总额：<i>{{this.dataList.billAmout}}元</i></span>
            </p>
            <van-cell :title="item.typeName" v-for="item in dataList.feeInfo" :key="item.typeCode"  :value="item.typeAmout +'元'"  />
            <!-- <van-cell title="治疗" :value="this.dataList.treatment" is-link :to="{path:'/hospitaldetails',query:{patientCardNo:this.patientCardNo,date:this.data,medicineName:'治疗'}}" />
            <van-cell title="床位" :value="this.dataList.hospitalBed" is-link :to="{path:'/hospitaldetails',query:{patientCardNo:this.patientCardNo,date:this.data,medicineName:'床位'}}" />
            <van-cell title="护理" :value="this.dataList.nursing" is-link :to="{path:'/hospitaldetails',query:{patientCardNo:this.patientCardNo,date:this.data,medicineName:'护理'}}" />
            <van-cell title="杂费" :value="this.dataList.otherFee" is-link :to="{path:'/hospitaldetails',query:{patientCardNo:this.patientCardNo,date:this.data,medicineName:'杂费'}}" /> -->
        </div>
        <p class="tips">
            <span style="color:#0297d7;">温馨提示：</span>
            <span>数据仅供参考，实际费用以医院纸质明细为标准。</span>
        </p>
    </div>
</template>
<script>
import Vue from 'vue';
import { getdaycheckList } from '../api/api'
export default {
    data(){
        return{
            patientName:'',
            deptName:'',
            inpatientId:'',//住院号
            dataList:"",//界面数据
            day:"",//日期
        }
    },
    methods:{
        clickTime:function(){
            this.day = this.$refs.input1.value
            this.getInfor()
        },
        getDate:function(){//时间选择
            // console.log('选择时间',this.date)
            // console.log('选择时间',this.$refs.input1.value)
        },
        // hostDetail:function(){//药物分类跳转--例如（西药）
        //     this.$router.push({
        //         path:"/hospitaldetails",
        //         query:{id:'1'}
        //     })
        // },
        getInfor:function(){//获取数据信息--每日清单
            let parm = {
                patientName:this.patientName,//就诊卡号
                deptName:this.deptName,
                inpatientId:this.inpatientId,
                billDate:this.date//日期
                // inpatientId:'Z0010732',
                // billDate:'2014-01-17'//日期
            }
            getdaycheckList(parm).then((res) => {
                this.dataList = res.data.dailyBill
            })
        },
        addDate() {//获取当前日期
            var nowDate = new Date();
            let date = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1,
                date: nowDate.getDate(),
            }
            this.day = date.year + '-' + (date.month < 10 ? ('0' + date.month) : (date.month)) + '-' + (date.date < 10 ? ('0' + date.date) : (date.date));
            this.getInfor()//获取信息
        }
    },
    mounted(){
        this.patientName = this.$route.query.patientName,//就诊卡号
        this.deptName=this.$route.query.deptName,
        this.inpatientId=this.$route.query.inpatientId,
        this.addDate()//获取日期
    }
}
</script>
<style scoped>
.content{
    width: 100%;
}
/* 顶部名称和时间选择 */
.content .content_top{
    width: 100%;
}
.content .content_top .top_title{
    width: 90%;
    display: flex;
    flex-direction: row;
    margin: auto;
    font-size: 0.8rem;
    height: 2.5rem;
    line-height: 2.5rem;
}
.content_top .top_title span{
    flex: 1;
    text-align: left;
    color: #21bef9;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.content_top .top_title img{
    height: 24px;
    padding-top: 7px;
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
.content .ification{
    width: 100%;
    overflow: hidden;
}
.content .ification dl dt{
    text-align: left;
    padding-left: 5%;
    font-size: 14px;
    background-color: #eeeeee;
    height: 2rem;
    line-height: 2rem;
}
.content .ification dl dd{
    width: 47%;
    float: left;
    height: 3rem;
    text-align: center;
    border-bottom: 1px solid #eeeeee;
    padding: 0 5px;
}
.content .ification dl dd:nth-child(2),
.content .ification dl dd:nth-child(4){
    border-right: 1px solid #eeeeee;
}
.content .ification dl dd span{
    width: 100%;
    display: inline-block;
    font-size: 14px;
    text-align: center;
}
.content .ification dl dd span:nth-child(1){
    color: #0297d7;
    font-size: 16px;
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