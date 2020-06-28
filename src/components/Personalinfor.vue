<template>
    <div class="content">
        <div class="content_top">
            <p class="top_avatar">
                <img src="../assets/images/timg (2).jpg"/>
            </p>
            <p class="top_name">{{patientName}}</p>
            <p class="top_card">诊疗卡：{{patientId}}</p>
        </div>
        <div class="infor">
            <van-cell title="二维码名片" is-link @click="creatQrCode" >
                <template>
                    <span class="infor_img2"></span>
                    <vue-qr class="infor_img" :text='this.codeText' :margin="0" :size="40"></vue-qr>
                    <!-- <input class="infor_img" type="text" :value="codeText"> -->
                </template>
            </van-cell>
            <div class="box">
                <div class="find_top">
                    <span class="top_title">就诊人：</span>
                    <select v-model="patientName" class="chois" @blur="scrollAction()" @change="changeProduct()">
                        <option  style="display:none" value="" disabled >请选择</option>
                        <option v-for="(item) in patientList" :key="item.id" >{{item.name}}</option>
                    </select>
                    <van-icon class="arrow" name="arrow-down" size="17" />
                </div>
            </div>
            <van-popup v-model="show">
                <div class="expic" id="qrCodeUrl" ref="qrCodeUrl" style="display:inline-block"></div>
            </van-popup>
            <!-- <van-cell title="条形码名片" is-link value="内容" /> -->
            <!-- <van-cell title="病历号" :value="this.dataList.medicalRecordNo"/>
            <van-cell title="住院号" is-link :value="this.dataList.hospitalNo" to="/hospitalnumber" /> -->
            <van-cell title="联系方式">{{phone}}</van-cell>
            <van-cell title="联系地址">{{address}}</van-cell>
        </div>
        <div class="goto_card">
            <van-cell title="电子健康卡" is-link @click="gotoHealthCard"></van-cell>
            <van-cell title="添加新的就诊人" is-link value="" @click="gotoAddPatient"/>
            <van-cell title="修改个人信息" is-link value="" @click="changeInfo"/>
        </div>
        <div class="lift">
            <button class="lift_btn" @click="getLift()">解除绑定</button>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Dialog, Toast } from 'vant'
import VueQr from 'vue-qr'
import QRCode from 'qrcodejs2'
import { getPatientInfo,addPatient,removeCard ,changePatient,changePatientInfo} from '../api/api'
export default {
    components: {VueQr},
    data(){
        return{
            show:false,
            dataList:[],
            codeText:'',
            patientName:'' ,//就诊人
            patientId:'', //就诊卡号
            address:'' ,//地址
            phone:'' ,//联系电话
            healthCardId:'', //电子健康卡号
            healthCardUrl:'' ,//健康卡url
            idNumber:'', // 身份证号
            patientList:[]
        }
    },
    methods:{
        getData:function(){//获取数据
            getPatientInfo().then((res) => {
                if(res.code == 1){
                    this.dataList = res.data
                    this.patientList = res.data.patientInfos
                    this.patientName = res.data.name
                    this.patientId = res.data.patientId
                    this.address = res.data.address
                    this.phone = res.data.phone
                    this.healthCardId = res.data.healthCardId
                    this.healthCardUrl = res.data.healthCardUrl
                    this.codeText = res.data.qrCodeText
                    this.idNumber = res.data.idNumber
                }else{
                    console.log(res.data)
                }
            })
        },
        getLift:function(){//解除绑定提示
            Dialog.confirm({
                title: '解除绑定',
                message: '1.仅解除当前默认的就诊人。2.解除后就诊人默认为尚未解除的就诊人'
            }).then(() => {
                let data ={
                    idNumber:this.idNumber
                }
                removeCard(data).then(res=>{
                    if(res.code == 1){
                        Toast('解绑成功')
                        if(this.patientList.length > 1){
                            this.getData()
                        }else{
                            addPatient().then(res=>{
                                if(res.code == 1){
                                    window.location.href = res.data
                                }
                            }).catch(err=>{Toast('解绑失败')})
                        }
                    }
                }).catch(err=>{console.log(err)})
            }).catch(() => {});
        },
        changeProduct:function(e){//选择就诊人
            let data ={
                idNumber:this.patientList[event.target.selectedIndex-1].idNumber,
                openid:this.patientList[event.target.selectedIndex-1].openid
            }
            changePatient(data).then(res=>{
                this.patientName = res.data.name
                this.patientId= res.data.patientId
                this.address = res.data.address
                this.phone = res.data.phone
                this.healthCardId = res.data.healthCardId
                this.healthCardUrl = res.data.healthCardUrl
                this.idNumber = res.data.idNumber
                this.codeText = res.data.qrCodeText
            }).catch(err=>{console.log(err)})
        },
        scrollAction(){
            scrollTo(0,0)
        },
        creatQrCode(qrcode, text){//二维码
            this.show = true
            console.log('code:',this.codeText)
            setTimeout(() => {
                document.getElementById('qrCodeUrl').innerHTML = ''
                var qrcode = new QRCode(this.$refs.qrCodeUrl,{
                    text:this.codeText,
                    width:150,
                    height:150,
                    colorDark:'#000000',
                    colorLight:'#ffffff',
                    correctLevel:QRCode.CorrectLevel.H
                });
            }, 100);
        },
        gotoHealthCard(){//进入电子健康卡
            window.location.href = this.healthCardUrl
        },
        gotoAddPatient(){//添加就诊人
            addPatient().then(res=>{
                if(res.code  == 1){
                    window.location.href = res.data
                }
            }).catch(err=>{console.log(err)})
        },
        changeInfo(){//修改个人信息
            let params ={
                idNumber:this.idNumber
            } 
            changePatientInfo(params).then(res=>{
                window.location.href = res.data
            }).catch(err=>{console.log(err)})
        }
    },
    mounted(){
        this.getData()
    }
}
</script>
<style scoped>
.content{
    width: 100%;
}
.content .content_top{
    width: 100%;
    height: 8rem;
    background-color: #53a4f4;
    color: white;
    margin: auto;
    font-size: 14px;
    border-bottom: 10px solid #eeeeee;
}
.content .content_top .top_avatar img{
    height: 4rem;
    border-radius: 50%;
}
.content .infor{
    width: 100%;
    /* padding-right: 20px; */
    box-sizing: border-box;
    border-bottom: 16px solid #eeeeee;
}
.content .infor .infor_img{
    /* background:url('../assets/images/qc1.jpg') no-repeat; */
    background-size: cover;
    height: 26px;
    display: block;
    width: 26px;
    float: right;
}
.content .goto_card{
    width: 100%;
    border-bottom: 10px solid #eeeeee;
}
.content .lift{
    width: 100%;
    margin: auto;
}
.content .lift .lift_btn{
    border: none;
    background-color: #f9f9f9;
    width: 100%;
    color: red;
    height: 2.5rem;
    line-height: 2.5rem;
    margin-top: 2rem;
}
.content .van-cell__title{
    text-align: left;
}
.content .box{
    width: 100%;
    padding-left: 16px;
    box-sizing: border-box;
}

.content .find_top{
    position: relative;
    width: 100%;
    box-sizing: border-box;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 10px 0;
    /* margin:0  16px 0 16px; */
    box-sizing: border-box;
    border-bottom: 1px solid #f8f8f8;
    background-color: #fff;
}

.content .find_top .top_title{
    display: inline-block;
    /* margin-left: 16px; */
    /* flex: 1; */
    text-align: left;
    line-height: 34px;
    font-size: 14px;
}
.content .find_top .chois{
    /* width: 100%; */
    height: 100%;
    flex: 1;
    /* flex: 3; */
    border: none;
    -webkit-appearance: none;
    appearance:none;
    -moz-appearance: none;
    -webkit-appearance: none;
    /* background: url('../assets/images/xia.png') no-repeat;
    background-position: right; */
    /* width: 100px; */
    font-size:14px;
    background-size: 90px;
    background-color: #fff;
}
.content .find_top .arrow{
    display: block;
    position: absolute;
    right: 16px;
    top: 16px;
    color: #969799;
}
.expic{
    padding: 1rem;
}
</style>