<template>
    <div class="content">
        <div class="content_top">
            <span class="top_title">就诊人：</span>
            <!-- <v-select class="chois"  style="border:none" :options="this.nameList" label="patientName" v-model="select"  @input="changeProduct"></v-select> -->
            <select v-model="select" class="chois" @blur="scrollAction()" @change="changeProduct()">
                <option  style="display:none" value="" disabled selected>请选择</option>
                <option v-for="item in this.nameList" :key="item.id">{{item.name}}</option>
            </select>
        </div>
        <!-- 显示住院信息和费用总金额 -->
        <div v-if="!showBlank">
            <div class="hospital" >
                <p class="patient_infor">
                    {{this.costList.patientName}}&nbsp;&nbsp;{{this.costList.deptName}}
                    <span>({{this.costList.patientFlag}})</span>
                </p>
                <div class="hospital_time">
                    <p class="hospital_number">住院号：{{this.costList.inpatientId}}</p>
                    <p class="hospital_daty">
                        <span>住院天数:{{this.costList.inDays}}天</span>
                        <span>入院日期：{{this.costList.inTime}}</span>
                    </p>
                </div>
                <div class="hospital_money">
                    <p class="sum_money">预交金总额：{{this.costList.prepayAmout}}元</p>
                    <p class="money_detail">
                        <span>总费用：{{this.costList.totalAmout}}元</span>
                        <span>预交金余额：{{this.costList.balance}}元</span>
                    </p>
                </div>
            </div>
            <div class="hospital_detail">
                <van-cell-group>
                    <van-cell icon="balance-list-o" title="预交金缴纳" is-link :to="{path:'/reservation',query:{patientId:this.costList.patientId,patientName:this.costList.patientName,healthCardId:this.healthCardId,inpatientId:this.costList.inpatientId}}" />
                    <van-cell icon="bill-o" title="每日清单" is-link :to="{path:'/dailylist',query:{patientName:this.costList.patientName,inpatientId:this.costList.inpatientId,deptName:this.costList.deptName}}" />
                    <van-cell icon="refund-o" title="住院费用" is-link :to="{path:'/hospitalization',query:{inpatientId:this.costList.inpatientId}}" />
                    <van-cell icon="bullhorn-o" title="入院须知" is-link @click="goHospitalAction" />
                    <van-cell icon="volume-o" title="出院须知" is-link @click="leaveHospitalAction"/>
                </van-cell-group>
            </div>
        </div>
        <div class="blank" v-else>
            此患者未在住院
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { getPaientInfo, getInpatientInfo, getgoHospitialInfo, getleaveHospitialInfo} from '../api/api'
export default {
    data(){
        return{
            select:"",
            nameList:[],//就诊人数组
            healthCardId:'',//就诊卡号
            costList:[],//患者费用信息
            isSelect:true,
            showBlank:false
        }
    },
    methods:{
        changeProduct:function(){//选择就诊人
            this.healthCardId =this.nameList[event.target.selectedIndex-1].patientCardNo
            this.getInfor()
        },
        scrollAction(){
          scrollTo(0,0)  
        },
        getInfor:function(){//获取患者费用信息
            let param = {
                healthCardId:this.healthCardId
                // healthCardId:'432922196306073824'              
            }
            getInpatientInfo(param).then((res) => {
                if(res.code == 1){
                    this.costList = res.data[0];
                }else if(res.code == 2){
                    this.showBlank = true
                }
            })
        },
        getList:function(){//获取患者信息
            getPaientInfo().then((res) => {
                this.nameList = res.data
                this.select = res.data[0].name
                this.healthCardId = res.data[0].healthCardId
                this.getInfor()
                // this.changeProduct()
            }).catch((error) => {console.log(error)})
        },
        goHospitalAction:function(){//获取入院须知
            getgoHospitialInfo().then((res=>{
                console.log('获取入院须知',res)
            })).catch((error=>{console.log(error)}))
        },
        leaveHospitalAction:function(){//获取出院须知
            getleaveHospitialInfo().then((res=>{
                console.log('获取出院须知',res)
            })).catch((error=>{console.log(error)}))
        }
    },
    mounted(){
        // this.getInfor()//获取患者费用信息
        this.getList()//获取患者信息
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
    height: 45px;
    padding: 10px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f8f8f8;
}
.content .content_top .top_title{
    display: inline-block;
    /* flex: 1; */
    /* margin-left: 20px; */
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
/* 医院时间和金额 */
.content .hospital{
    width: 100%;
    font-size: 0.8rem;
}
.content .hospital .patient_infor{
    width: 90%;
    display: inline-block;
    margin: auto;
    text-align: left;
    color: #21bef9;
    height: 2rem;
    line-height: 2rem;
}
.hospital .patient_infor span{
    color: #000;
}
.content .hospital .hospital_time,
.content .hospital .hospital_money{
    width: 90%;
    margin: auto;
    padding: 10px;
    background-color: #eeeeee;
    margin-bottom: 1rem;
}
.hospital .hospital_time .hospital_number{
    width: 100%;
    margin: auto;
    text-align: left;
    height: 2rem;
    line-height: 2rem;
}
.hospital .hospital_time .hospital_daty{
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    height: 2rem;
    line-height: 2rem;
}
.hospital .hospital_time .hospital_daty span:nth-child(1),
.hospital .hospital_money .money_detail span:nth-child(1){
    text-align: left;
    flex: 1;
}
.hospital .hospital_time .hospital_daty span:nth-child(2),
.hospital .hospital_money .money_detail span:nth-child(2){
    text-align: right;
    flex: 1;
}
.hospital .hospital_money .sum_money{
    width: 100%;
    margin: auto;
    text-align: left;
    height: 2rem;
    line-height: 2rem;
}
.hospital .hospital_money .money_detail{
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    height: 2rem;
    line-height: 2rem;
}
.content .van-cell__title{
    text-align: left;
}
.blank{
    margin-top: 10rem;
}
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