<template>
    <div class="content">
        <div class="content_total">
            <p class="total_title">
                <span class="total_left">费用总额</span>
                <span class="total_right" v-if="payState == '未支付'"><i>{{this.dataList.totalPayAmout}}</i>元</span>
                <span class="total_right" v-if="payState == '已支付'"><i>{{this.dataList.totalFee}}</i>元</span>
            </p>
        </div>
        <div class="total_infor">
            <van-cell-group>
                <van-cell title="就诊人" :value="patientName" />
                <van-cell title="就诊卡号" value-class="cardnumber" :value="healthCardNo" style="" />
                <van-cell title="交易信息" v-if="payState == '未支付'" value-class="nopay" value="未支付" />
                <van-cell title="交易信息" v-if="payState == '已支付'" value-class="yopay" value="已支付" />
                <van-cell title="流水号" :value="clinicSeq" />
            </van-cell-group>
        </div>
        <div class="total_details">
            <p class="total_details_title">
                <span class="total_left">费用项目</span>
                <span class="total_right">金额（元）</span>
            </p>
            <p class="details_list" v-for="item in this.dataList.feeInfo" :key="item.typeCode">
                <span class="total_left" v-if="payState == '未支付'">{{item.typeName}}</span>
                <span class="total_right" v-if="payState == '未支付'">{{item.typeAmout}}</span>
                <span class="total_left" v-if="payState == '已支付'">{{item.detailFee}}</span>
                <span class="total_right" v-if="payState == '已支付'">{{item.detailCount}}</span>
            </p>
        </div>
        <van-button type="primary" size="large" @click="getPay(dataList.fee)" v-if="payState =='未支付'">支&nbsp;&nbsp;&nbsp;&nbsp;付</van-button>
    </div>
</template>
<script>
import { getPayBillFee,getCompletedBill,payFee} from '../api/api'
export default {
    data(){
        return{
            orderNo:"",
            dataList:{},
            healthCardNo:'',
            patientId:'',
            clinicSeq:'',
            doctorId:'',
            patientName:'',
            receiptId:'',
            payState:''
        }
    },
    methods:{
        getPay:function(item){//立即支付，调用微信支付接口
                let data={
                    payAmout:this.dataList.payAmout, //未交费金额
                    patientName:this.patientName, //患者姓名
                    patientId:this.patientId,
                    hospitalName:'祁东县妇幼保健院',
                    clinicSeq:this.clinicSeq,
                    healthCardId:this.healthCardNo,
                    prescriptionIds:this.dataList.prescriptionIds,

                }
            payFee(data).then(res=>{
                window.location.href = res.data
            }).catch(err=>{console.log(err)})
        },
        getList:function(){
            if(this.payState == '未支付'){
                let parm = {
                    healthCardNo:this.healthCardNo,
                    patientId:this.patientId,
                    clinicSeq:this.clinicSeq,
                    doctorId:this.doctorId
                }
                getPayBillFee(parm).then((res) => {
                    if(res.code == 1){
                        this.dataList = res.data
                    }else if(res.code == 0){
                        alert(res.desc)
                    }
                })
            }else if(this.payState == '已支付'){
                let parm = {
                    receiptId:this.receiptId,
                    healthCardNo:this.healthCardNo,
                    patientId:this.patientId,
                    clinicSeq:this.clinicSeq,
                    patientName:this.patientName
                }
                getCompletedBill(parm).then((res) => {
                    if(res.code == 1){
                        this.dataList = res.data
                    }else if(res.code == 0){
                        alert(res.desc)
                    }
                })

            }
        }
    },
    mounted(){
        this.healthCardNo = this.$route.query.healthCardNo
        this.patientId = this.$route.query.patientId
        this.clinicSeq = this.$route.query.clinicSeq
        this.doctorId = this.$route.query.doctorId
        this.patientName = this.$route.query.patientName
        this.receiptId = this.$route.query.receiptId
        this.payState = this.$route.query.payState
        this.getList();
    }
}
</script>
<style scoped>
.content{
    width: 100%;

}
.content .content_total{
    width: 100%;
    border-bottom: 6px solid #f9f9f9;
}
.content .content_total .total_title,
.total_details .details_list{
    width: 90%;
    height: 2rem;
    line-height: 2rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    margin: auto;
}
.content_total .total_title .total_left,
.total_details .total_details_title .total_left,
.total_details .details_list .total_left{
    text-align: left;
    flex: 1;
}
.content_total .total_title .total_right,
.total_details .total_details_title .total_right,
.total_details .details_list .total_right{
    flex: 1;
    text-align: right;
}
.content_total .total_title .total_right i{
    color: #47c9f9;
    font-style: inherit;
}
.content .total_infor{
    width: 100%;
    border-bottom: 10px solid #f9f9f9;
    font-size: 14px;
}
.content .total_infor .cardnumber{
    color: #47c9f9;
}
.content .total_infor .nopay{
    color: red;
}
.content .total_infor .yopay{
    color: #47c9f9;
}
.content .total_infor .van-cell__title{
    text-align: left;
}
.content .total_details{
    width: 100%;
    border-bottom: 1px solid #f9f9f9;
    font-size: 14px;
}
.content .total_details .total_details_title{
    height: 2rem;
    line-height: 2rem;
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #f9f9f9;
}
.content .van-button{
    height: 2rem;
    line-height: 2rem;
    width: 90%;
    border-radius: 5px;
    margin-top: 2rem;
}
.total_details .details_list .total_right{
    color: #47c9f9;
}
</style>