<template>
    <div class="content">
        <div class="top">
            <p class="top_title">深圳市人民医院入院登记卡</p>
        </div>
        <div class="list">
            <div class="list_tips">
                <van-icon name="smile-comment-o" />
                <span>请选择您的预约记录</span>
            </div>
            <ul>
                <li class="list_li" v-for="item in this.dataList" :key="item.id">
                    <router-link tag="div" :to="{path:'/successqrcode',query:{id:item.id,codeText:item.reservationCode}}" class="list_left">
                        <p class="list_left_top">
                            <strong>{{item.name}}</strong>
                            <span class="">{{item.currentTime}}</span>
                        </p>
                        <p class="list_left_down">点击查看预约码</p>
                    </router-link>
                    <div class="list_right">
                        <van-button class="mybtn" type="primary" @click.native="getModify(item)">修改</van-button>
                    </div>
                </li>
                <li class="list_li">
                    <router-link tag="div" :to="{path:'/successqrcode'}" class="list_left">
                        <p class="list_left_top">
                            <strong>上官磊</strong>
                            <span class="">2020/01/09 18:47:26</span>
                        </p>
                        <p class="list_left_down">点击查看预约码</p>
                    </router-link>
                    <div class="list_right">
                        <van-button class="mybtn" type="primary">修改</van-button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Button, Icon } from 'vant';
import { getReservation } from '../api/api'

Vue.use(Icon);
Vue.use(Button);
export default {
    data(){
        return{
            dataList:[]
        }
    },
    methods:{
        getData(){//获取数据
            getReservation().then((res) => {
                if(res.code == 1){
                    this.dataList = res.data
                    // console.log(res)
                }else{
                    alert(res.data)
                }
            })
        },
        getModify:function(item){//修改
            this.$router.push({
                path:'/recordmodify',
                query:{id:item.id}
            })
            console.log(item.id)
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
    margin: auto;
}
.content .top{
    height: 3rem;
    line-height: 3rem;
    background: #53a4f4;
    color: white;
    font-size: 16px;
    width: 100%;
    margin: auto;
}
.content .list{
    width: 100%;
}
.content .list .list_tips{
    display: block;
    background-color: #f0f0f0;
    text-align: left;
    height: 3rem;
    line-height: 3rem;
    padding-left: 10px;
    color: #0774e4;
}
.list .list_tips span{
    display: inline-block;
    line-height: 3rem;
    height: 3rem;
}
.content .list .list_li{
    display: flex;
    width: 100%;
    height: 4rem;
    flex-direction: row;
    border-bottom: 8px solid #f8f8f8;
}
.list .list_li .list_left{
    flex: 3;
    text-align: center;
    font-size: 16px;
    line-height: 2rem;
}
.list .list_li .list_left .list_left_top{
    display: inline-block;
    text-align: left;
    width: 90%;
    height: 2rem;
}
.list .list_li .list_left .list_left_down{
    display: inline-block;
    text-align: left;
    width: 90%;
    height: 2rem;
}
.list .list_li .list_right{
    flex: 1;
    text-align: center;
    line-height: 4rem;
}
</style>