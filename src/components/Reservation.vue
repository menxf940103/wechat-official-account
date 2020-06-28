<template>
    <div class="content">
        <van-notice-bar :scrollable="false" style="font-size:12px;">
            温馨提示：1.住院预交金注意事项。2.缴纳金额注意事项。
        </van-notice-bar>
        <div class="getmoney">
            <van-field type="text" label-width="60px" label-align="left" label="姓名 :" :value="this.patientName" readonly/>
            <!-- <van-field type="text" label-width="60px" label-align="right" label="缴纳金额:" v-model="money" clearable placeholder="请输入金额（元）"/> -->
            <van-field v-model="value" type="text" label="缴纳金额 :" placeholder="请输入金额金额（元）"  clearable/>
            <p class="money_btn">
                <van-button plain  @click="btnaMoney()" type="info">1000</van-button>
                <van-button plain  @click="btnbMoney()" type="info">3000</van-button>
                <van-button plain  @click="btncMoney()" type="info">5000</van-button>
            </p>
            <p class="">
                <van-button class="btn" type="info" @click="getBtn()">立即缴纳</van-button>
            </p>
        </div>
        <div class="feedetail">
            <van-cell class="van-color" title="缴费记录" value="金额（元）" />
            <van-cell-group class="cell_box" :border='false' v-for="(item,index) in this.dataList" :key="index">
                <van-cell :border='false' :title="item.payTime"  />
                <van-cell :border='false' :title="item.payMode" :value="item.payAmout" /> 
            </van-cell-group>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { NoticeBar } from 'vant';
import { getPrepay, postPrepay } from '../api/api'

Vue.use(NoticeBar);

export default {
    data(){
        return{
            value:'',
            patientId:"",//就诊卡号
            patientName:'',//患者姓名
            healthCardId:'',//就诊卡号
            inpatientId:'',//住院号
            dataList:[],//获取预交金基本数据
        }
    },
    methods:{
        btnaMoney:function(){//点击1000
            this.value=1000;
        },
        btnbMoney:function(){//点击3000
            this.value = 3000;
        },
        btncMoney:function(){//点击5000
            this.value = 5000;
        },
        getBtn:function(){//立即缴纳提交
            let data ={
                fee:this.value,
                patientId:this.patientId,
                patientName:this.patientName,
                hospitalName:'祁东县妇幼保健院',
                healthCardId:this.healthCardId,
                inpatientId:this.inpatientId
            }
            postPrepay(data).then((res) => {
                if(res.code == 1){
                    window.location.href = res.data
                }else{
                    alert(res.data)
                }
            })
        },
        getInfor:function(){//预约金相关信息
            let parm = {
                patientId:this.patientId,//就诊卡号
                patientName:this.patientName,//就诊人姓名
                inpatientId:this.inpatientId,//住院号
                // inpatientId:'Z0010732',//住院号
                healthCardId:this.healthCardId //就诊卡号
            }
            getPrepay(parm).then((res) => {
                this.dataList = res.data.resultInfo
            })
        },
        getUserIP(onNewIP) {//获取手机ip
            let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
            let pc = new MyPeerConnection({
                iceServers: []
            });
            let noop = () => {
            };
            let localIPs = {};
            let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
            let iterateIP = (ip) => {
            if (!localIPs[ip]) onNewIP(ip);
            localIPs[ip] = true;
            };
            pc.createDataChannel('');
            pc.createOffer().then((sdp) => {
            sdp.sdp.split('\n').forEach(function (line) {
                if (line.indexOf('candidate') < 0) return;
                line.match(ipRegex).forEach(iterateIP);
            });
            pc.setLocalDescription(sdp, noop, noop);
            }).catch((reason) => {
            });
            pc.onicecandidate = (ice) => {
            if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
            ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
            };
        }
    },
    mounted(){
        this.patientId = this.$route.query.patientId
        this.patientName =  this.$route.query.patientName
        this.healthCardId = this.$route.query.healthCardId
        this.inpatientId = this.$route.query.inpatientId
        this.getInfor()
        // this.getUserIP((ip) => {//获取手机ip
        //     this.phoneIp = ip;
        // });
    }
}
</script>
<style scoped>
.content{
    width: 100%;
}
.content .van-field__control{
    color: #000000;
}
.content .getmoney{
    width: 100%;
}
.content .getmoney .money_btn{
    display: block;
    padding: 10px 0;
}
.content .getmoney .money_btn .van-button{
    height: 2rem;
    line-height: 2rem;
    margin: 0 10px;
}
.content .btn{
    height: 2.5rem;
    line-height: 2.5rem;
    border-radius: 5px;
    width: 80%;
    margin: 10px 0;
}
.content .feedetail{
    width: 100%;
}
.content .feedetail .van-color{
    background-color: #eeeeee;
}
.content .van-cell__title{
    text-align: left;
}
.content .cell_box{
    margin: 1.5rem 0;
}
.content .cell_box .van-cell{
    padding: 0px 16px;
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