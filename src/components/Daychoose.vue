<template>
    <div class="content">
        <div class="content_tab">
            <ul class="collection_list">
                <li class="collection_list_li" v-for="(item, index) in this.dataList" :key="index.id">
                    <router-link tag="div" :to="{query:{deptId:item.scheduleInfo.deptId,doctorId:item.doctorId,regDate:item.scheduleInfo.regDate,shiftCode:item.scheduleInfo.shiftCode,regFee:item.scheduleInfo.regFee,regLeaveCount:item.scheduleInfo.regLeaveCount,regStatus:item.scheduleInfo.regStatus,scheduleId:item.scheduleInfo.scheduleId,treatFee:item.scheduleInfo.treatFee,getName:'当天挂号'},path:'/doctorout'}" class="card_libox">
                        <div class="card_li_top">
                            <div class="li_top_img">
                                <img src="../assets/images/timg (2).jpg"/>  
                            </div>
                            <div class="li_top_title">
                                <p>
                                    <span style="width:60px;display:inline-block;">{{item.doctorName}}</span>
                                    <span style="color:#cccccc;">{{item.doctorLevel}}</span></p>
                                <p style="color:#cccccc;">{{item.scheduleInfo.deptName}}</p>
                            </div>
                            <div class="li_top_score">
                                <span class="li_top_score_res" v-if="item.scheduleInfo.regStatus==2">展位开发</span>
                                <span class="li_top_score_full" v-if="item.scheduleInfo.regStatus==1">出诊</span>
                                <span class="li_top_score_stop" v-if="item.scheduleInfo.regStatus==0">停诊</span>
                            </div>
                        </div>
                        <div class="card_li_introduce">
                            <span>{{item.description}}</span>
                        </div>
                        <div class="card_li_time">
                            <van-cell :title='item.scheduleInfo.startTime+"上午"' is-link />
                            <van-cell :title='item.scheduleInfo.endTime+"下午"' is-link />
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Cell, CellGroup } from 'vant';
import { getDayScheduleInfo } from '../api/api'

Vue.use(Cell).use(CellGroup);
export default {
    data(){
        return{
            value:2,
            date: 0,
            d: 0,
            checkTime:'',
            deptId:'',//诊室代码	
            regDate:'2020-01-01',//出诊日期，格式：YYYY-MM-DD	
            regFee:"",//挂号费
            dataList:[],//返回的所有数据
        }
    },
    methods:{
        getList:function(){
            let parma = {
                deptId:this.deptId,//诊室代号
                // deptId:'1008',//诊室代号
            }
            getDayScheduleInfo(parma).then((res) => {
                if(res.code == 1){
                    this.dataList = res.data
                }
            })
        }
    },
    mounted: function() {
        // 获取数据
        this.deptId = this.$route.query.deptId
        this.getList();
    }
}
</script>
<style scoped>
.content{
    width: 100%;
}
/* 卡片信息 */
.collection_list{
    list-style: none;
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}
.collection_list .collection_list_li{
    width: 90%;
    border: 1px solid #cdcdcd;
    box-shadow: #cccccc;
    border-radius: 10px;
    margin-left: 5%;
    margin-bottom: 10px;
    box-shadow: 2px 2px 2px 2px #cdcdcd;
}
.collection_list .collection_list_li .card_libox{
    width: 90%;
    margin: auto;
    padding: 10px 0px;
}
.collection_list .collection_list_li .card_libox .card_li_top{
    width: 100%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #cdcdcd;
    font-size: 12px;
}
.collection_list .collection_list_li .card_libox .card_li_top img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.collection_list_li .card_libox .card_li_top .li_top_img{
    flex: 1;
}
.collection_list_li .card_libox .card_li_top .li_top_title{
    flex: 2;
    text-align: left;
    font-size: 14px;
}
.card_li_top .li_top_score .li_top_score_res{/* 可预约 */
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background-color: #12a997;
    display: inline-block;
    line-height: 2.5rem;
    color: white;
}
.card_li_top .li_top_score .li_top_score_full{/* 已满诊 */
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background-color: #e8e8e8;
    display: inline-block;
    line-height: 2.5rem;
    color: #cccccc;
}
.card_li_top .li_top_score .li_top_score_stop{/* 停诊 */
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background-color: #f95050;
    display: inline-block;
    line-height: 2.5rem;
    color: white;
}
.collection_list_li .card_libox .card_li_introduce{
    display: block;
    
    border-bottom: 1px solid #cdcdcd;
}
.collection_list_li .card_libox .card_li_introduce span{
    display: inline-block;
    width: 100%;
    margin: 10px 0px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 12px;
}
.card_li_time{
    text-align: left;
}
</style>