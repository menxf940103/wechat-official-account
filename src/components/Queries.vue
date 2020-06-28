<template>
    <div class="content">
        <p class="toptips">
            <span class="tops_title">温馨提示：</span>
            <span class="top_text">进现实当天时间的排队情况</span>
        </p>
        <div class="queries">
            <p class="queries_title">
                <img src="../assets/images/s5.png"/>
                我的排队号
            </p>
            <p class="queries_cont">
                我的号码：
                <span>{{this.dataList.number}}号</span>
            </p>
            <p class="queries_text">
                排队类目：
                <span>{{this.dataList.queueType}}</span></p>
            <p class="queries_title">
                <img src="../assets/images/s6.png"/>
                进度
            </p>
            <p class="queries_text">
                当前正在受理的号是
                <span>{{this.dataList.scheduleNo}}号</span>
            </p>
            <p class="queries_text">
                您前面还有
                <span>{{this.dataList.frontNo}}</span>
                位在等待
            </p>
            <p class="queries_text">
                预计等待
                <span>{{this.dataList.time}}</span>
                分钟
            </p>
        </div>
        <button class="click_btn" @click="getRefresh">点击刷新</button>
    </div>
</template>
<script>
import Vue from 'vue'
import { getqueryQueue } from '../api/api'
export default {
    data(){
        return{
            dataList:[]
        }
    },
    methods:{
        getInfor:function(){//获取排队数据
            getqueryQueue().then((res) => {
                if(res.code == 1){
                    console.log(res)
                    this.dataList = res.data
                }else{
                    console.log(res.data)
                }
            })
        },
        getRefresh:function(){
            // console.log('shuaxin')
            this.$router.go(0)
            // this.getInfor()
        }
    },
    mounted() {
        this.getInfor();
    },
}
</script>
<style scoped>
.content{
    width: 90%;
    margin: auto;
    overflow: hidden;
}
.content .toptips{
    width: 100%;
    text-align: left;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
}
.content .toptips .tops_title{
    color: #617def;
}
.content .queries{
    width: 100%;
    border: 1px solid #eeeeee;
    box-shadow: 2px 2px 2px 2px rgba(179,179,179,0.5);
    border-radius: 5px;
    margin: auto;
    margin-top: 1rem;
}
.content .queries p{
    width: 90%;
    margin: auto;
    text-align: left;
    font-size: 14px;
    line-height: 30px;
}
.content .queries p span{
    color: #617def;
    font-size: 16px;
}
.content .queries .queries_title{
    width: 90%;
    border-bottom: 1px solid #eeeeee;
}
.content .queries .queries_title img{
    width: 5%;
}
.content .click_btn{
    width: 80%;
    background-color: #53a4f4;
    border: none;
    border-radius: 5px;
    height: 2.5rem;
    line-height: 2.5rem;
    margin-top: 2rem;
    color: white;
}
</style>