<template>
    <div class="content">
        <!-- <div class="content_qrcode" :style="{display:attr}">
            <p class="top_title">点击图片放大识别</p>
            <ul class="code_list">
                <li class="list_qra">
                    <img src="../assets/images/qc1.jpg" @click="getEnlarge"/>
                    <p class="qrcode_title">衡阳市第四医院</p>
                </li>
                <li class="list_qrb">
                    <img src="../assets/images/qc1.jpg"/>
                    <p class="qrcode_title">衡阳市第四医院</p>
                </li>
                <li class="list_qrc">
                    <img src="../assets/images/qc1.jpg"/>
                    <p class="qrcode_title">衡阳市第四医院</p>
                </li>
                <li class="list_qrd">
                    <img src="../assets/images/qc1.jpg"/>
                    <p class="qrcode_title">衡阳市第四医院</p>
                </li>
                <li class="list_qre">
                    <img src="../assets/images/qc1.jpg"/>
                    <p class="qrcode_title">衡阳市第四医院</p>
                </li>
                <li class="list_qrf">
                    <img src="../assets/images/qc1.jpg"/>
                    <p class="qrcode_title">衡阳市第四医院</p>
                </li>
            </ul>
        </div>
        <div class="show_qrcode" :style="{display:bttr}">
            <p class="show_title">长按图片识别二维码</p>
            <p class="show_pic">
                <img src="../assets/images/qc1.jpg"/>
                <span class="qrcode_text">衡阳市第四医院</span>
            </p>
            <button class="goback" @click="goBack()">返回</button>
        </div> -->
    </div>
</template>
<script>
import Vue from 'vue';
import { getSpecialistMatrix } from '../api/api'
export default {
    data(){
        return{
            attr:"block",
            bttr:"none"
        }
    },
    methods:{
        // getEnlarge(){
        //     this.attr = 'none';
        //     this.bttr = 'block';
        // },
        // goBack:function(){
        //     this.bttr = 'none';
        //     this.attr = 'block';
        // },
        getSpecialistAction:function(){//获取专科矩阵
            getSpecialistMatrix().then(res => {
                window.location.replace(res.data)
            }).catch(error => {console.log(error)})
        }
    },
    mounted(){
        this.getSpecialistAction()
    }
}
</script>
<style scoped>
.content{
    width: 100%;
    margin: auto;
}
.content .top_title{
    font-size: 20px;
    color: #ff9730;
    line-height: 30px;
    height: 30px;
}
.content .code_list{
    list-style: none;
    width: 98%;
}
.content .code_list li{
    width: 48%;
    display: inline-block;
    /* float: left; */
}
.code_list li img{
    width: 100%;
}
.code_list li p{
    font-size: 14px;
    line-height: 20px;
    text-align: center;
}
/* 展示放大的图片 */
.content .show_qrcode,
.content .show_qrcode .show_pic{
    width: 100%;
}
.content .show_qrcode .show_title{
    text-align: center;
    font-size: 20px;
    height: 3rem;
    line-height: 3rem;
    margin-top: 1rem;
    color: #ff9730;
}
.content .show_qrcode .show_pic img{
    width: 80%;
    margin: auto;
}
.content .show_qrcode .show_pic .qrcode_text{
    display: block;
    width: 100%;
    text-align: center;
}
.content .show_qrcode .goback{
    border: none;
    width: 60%;
    background-color: #53a4f4;
    height: 2.5rem;
    line-height: 2.5rem;
    border-radius: 5px;
    color: white;
    margin-top: 2rem;
}
</style>