<template>
    <div class="content">
        <div class="content_top">
            <span class="top_title">就诊人：</span>
            <!-- <v-select class="chois"  style="border:none" :options="this.dataList" label="patientName" v-model="select" @input="changeProduct"></v-select> -->
            <select v-model="select" class="chois" @blur="scrollAction()" @change="changeProduct()">
                <option  style="display:none" value="" disabled selected>请选择</option>
                <option v-for="item in this.dataList" :key="item.id" >{{item.name}}</option>
            </select>
            <input type="date" class="nav_input_text" :value="this.data" ref="input1" @change="clickTime">
        </div>
        <van-tabs v-model="active">
            <van-tab title="检验报告">
                <div class="blank" v-if="inforList.length < 1 ">暂无检验报告...</div>
                <van-cell-group v-else>
                    <van-cell 
                    is-link 
                    v-for="item in this.inforList" 
                    :key="item.id" 
                    :title="item.inspectionName" 
                    size="large" 
                    :label="item.inspectionDate" 
                    @click="getCheck(item)">
                        <span v-if="item.status == 0">处理中<i></i></span>
                        <span v-if="item.status == 1" class="tips">已完成</span>
                    </van-cell>
                    <!-- <van-cell is-link title="检验项目名称" size="large" label="检验时间" to="/carrydetails" >
                        <span class="tips">已完成<i></i></span>
                    </van-cell>
                    <van-cell is-link title="检验项目名称" size="large" label="检验时间">
                        <span  class="tips">已完成<i></i></span>
                    </van-cell> -->
                </van-cell-group>
            </van-tab>
            <van-tab title="检查报告">
                <div class="blank" v-if="onforList.length < 1">暂无检查报告...</div>
                <van-cell-group v-else>
                    <van-cell 
                    is-link 
                    v-for="item in this.onforList" 
                    :key="item.id" 
                    :title="item.checkReportName" 
                    size="large" 
                    :label="item.checkTime" 
                    @click="getorCheck(item)">
                        <span v-if="item.state == 0">处理中<i></i></span>
                        <span v-if="item.state == 1" class="tips">已完成<i></i></span>
                    </van-cell>
                    <!-- <van-cell is-link title="检查项目名称" size="large" label="检查时间" to="/tcarrydetails">
                        <span class="tips">已完成<i></i></span>
                    </van-cell>
                    <van-cell is-link title="检查项目名称" size="large" label="检查时间" to="/tcarrydetails">
                        <span class="tips">已完成<i></i></span>
                    </van-cell> -->
                </van-cell-group>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import Vue from 'vue'
import { getPaientInfo, getestReport, getcheckReport } from '../api/api'
export default {
    data(){
        return{
            select:"",
            active:'0',
            data:"",
            dataList:[ ],//就诊人信息
            inforList:[],//检验报告信息
            onforList:[],//检查报告信息
            healthCardId:"",//就诊卡号
            patientId:'',//患者id
        }
    },
    methods:{
        changeProduct:function(){//选择就诊人
            this.healthCardId=this.dataList[event.target.selectedIndex-1].healthCardId,
            this.patientId=this.dataList[event.target.selectedIndex-1].patientId
        },
        scrollAction(){
            scrollTo(0,0)
        },
        getInfor:function(){//获取就诊人信息
            getPaientInfo().then((res) => {
                if(res.code == 1){
                    this.dataList = res.data
                    this.select = res.data[0].name
                    this.healthCardId=res.data[0].healthCardId,
                    this.patientId=res.data[0].patientId  
                    this.getestReportList()
                    // this.getcheckReport()                              
                }else{
                    alert(res.data)
                }
            }).catch((error) => {console.log(error)})
        },
        // 获取检验报告
        getestReportList(){
            let parm = {
                healthCardId:this.healthCardId,
                patientId:this.patientId,
                beginDate:this.data,
                endDate:this.data  
                // healthCardId:'cscs', //测试数据
                // patientId:'PE00078445', //测试数据
                // beginDate:'2020-05-25', //测试数据
                // endDate:'2020-05-27',  //测试数据                                
            } 
            getestReport(parm).then((res) => {
                if(res.code == 1){
                    this.inforList = res.data
                    // console.log(res)
                }else{
                    alert(res.data)
                }
            }).catch((error) => {console.log(error)})
        },
        // 获取检查报告信息
        // getcheckReport(){
        //     let parm = {
        //         healthCardId:this.healthCardId,
        //         patientId:this.patientId,
        //         beginDate:this.data,
        //         endDate:this.data,                       
        //     }
        //     getcheckReport(parm).then((res) => {
        //         if(res.code == 1){
        //             this.onforList = res.data
        //         }else{
        //             alert(res.data)
        //         }
        //     }).catch((error) => {console.log(error)})
        // },
        clickTime:function(){//选择日期时间
            this.data = this.$refs.input1.value
            console.log('选择时间',this.data)
            // this.getInfor()
        },
        addDate() {//获取当前日期
            var nowDate = new Date();
            let date = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1,
                date: nowDate.getDate(),
            }
            this.data = date.year + '-' + (date.month < 10 ? ('0' + date.month) : (date.month)) + '-' + (date.date < 10 ? ('0' + date.date) : (date.date));
        },
        getCheck:function(item){//检验报告详情跳转、传参
            this.$router.push({
                path:'/tcarrydetails',
                query:{
                    inspectionId:item.inspectionId,
                    patientName:item.patientName,
                    patientAge:item.patientAge,
                    gender:item.gender,
                    deptName:item.deptName,
                    clinicalDiagnosis:item.clinicalDiagnosis,
                    reportDoctorName:item.reportDoctorName,
                    inspectionDate:item.inspectionDate
                }
            })
        },
        getorCheck:function(item){//检验报告详情跳转、传参
            this.$router.push({
                path:'/checkdetails',
                query:{
                    reportNo:item.reportNo,
                    patientCardNo:this.patientCardNo,
                    date:this.data
                }
            })
        }
    },
    mounted(){
        this.addDate()//获取当前时间
        this.getInfor()//获取就诊人信息
    }
}
</script>
<style scoped>
.content{
    width: 100%;
}
/* 选择就诊人 */
.content .content_top{
    width: 100%;
    height:45px;
    padding: 10px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f8f8f8;
}
.content .content_top .top_title{
    display: inline-block;
    /* flex: 1; */
    line-height: 34px;
    font-size: 14px;
    color: #000;
}
.content .content_top .chois{
    flex: 3;
    height: 100%;
    border: none;
    -webkit-appearance: none;
    appearance:none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: url('../assets/images/xia.png') no-repeat;
    background-position: right;
    width: 64px;
    font-size: 12px;
    background-size: 80px;
    }
/* 选择日期时间 */
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
/* 检验报告 */
.content .van-cell__title{
    text-align: left;
}
.van-cell {
    align-items: center;
}
.content  .van-cell__value .tips,
.content .van-cell__value .tips span{
    color: #008fe0;
}
.content .tips i{
    display: inline-block;
    height: 8px;
    width: 8px;
    background-color: red;
    border-radius: 50%;
    position: fixed;
}
/* 空白页面提示 */
.blank{
    margin-top: 50%;
}
</style>
