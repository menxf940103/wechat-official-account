<template>
<!-- 处理中-检查详情 -->
    <div class="content">
        <div class="patient_details">
            <p class="patient_infor">
                <span class="patinfor_left">姓名：姬无命</span>
                <span class="patinfor_right">性别：男</span>
            </p>
            <p class="patient_infor">
                <span class="patinfor_left">年龄：90</span>
                <span class="patinfor_right">申请科室：肾内一区</span>
            </p>
            <p class="patient_infor">
                <span class="patinfor_left">报告医生：欧阳夏丹</span>
            </p>
            <p class="patient_infor">
                <span class="patinfor_left">检查报告号：09900909988</span>
                <span class="patinfor_right">报告时间：2019-02-20</span>
            </p>
            <p class="patient_infor">
                <span class="patinfor_left">临床诊断：肝硬化</span>
                <span class="patinfor_right"></span>
            </p>
        </div>
        <div class="project">
            <p class="project_title">
                <span class="title_left">检测指标：</span>
                <span class="title_right">结果（参考值）</span>
            </p>
            <p class="project_infor">
                <span class="project_left">血氧</span>
                <span class="project_right">&uarr;62.3umol/L(10--4.7)</span>
            </p>
            <p class="project_infor">
                <span class="project_left">钠</span>
                <span class="project_right">&uarr;62.3umol/L(10--4.7)</span>
            </p>
            <p class="project_infor">
                <span class="project_left">钙</span>
                <span class="project_right">&uarr;62.3umol/L(10--4.7)</span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            value:'1111'
        }
    },
    methods:{

    }
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
</style>