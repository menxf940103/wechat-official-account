<template>
    <div class="content">
        <div class="content_top">
            <span class="top_title">就诊人：</span>
            <!-- <v-select class="chois"  style="border:none" :options="this.dataList" label="patientName" v-model="select" @input="changeProduct"></v-select> -->
            <select v-model="select" class="chois" @blur="scrollAction()" @change="changeProduct()">
                <option  style="display:none" value="" disabled selected>请选择</option>
                <option v-for="item in this.dataList" :key="item.patientId" >{{item.name}}</option>
            </select>
        </div>
        <div class="content_neverpay">
            <van-tabs v-model="active">
                <!-- 待支付列表 -->
                <van-tab title="待支付" >
                    <ul class="neverpay_list">
                        <li class="neverpay_list_detail" v-for="item in this.nocompleteList" :key="item.id">
                            <p class="list_title_name">
                                <span class="list_title_left">就诊人<i>{{patientInfo.patientName}}</i></span>
                                <span class="list_title_right">未支付</span>
                            </p>
                            <p class="list_title_time">
                                <span class="list_title_left">{{item.clinicTime}}</span>
                                <span class="list_title_right">就诊流水号：{{item.clinicSeq}}</span>
                            </p>
                            <div class="list_price_cont">
                                <p class="list_price_data" >
                                    <span class="list_price_left">待缴费金额</span>
                                    <span class="list_price_right"><i>{{item.payAmout}}</i>元</span>
                                </p>
                            </div>
                            <div class="list_button">
                                <!-- <van-button type="primary" size="small" @click="getPay(item)">立即支付</van-button> -->
                                <van-button type="default" size="small" @click="viveDteails(item,'未支付')">查看详情</van-button>
                            </div>
                        </li>
                    </ul>
                </van-tab>
                <!-- 已支付列表 -->
                <van-tab title="已支付">
                    <ul class="overpay_list">
                        <li class="neverpay_list_detail" v-for="item in this.completeList" :key="item.id">
                            <p class="list_title_name">
                                <span class="list_title_left">就诊人<i>{{patientInfo.patientName}}</i></span>
                                <span class="list_title_right">已支付</span>
                            </p>
                            <p class="list_title_time">
                                <span class="list_title_left">{{item.clinicTime}}</span>
                                <span class="list_title_right">就诊流水号：{{item.clinicSeq}}</span>
                            </p>
                            <div class="list_price_cont">
                                <p class="list_price_data" >
                                    <span class="list_price_left">已缴费金额</span>
                                    <span class="list_price_right"><i>{{item.totalPayAmout}}</i>元</span>
                                </p>
                            </div>
                            <div class="list_button">
                                <van-button type="default" size="small" @click="viveDteails(item,'已支付')">查看详情</van-button>
                            </div>
                        </li>
                    </ul>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
import { getPaientInfo, getPayInfo ,getCompletedPayInfo} from '../api/api'
export default {
    data(){
        return{
            select:'',
            active:'0',
            dataList:[],
            completeList:[],//已支付
            nocompleteList:[],//未付费
            patientInfo:{},//就诊人信息
        }
    },
    methods:{
        changeProduct:function(index){//选择就诊人
            if(index == 0){
                var parm = {
                    healthCardId:this.dataList[0].healthCardId,
                    patientId:this.dataList[0].patientId,
                    patientName:this.dataList[0].name
                }
                // var parm = {
                //         "patientId":"PE00077719",
                //         "healthCardId":"M32456667",
                //         "patientName":"123"
                //         }
            }else{
                var parm = {
                    healthCardId:this.dataList[event.target.selectedIndex-1].healthCardId,
                    patientId:this.dataList[event.target.selectedIndex-1].patientId,
                    patientName:this.dataList[event.target.selectedIndex-1].name
                }
            }
            // 未支付记录
            getPayInfo(parm).then((res) => {
                if(res.code == 1){
                    this.nocompleteList = res.data.resultInfo
                    this.patientInfo = res.data.patientInfo
                }else if(res.code == 0){
                    alert(res.desc)
                }
            }).catch(err=>{console.log(err)})
            // 已支付记录
            getCompletedPayInfo(parm).then(res=>{
                if(res.code == 1){
                    this.completeList = res.data.resultInfo
                }else if(res.code == 0){
                    alert(res.desc)
                }
            }).catch(err=>{console.log(err)})
        },
        scrollAction(){
            scrollTo(0,0)
        },
        viveDteails:function(item,payState){//查看详情，跳转到详情界面
            this.$router.push({
                path:'/paymentdetails',
                query:{
                    healthCardNo:this.patientInfo.healthCardNo,
                    patientId:this.patientInfo.patientId,
                    clinicSeq:item.clinicSeq,
                    doctorId:item.doctorId,
                    patientName:this.patientInfo.patientName,
                    receiptId:item.receiptId || '',
                    payState:payState
                }
            })
        },
        init:function(){
            getPaientInfo().then((res) => {
                if(res.code == 1){
                   this.dataList = res.data 
                   this.select = res.data[0].name 
                   this.changeProduct(0)
                }else if(res.code == 0){
                    alert(res.desc)
                }
            })
        }
    },
    mounted(){
        this.init()
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
    display: flex;
    /* justify-content:space-around; */
    align-items: center;
    padding: 10px 16px;
    box-sizing: border-box;
    /* padding-right: 20px; */
    /* box-sizing: border-box; */
    /* flex-direction: row; */
    border-bottom: 1px solid #f8f8f8;
}
.content .content_top .top_title{
    display: inline-block;
    flex: 1;
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
/* 待支付 */
.content_neverpay{
    width: 100%;
}
.content_neverpay .neverpay_list,
.content_neverpay .overpay_list{
    width: 100%;
    display: block;
}
.content_neverpay .neverpay_list .neverpay_list_detail,
.content_neverpay .overpay_list .neverpay_list_detail{
    border: 1px solid #eeeeee;
    width: 90%;
    margin: auto;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 4px 5px 5px #eeeeee;
    margin-top: 10px;
    margin-bottom: 10px;
}
.neverpay_list .neverpay_list_detail .list_price_cont,
.overpay_list .neverpay_list_detail .list_price_cont{
    width: 100%;
    display: block;
    border-bottom: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
    padding: 10px 0;
}
.neverpay_list .neverpay_list_detail .list_title_name,
.neverpay_list .neverpay_list_detail .list_title_time,
.neverpay_list .list_price_cont .list_price_data,
.overpay_list .neverpay_list_detail .list_title_name,
.overpay_list .neverpay_list_detail .list_title_time,
.overpay_list .list_price_cont .list_price_data{
    height: 1.5rem;
    line-height: 1.5rem;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    /* padding: 0 1rem; */
}
.neverpay_list .neverpay_list_detail .list_title_name .list_title_left,
.neverpay_list .neverpay_list_detail .list_title_time .list_title_left,
.neverpay_list .list_price_cont .list_price_data .list_price_left,
.overpay_list .neverpay_list_detail .list_title_name .list_title_left,
.overpay_list .neverpay_list_detail .list_title_time .list_title_left,
.overpay_list .list_price_cont .list_price_data .list_price_left{
    flex: 1;
    text-align: left;
}
.neverpay_list .neverpay_list_detail .list_title_name .list_title_left i,
.neverpay_list .list_price_cont .list_price_data .list_price_right i,
.overpay_list .neverpay_list_detail .list_title_name .list_title_left i,
.overpay_list .list_price_cont .list_price_data .list_price_right i{
    font-style: inherit;
    color: #47c9f9;
    padding-left: 10px;
}
.neverpay_list .neverpay_list_detail .list_title_name .list_title_right,
.neverpay_list .neverpay_list_detail .list_title_time .list_title_right,
.neverpay_list .list_price_cont .list_price_data .list_price_right,
.overpay_list .neverpay_list_detail .list_title_name .list_title_right,
.overpay_list .neverpay_list_detail .list_title_time .list_title_right,
.overpay_list .list_price_cont .list_price_data .list_price_right{
    flex: 1;
    text-align: right;
}
.neverpay_list .neverpay_list_detail .list_button{
    width: 100%;
    padding: 10px 0px;
}
.overpay_list .neverpay_list_detail .list_button{
    text-align: center;
    padding: 10px 0px;
    width: 100%;
}
.neverpay_list .neverpay_list_detail .list_button button,
.overpay_list .neverpay_list_detail .list_button button{
    margin-left: 2rem;
}
</style>