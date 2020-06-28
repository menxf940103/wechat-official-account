<template>
<!-- 处理中-检查详情 -->
    <div class="content">
        <div class="patient_details">
            <p class="patient_infor">
                <span class="patinfor_left">姓名：{{this.dataList.patientName}}</span>
                <span class="patinfor_right">性别：{{this.dataList.gender}}</span>
            </p>
            <p class="patient_infor">
                <span class="patinfor_left">年龄：{{this.dataList.patientAge}}</span>
                <span class="patinfor_right">申请科室：{{this.dataList.deptName}}</span>
            </p>
            <p class="patient_infor">
                <span class="patinfor_left">检验人员：{{this.dataList.reportDoctorName}}</span>
                <!-- <span class="patinfor_right">检验标本类型：{{this.dataList.testSpecimenType}}</span> -->
                <span class="patinfor_right">检查报告号：{{this.dataList.inspectionId}}</span>
            </p>
            <p class="patient_infor">
                <span class="patinfor">报告时间：{{this.dataList.inspectionDate}}</span>
            </p>
            <p class="patient_infor">
                <span class="patinfor">临床诊断：{{this.dataList.clinicalDiagnosis}}</span>
            </p>
        </div>
        <div class="project">
            <p class="project_title">
                <span class="title_left">检测指标：</span>
                <span class="title_right">结果（参考值）</span>
            </p>
            <p class="project_infor" v-for="item in this.dataList.recordInfos" :key="item.itemId">
                <span class="project_left">{{item.itemName}}</span>
                <span class="project_right">&uarr;{{item.testResult}}({{item.itemRef}})</span>
            </p>
            <!-- <p class="project_infor">
                <span class="project_left">钠</span>
                <span class="project_right">&uarr;62.3umol/L(10--4.7)</span>
            </p>
            <p class="project_infor">
                <span class="project_left">钙</span>
                <span class="project_right">&uarr;62.3umol/L(10--4.7)</span>
            </p> -->
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { getestReportDetail } from '../api/api'
export default {
    data(){
        return{
            value:'1111',
            inspectionId:"",//检验报告单id
            patientName:"",//患者姓名
            patientAge:"",//患者年龄
            gender:'',//性别
            deptName:'',//申请科室名称
            clinicalDiagnosis:'',//临床诊断
            reportDoctorName:'',//报告医生姓名
            inspectionDate:'',//检验报告时间
            dataList:[],//项目详情信息
        }
    },
    methods:{
        getInfor:function(){
            let parm = {
                inspectionId:this.inspectionId,
                // inspectionId:'AD2003230009',
                patientName:this.patientName,
                patientAge:this.patientAge,
                gender:this.gender,
                deptName:this.deptName,
                clinicalDiagnosis:this.clinicalDiagnosis,
                reportDoctorName:this.reportDoctorName,
                inspectionDate:this.inspectionDate
            }
            getestReportDetail(parm).then((res) => {
                if(res.code == 1){
                    this.dataList = res.data
                }else{
                    alert(res.data)
                }
            })
        }
    },
    mounted() {
        this.inspectionId=this.$route.query.inspectionId,
        this.patientName=this.$route.query.patientName,
        this.patientAge=this.$route.query.patientAge,
        this.gender=this.$route.query.gender,
        this.deptName=this.$route.query.deptName,
        this.clinicalDiagnosis=this.$route.query.clinicalDiagnosis,
        this.reportDoctorName=this.$route.query.reportDoctorName,
        this.inspectionDate = this.$route.query.inspectionDate,
        this.getInfor()
    },
}
</script>
<style scoped>
.content{
    width: 100%;
}
.content .patient_details,
.content .project{
    width: 100%;
    border-bottom: 10px solid #f9f9f9;
    font-size: 14px;
    padding: 1rem 0;
}
.patient_details .patient_infor,
.project .project_title,
.project .project_infor{
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
.content .project .project_infor{
    color: red;
}
.project .project_title .title_left,
.project .project_infor .project_left{
    display: inline-block;
    width: 50%;
    text-align: left;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.project .project_title .title_right,
.project .project_infor .project_right{
    display: inline-block;
    width: 50%;
    text-align: right;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.patient_infor {
    text-align: left;
}
</style>