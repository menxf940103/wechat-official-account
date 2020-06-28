<template>
<!-- 处理中-检查详情 -->
    <div class="content">
        <div class="patient_details">
            <p class="patient_infor">
                <span class="patinfor_left">姓名：{{this.dataList.patientName}}</span>
                <span class="patinfor_right">性别：{{this.dataList.sex}}</span>
            </p>
            <p class="patient_infor">
                <span class="patinfor_left">年龄：{{this.dataList.age}}</span>
                <span class="patinfor_right">申请科室：{{this.dataList.deptName}}</span>
            </p>
            <p class="patient_infor">
                <span class="patinfor_left">报告医生：{{this.dataList.doctorName}}</span>
            </p>
            <p class="patient_infor">
                <span class="patinfor_left">检验报告号：{{this.dataList.reportNo}}</span>
                <span class="patinfor_right">报告时间：{{this.dataList.reportTime}}</span>
            </p>
            <p class="patient_infor">
                <span class="patinfor_left">临床诊断：{{this.dataList.clinicDiagnosis}}</span>
                <span class="patinfor_right"></span>
            </p>
        </div>
        <div class="part">
            <p class="part_title">部位：</p>
            <p class="part_content">{{this.dataList.part}}</p>
        </div>
        <div class="see">
            <p class="see_title">所见：</p>
            <p class="see_content">{{this.dataList.description}}</p>
        </div>
        <div class="opinion">
            <p class="opinion_title">诊断意见：</p>
            <p class="opinion_content">{{this.dataList.diagnosis}}</p>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { getcheckReportDetail } from '../api/api'
export default {
    data(){
        return{
            value:'1111',
            patientCardNo:"",//就诊卡号
            reportNo:"",//检验报告编码
            date:"",//时间
            dataList:[],//项目详情信息
        }
    },
    methods:{
        getInfor:function(){
            let parm = {
                patientCardNo:this.patientCardNo,
                reportNo:this.reportNo,
                date:this.date
            }
            getcheckReportDetail(parm).then((res) => {
                if(res.code == 1){
                    this.dataList = res.data
                    console.log(res)
                }else{
                    alert(res.data)
                }
            })
        }
    },
    mounted() {
        this.patientCardNo = this.$route.query.patientCardNo
        this.reportNo = this.$route.query.reportNo
        this.date = this.$route.query.date
        this.getInfor()
    },
}
</script>
<style scoped>
.content{
    width: 100%;
}
.content .patient_details{
    width: 100%;
    border-bottom: 10px solid #f9f9f9;
    font-size: 14px;
    padding: 1rem 0;
}
.patient_details .patient_infor{
    width: 90%;
    display: block;
    overflow: hidden;
    min-height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid #eeeeee;
    margin: auto;
}
.patient_details .patient_infor .patinfor_left,
.patient_details .patient_infor .patinfor_right{
    display: inline-block;
    width: 50%;
    text-align: left;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.content .part,
.content .see,
.content .opinion{
    border-bottom: 10px solid #f9f9f9;
    padding: 1rem 0;
    width: 100%;
}
.content .part p,
.content .see p,
.content .opinion p{
    width: 90%;
    margin: auto;
    text-align: left;
    font-size: 14px;
}
</style>