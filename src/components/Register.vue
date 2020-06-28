<template>
    <div class="content">
        <div class="card_li_top">
            <div class="li_top_img">
                <img src="../assets/images/timg (2).jpg"/>  
            </div>
            <div class="li_top_title">
                <p>
                    <span style="width:60px;display:inline-block;">{{doctorName}}</span>
                    <span style="color:#cccccc;">{{doctorLevel}}</span>
                </p>
                <p><span class="keshi">科室显示</span></p>
                <p style="color:#cccccc;">{{deptName}}</p>
            </div>
        </div>
        <div class="reg_number">
            <van-cell-group>
                <van-cell title="医院名称" value="祁东县妇幼保健院" />
                <van-cell title="挂号类型" value="预约挂号" />
                <!-- <van-cell title="流水号" :value="this.dataList.clinicSeq" /> -->
            </van-cell-group>
        </div>
        <div class="reg_mony">
            <van-cell-group>
                <van-cell title="费用项目" title-style="color:#cccccc;" value="金额（元）" />
                <!-- <van-cell title="诊查费" value="￥0.01" value-class="font_color" /> -->
                <van-cell title="挂号费" :value="`￥${regFee}`" value-class="font_color" />
                <van-cell title="就诊时段" :value="this.timePeriod" value-class="font_color" />
            </van-cell-group>
        </div>
        <div class="content_top">
            <span class="top_title">就诊人：</span>
            <!-- <v-select class="chois"  style="border:none" :options="this.patientNameList" @input="changeProduct(selected)" label="patientName" v-model="selected"></v-select> -->
            <select v-model="selected" class="chois" @blur="changeProduct(selected)" autofocus @change="changePatient()">
                <option  style="display:none" value="" disabled selected>请选择</option>
                <option v-for="item in this.patientNameList" :key="item.patientId" :label="item.name">{{item.name}}</option>
            </select>
        </div>
        <van-button size="large" type="info" @click="getDialog()">确定并支付</van-button>
    </div>
</template>
<script>
import Vue from 'vue';
import 'vue-select/dist/vue-select.css';
import { Cell, CellGroup, Button, Dialog  } from 'vant';
import { getaddOrder , getpayOrder,getPaientInfo ,getLockReg} from '../api/api'
export default {
    data(){
        return{
            doctorName:'',//医生名字
            doctorLevel:'',//医生职称
            deptName:'',//科室
            selected:'',
            dataList:"",
            doctorId:"",//诊室代号
            regDate:"",//出诊日期，格式：YYYY-MM-DD	
            startTime:"",//分时开始时间，格式：HH:MI
            endTime:"",//分时结束时间，格式：HH:MI
            regFee:"",//挂号费
            timePeriod:"",//就诊时段
            patientNameList:[],//患者数组
            healthCardId:'',//健康卡号码
            patientId:'',//患者id
            scheduleId:'',//排班号
            treatFee:'',//诊疗费
            paientIdNumber:'',//患者身份证号
        }
    },
    methods:{
        getDialog:function(){
            if(this.selected == ''){
                Dialog.alert({
                    message: '请选择就诊人'
                })
                return
            }
            if(this.getName == '预约挂号'){
                let data={
                    deptId:this.deptId, //科室id
                    doctorId:this.doctorId,//医生id
                    regDate:this.regDate,//预约日期
                    scheduleId:this.scheduleId,//排班号
                    shiftCode:this.shiftCode,//班别代码
                    startTime:this.startTime,//开始时间
                    endTime:this.endTime,//结束时间
                    fee:this.regFee,//挂号费
                    treatFee:this.treatFee,//诊疗费
                    healthCardNo:this.healthCardId,//健康卡号码
                    patientId:this.patientId,//患者id
                    patientName:this.selected,//患者姓名
                    idNumber:this.paientIdNumber, //患者身份证号
                }
                getaddOrder(data).then(res=>{
                    if(res.code == 1){
                        let param = {
                            doctorName:this.doctorName,
                            regFee:this.regFee,
                            patientName:this.selected,
                            hospitalName:'祁东县妇幼保健院',
                            patientId:this.patientId,
                            healthCardNo:this.healthCardNo,
                            deptName:this.deptName,
                            doctorId:this.doctorId,
                            bookingNo:res.data.bookingNo,
                            orderId:res.data.orderId
                        }
                        getpayOrder(param).then(res=>{
                            if(res.code == 1){
                                window.location.href = res.data
                            }else{
                                alert(res.data)
                            }
                        }).catch(err=>{alert(err)})
                    }
                }).catch(err=>{console.log(err)})
            }else if(this.getName == '当天挂号'){
                let data={
                    deptId:this.deptId, //科室id
                    doctorId:this.doctorId,//医生id
                    regDate:this.regDate,//预约日期
                    scheduleId:this.scheduleId,//排班号
                    shiftCode:this.shiftCode,//班别代码
                    doctorName:this.doctorName,//开始时间
                    deptName:this.deptName,//结束时间
                    fee:this.regFee,//挂号费
                    treatFee:this.treatFee,//诊疗费
                    healthCardNo:this.healthCardId,//健康卡号码
                    patientId:this.patientId,//患者id
                    patientName:this.selected,//患者姓名
                    idNumber:this.paientIdNumber, //患者身份证号
                }
                getLockReg(data).then(res=>{
                    if(res.code == 1){
                        let param = {
                            doctorName:this.doctorName,
                            regFee:this.regFee,
                            patientName:this.selected,
                            hospitalName:'祁东县妇幼保健院',
                            patientId:this.patientId,
                            healthCardNo:this.healthCardNo,
                            orderTime:res.data.orderTime,
                            deptName:this.deptName,
                            doctorId:this.doctorId,
                            bookingNo:res.data.bookingNo
                        }
                        getpayOrder(param).then(res=>{
                            if(res.code == 1){
                                window.location.href = res.data
                            }else{
                                alert(res.data)
                            }
                        }).catch(err=>{alert(err)})
                    }
                }).catch(err=>{console.log(err)})

            }
        },
        changePatient(e){//切换就诊人
            this.healthCardId=this.patientNameList[event.target.selectedIndex-1].healthCardId,
            this.patientId=this.patientNameList[event.target.selectedIndex-1].patientId,
            this.paientIdNumber = this.patientNameList[event.target.selectedIndex-1].idNumber
        },
        changeProduct:function(e){//选
            scrollTo(0,0)   //解决ios软键盘顶出问题
        },
        getPatientList:function(){
            getPaientInfo().then(res=>{
               if(res.code ==1){
                   this.patientNameList = res.data
                   this.selected = res.data[0].name
                   this.healthCardId = res.data[0].healthCardId
                   this.patientId = res.data[0].patientId
                   this.paientIdNumber = res.data[0].idNumber
               }
            }).catch(err=>{console.log(err)})
        }
    },
    mounted(){
        this.doctorName = this.$route.query.doctorName
        this.deptName =this.$route.query.deptName
        this.doctorLevel = this.$route.query.doctorLevel
        this.doctorId = this.$route.query.doctorId
        this.regFee = this.$route.query.regFee
        this.timePeriod =this.$route.query.regDate+' '+this.$route.query.startTime + '-' +this.$route.query.endTime
        this.startTime = this.$route.query.startTime
        this.endTime = this.$route.query.endTime
        this.regDate = this.$route.query.regDate
        this.deptId = this.$route.query.deptId
        this.shiftCode = this.$route.query.shiftCode
        this.scheduleId = this.$route.query.scheduleId
        this.treatFee = this.$route.query.treatFee
        this.getName = this.$route.query.getName
        this.getPatientList()
    }
}
</script>
<style scoped>
.content{
    width: 100%;
}
/* 顶部医生基本信息 */
.card_li_top{
    width: 100%;
    height: 6rem;
    display: flex;
    flex-direction: row;
    border-bottom: 10px solid #f9f9f9;
    font-size: 12px;
}
.card_li_top .li_top_img{
    flex: 1;
    margin: auto;
}
.card_li_top .li_top_title{
    flex: 2;
    text-align: left;
    font-size: 14px;
    margin: auto;
}
/* .card_li_top .li_top_score{
    flex: 1;
    margin: auto;
} */
.card_li_top img{
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
}
.keshi{
    background-color: #12a997;
    padding: 2px 10px;
    border-radius: 10px;
    color: white;
    font-size: 12px;
}
/* 挂号信息 */
.reg_number,.reg_mony{
    width: 100%;
    border-bottom: 10px solid #f9f9f9;
}
.van-cell{
    font-size: 0.8rem;
    border-bottom: 1px solid #eeeeee;   
}
.van-cell .font_color{
    color: #f5a300;
}
.van-cell .van-cell__title{
    text-align: left;
}
.van-button{
    height: 2.5rem;
    line-height: 2.5rem;
    width: 90%;
    border-radius: 5px;
    background-color: #07c160;
    border: none;
    margin-top: 3rem;
}
.content .content_top{
    width: 100%;
    height: 45px;
    display: flex;
    justify-content:space-around;
    align-items: center;
    padding: 10px 16px;
    box-sizing: border-box;
    /* flex-direction: row; */
    border-bottom: 1px solid #f8f8f8;
}
.content .content_top .top_title{
    display: inline-block;
    line-height: 2rem;
    /* flex: 1; */
    line-height: 34px;
    font-size: 14px;
    color: #000;
}
.content .content_top .chois{
    height: 100%;
    flex: 3;
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
.vs__dropdown-toggle {
border: none !important;
border: 0;
}
</style>