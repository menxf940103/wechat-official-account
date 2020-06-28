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
        <div class="part">
            <p class="part_title">部位：</p>
            <p class="part_content">上中腹部平扫</p>
        </div>
        <div class="see">
            <p class="see_title">所见：</p>
            <p class="see_content">lojjoijojo sdfkoko asdfjaodjfoajodjf adsf adsfasd adfasdf asdfasdf adsfadsf</p>
        </div>
        <div class="opinion">
            <p class="opinion_title">诊断意见：</p>
            <p class="opinion_content">双肾囊肿，右肾微小结石。请结合超声及增强三维。</p>
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