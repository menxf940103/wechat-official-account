<template>
    <div class="content">
        <!-- <ul class="hospital">
            <a class="guide" href=''></a>
            <router-link tag="li" to="/doctordetails" class="hospital_li">
                <div class="list_img">
                    <img src="../assets/images/h1.png"/>
                </div>
                <div class="list_content">
                    <p class="list_title">目前本市定点医院已经实现住院联网登记，参保患者住院就医应选择联网的定点医院住院，住院之日起5日内，携带社保卡直接在医院办理住院登记手续。参保患者在办理过程中如果遇到参保信息有误等问题无法办理时，请及时与医院医保科和所在单位取得联系，确认个人信息是否正确及社保卡信息是否正确。</p>
                    <p class="list_time">衡阳市第四人民医院 2019-12-22 14:55:02</p>
                </div>
            </router-link>
        </ul> -->
    </div>
</template>
<script>
import Vue from 'vue';
import { getmedicineDuide } from '../api/api'

export default {
    methods:{
        medicineDuideAction:function(){//获取就医指南
            getmedicineDuide().then(res=>{
                window.location.replace(res.data)
            }).catch(error=>{console.log(error)})
        }
    },
    mounted(){
        this.medicineDuideAction()
    }
}
</script>

<style scoped>
.content{
    width: 100%;
    height: 100%;
}
.content .hospital{
    width: 100%;
}
.content .hospital .hospital_li{
    width: 100%;
    display: block;
    border-bottom: 1px solid #eeeeee;
    padding: 10px 0;
}
.hospital .hospital_li .list_img{
    width: 20%; 
    display: inline-block;
}
.hospital_li .list_img img{
    width: 66%;
}
.hospital .hospital_li .list_content{
    width: 76%;
    display: inline-block;
}
.hospital_li .list_content .list_title{
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    text-align: left;
}
.hospital_li .list_content .list_time{
    font-size: 12px;
    color: #cccccc;
    white-space: nowrap;
    text-align: left;
}
</style>