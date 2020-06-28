<template>
    <div class="content">
        <div class="content_top">
            <p class="content_top_title">
                <span>预约记录</span>
            </p>
            <!-- <div class="content_select">
                <span class="top_title">就诊人：</span>
                <select v-model="select" class="chois" @blur="scrollAction()" @change="changeProduct()">
                    <option  style="display:none" value="" disabled selected>请选择</option>
                    <option v-for="item in this.inforList" :key="item.id">{{item.patientName}}</option>
                </select>
            </div> -->
        </div>
        <div class="content_cardbox">
            <ul class="card_box">
                <li class="blank" v-if="this.myresList.length < 1">暂无预约...</li>
                <li v-else class="card_list" v-for="item in this.myresList" :key="item.id">
                    <!-- 订单编号 -->
                    <div class="card_list_order">
                        <span>订单编号：{{item.outTradeNo}}</span>
                        <span v-if="item.payState == 0">待支付</span>
                        <span v-if="item.payState == 1">已支付</span>
                        <span v-if="item.payState == 2">已取消</span>
                    </div>
                    <!-- 当前挂号医生信息 -->
                    <div class="doctor_infor">
                        <div class="infor_img">
                            <img src="../assets/images/timg (2).jpg"/>
                        </div>
                        <div class="infordetails">
                            <h4>{{item.doctorName}}</h4>
                            <P>{{item.deptName}}</P>
                            <p>{{item.hospitalName}}</p>
                        </div>
                    </div>
                    <!-- 挂号基本信息 -->
                    <div class="order_infor">
                        <p>
                            <span class="order_title co">就诊时间</span>
                            <span class="order_tag">{{item.orderTime}} </span>
                        </p>
                        <p>
                            <span class="order_title co">费&nbsp;&nbsp;&nbsp;&nbsp;用</span>
                            <span class="order_tag">￥{{item.regFee}}</span>
                        </p>
                        <p>
                            <span class="order_title co">挂号人：{{item.patientName}}</span>
                            <span class="order_tag co">就诊卡号：{{item.patientId}}</span>
                        </p>
                    </div>
                    <div class="card_btn" v-if="item.payState == 0">
                        <van-button type="primary" @click="getNavigation()">科室分布</van-button>
                        <van-button type="primary" @click="celAppoin(item)">取消预约</van-button>
                        <van-button type="primary" @click="offPay(item)">立即支付</van-button>
                    </div>
                    <div class="card_btn" v-if="item.payState == 1">
                        <van-button type="primary" @click="getNavigation()">科室分布</van-button>
                        <van-button type="primary" @click="celReg(item)">取消挂号</van-button>
                    </div>
                    <div class="card_btn" v-if="item.payState == 2">
                        <van-button type="primary" @click="getNavigation()">科室分布</van-button>
                        <van-button type="primary">继续预约</van-button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Button, Dialog } from 'vant';
import { getMyReservationInfo, getcancelResevation ,reservationPay,cancelRegistration} from '../api/api'

export default {
    data(){
        return{
            select:'',
            newTime:"",//日期
            seconds:"",//时间
            inforList:[],//获取就诊人信息
            myresList:[],//获取我的预约信息
            patientCardNo:"",
            orderNo:""//订单编号
        }
    },
    methods:{
        getMyres:function(){//获取我的预约信息
            getMyReservationInfo().then((res) => {
                if(res.code == 1){
                    this.myresList = res.data
                }else{
                    console.log(res.data)
                }
            }).catch((error) => {console.log(error)})
        },
        getNavigation:function(){//跳转到科室分布
            this.$router.push({
                path:'/navigation'
            })
        },
        offPay:function(item){//待支付--立即支付
            // 拉取微信支付，支付完成之后重新加载界面数据
            Dialog.confirm({
                title: '预约须知',
                message: '是否确定支付预约金？'
            }).then(()=>{
                let data = {
                    outTradeNo:item.outTradeNo,
                    regFee:item.regFee,
                    business:item.business
                }
                reservationPay(data).then(res=>{
                    if(res.code == 1){
                        window.location.href = res.data
                    }else{
                        alert(res.data)
                    }
                }).catch(err=>{console.log(err)})
            })
        },
        celAppoin:function(item){//待支付--取消预约
            this.orderNo = item.order_no
            Dialog.confirm({
                title: '挂号须知',
                message: '是否取消预约'
            }).then(() => {
                let data ={
                    outTradeNo:item.outTradeNo,
                    bookingNo:item.bookingNo,
                    patientId:item.patientId,
                    healthCardId:item.healthCardId
                }
                getcancelResevation(data).then((res) => {
                    if(res.code == 1){
                        this.getMyres()
                    }else{
                        console.log(res.data)
                    }
                })
            }).catch(() => {
                console.log('取消')
            });
        },
        celReg(item){//已支付--取消挂号
            Dialog.confirm({
                title:'挂号须知',
                message:'确认是否取消挂号？'
            }).then(()=>{
                let data = {
                    healthCardId:item.healthCardId,
                    patientId:item.patientId,
                    outTradeNo:item.outTradeNo,
                    clinicSeq:item.clinicSeq,
                    bookingNo:item.bookingNo,
                    regFee:item.regFee
                }
                cancelRegistration(data).then(res=>{
                    if(res.code == 1){
                        this.getMyres()
                    }
                }).catch(err=>{console.log(err)})
            }).catch(()=>{
                console.log('取消')
            })
        },
        getTime(){//获取当前时间
            var date1 = new Date();
            var year = date1.getFullYear();
            var month = date1.getMonth()+1;
            var day = date1.getDate();
            var hours = date1.getHours();
            var minutes = date1.getMinutes();
            var seconds = date1.getSeconds();
            this.newTime = year+"-0"+month+"-0"+day
            this.seconds = hours+":"+minutes+":"+seconds
            return year+"年"+month+"月"+day+"日"+hours+":"+minutes+":"+seconds
        },
        compareDate (d1, d2) {//判断两个日期的大小
            d1 = this.newTime
            d2 = '2020-01-06'
            let reg = new RegExp('-', 'g')
            console.log((new Date(d1.replace(reg, '/'))) > (new Date(d2.replace(reg, '/'))))
            return ((new Date(d1.replace(reg, '/'))) > (new Date(d2.replace(reg, '/'))))
        },
        makeDurationToSeconds(time) {//时间转换成秒
            let str = this.seconds
            let arr = str.split(':')
            let hs = parseInt(arr[0] * 3600)
            let ms = parseInt(arr[1] * 60)
            let ss = parseInt(arr[2])
            let seconds = hs + ms + ss
            return seconds
        },
    },
    mounted(){
        this.getTime()
        this.compareDate()
        this.makeDurationToSeconds()
        this.getMyres()//进入界面获取信息
    }
}
</script>
<style scoped>
.content{
    width: 100%;
    overflow: hidden;
}
.content .content_top{
    width: 100%;
    border-bottom: 4px solid #9fcddb;
    position: fixed;
    background: white;
    z-index: 999;
}
.content .content_top .content_select{
    width: 100%;
    height: 45px;
    padding: 10px 16px 10px 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}
.content .content_top .content_select .top_title{
    display: inline-block;
    /* flex: 1; */
    line-height: 34px;
    font-size: 14px;
    color: #000;
}
.content .content_top .content_select .chois{
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
.content .content_top .content_top_title{
    text-align: left;
    padding: 0 30px;
    box-sizing: border-box;
    /* margin-left: 30px;
    margin-right: 30px; */
    font-size: 0.8rem;
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid #f8f8f8;

}
/* 订单信息 */
.content_cardbox{
    width: 100%;
    margin-top: 2rem;
    /* position: absolute;
    top: 4rem; */
}
.content_cardbox .card_box{
    width: 100%;
}
.content_cardbox .card_box .card_list{
    width: 100%;
    border-bottom: 10px solid #f9f9f9;
}
/* 订单号 */
.card_box .card_list .card_list_order{
    width: 100%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #eeeeee;
    height: 3rem;
    line-height: 3rem;
}
.card_list .card_list_order span:nth-child(1){
    font-size: 1rem;
    text-align: left;
    padding-left: 1rem;
    flex: 1;
}
.card_list .card_list_order span:nth-child(2){
    text-align: right;
    /* flex: 1; */
    padding-right: 1rem;
    font-size: 14px;
    color: #67c23a;
}
/* 订单信息--医生信息 */
.doctor_infor{
    width: 100%;
    height: 5rem;
    border-bottom: 1px solid #eeeeee;
}
.doctor_infor .infor_img{
    text-align: left;
    display: block;
    float: left;
    padding: 0.5rem;
}
.doctor_infor .infor_img img{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}
.doctor_infor .infordetails{
    /* display: inline-block; */
    float: left;
    padding: 0.5rem;
    text-align: left;
}
.doctor_infor .infordetails p{
    font-size: 12px;
    color: #cccccc;
}
/* 订单信息--挂号基本信息 */
.order_infor{
    width: 100%;
    height: 6rem;
    line-height: 2rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #eeeeee;
}
.order_infor p{
    padding: 0 1rem;
    display: flex;
    flex-direction: row;
}
.order_infor p .order_title{
    text-align: left;
    flex: 1;
}
.order_infor p .order_tag{
    text-align: right;
}
.order_infor p .co{
    color: #cccccc;
}
/* 订单信息--支付以及取消按钮 */
.card_btn{
    height: 3rem;
    border-bottom: 1px solid #eeeeee;
    line-height: 3rem;
    text-align: right;
    padding-right: 1rem;
}
.card_btn .van-button{
    height: 2rem;
    line-height: 2rem;
    border-radius: 5px;
    font-size: 12px;
}
.blank{
    width: 100%;
    height: 100%;
    margin-top:60%
}
</style>