<template>
    <div class="content">
        <div class="content_top">
            <span class="top_title">就诊人：</span>
            <!-- <v-select class="chois"  style="border:none" :options="this.inforList" label="patientName" v-model="select"  @input="changeProduct"></v-select> -->
            <!-- <select v-model="select" class="chois" @change="changeProduct($event)">
                <option v-for="item in this.inforList" :key="item.id" :value="item">{{item.patientName}}</option>
            </select> -->
            <select v-model="select" class="chois" @blur="scrollAction()" @change="changeProduct(select)">
                <option  style="display:none" value="" disabled selected>请选择</option>
                <option v-for="item in this.inforList" :key="item.patientId" >{{item.name}}</option>
            </select>
        </div>
        <div class="content_tab">
            <van-tabs v-model="active" title-active-color="#2b8de7" line-height="2px" class="content_tabs_title">
                <van-tab title="最近就诊">
                    <ul class="list_card">
                        <li class="list_card_li" v-for="item in this.dagList" :key="item.id">
                            <div class="card_libox">
                                <div class="card_li_top">
                                    <div class="li_top_img">
                                        <img src="../assets/images/timg (2).jpg"/>  
                                    </div>
                                    <div class="li_top_title">
                                        <p>
                                            <span style="width:60px;display:inline-block;">{{item.doctorName}}</span>
                                            <span style="color:#cccccc;">{{item.doctorLevel}}</span></p>
                                        <p style="color:#cccccc;">{{item.roomName}}</p>
                                    </div>
                                    <div class="li_top_score">
                                        <span v-if="value==1">已收藏</span>
                                        <span v-else></span>
                                    </div>
                                </div>
                                <div class="card_li_cent">
                                    <span>挂号人：{{item.patientName}}</span>
                                    <span>流水号：{{item.clinicSeq}}</span>
                                    <span>科室：{{item.deptName}}</span>
                                    <!-- <span>科室位置：{{item.deptAddress}}</span> -->
                                    <p>就诊卡号：{{item.patientId}}</p>
                                </div>
                                <div class="card_li_down">
                                    <span>开单时间：{{item.visitDate}}  </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- <ul class="list_card" v-else style="display:none;"></ul> 判断是否有数据 -->
                </van-tab>
                <van-tab title="收藏">
                    <ul class="collection_list" v-if="this.dataList.length >= 1">
                        <li class="collection_list_li" v-for="item in this.dataList" :key="item.id">
                            <div class="card_libox">
                                <div class="card_li_top">
                                    <div class="li_top_img">
                                        <img src="../assets/images/timg (2).jpg"/>  
                                    </div>
                                    <div class="li_top_title">
                                        <p>
                                            <span style="width:60px;display:inline-block;">{{item.doctorName}}</span>
                                            <span style="color:#cccccc;">{{item.doctorLevel}}</span></p>
                                        <p style="color:#cccccc;">{{item.roomName}}</p>
                                    </div>
                                    <div class="li_top_score">
                                        <span v-if="value==1">已收藏</span>
                                        <span v-else></span>
                                    </div>
                                </div>
                                <div class="card_li_introduce">
                                    <span>{{item.description}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="blank" v-else>暂无收藏...</div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Tab, Tabs, Rate } from 'vant';
import { getPaientInfo, getFavorite, getRecentDoctor } from '../api/api'

Vue.use(Rate);
Vue.use(Tab).use(Tabs);
export default {
    component:{
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
    },
    data(){
        return{
            checked: true,
            activeIcon: require('../assets/images/sc1.png'),
            inactiveIcon: require('../assets/images/sc2.png'),
            select:'',
            active: 0,
            value:1,
            patientId:"",//就诊卡号
            dataList:[],//返回全部数据
            inforList:[],//就诊人信息
            dagList:[],//最近就诊信息
            checkarr:[],
        }
    },
    methods:{
        changeProduct:function(e){//选择就诊人
            this.patientId = this.inforList[event.target.selectedIndex-1].patientId,//就诊卡号
            this.getList()//获取与就诊人相关信息
        },
        scrollAction(){
            scrollTo(0,0)
        },
        getList:function(){
            getFavorite().then((res) => {//最近收藏
                if(res.code == 1){
                    this.dataList = res.data
                }else if(res.code == 0)[
                    alert("数据加载失败")
                ]
            })
            // 最近就诊
            let parm = {
                patientId:this.patientId
                // patientId:'PE00078923'
            }
            getRecentDoctor(parm).then((res) => {
                if(res.code == 1){
                    this.dagList = res.data
                }else{
                    console.log(res.data)
                }
            })
        },
        getInfor:function(){//获取就诊人信息
            getPaientInfo().then((res) => {
                if(res.code == 1){
                    this.inforList = res.data
                    this.select = res.data[0].name
                    this.patientId = res.data[0].patientId
                    this.getList() //获取最近收藏医生
                }else{
                    console.log(res.data)
                }
            })
        },
    },
    mounted(){
        this.getInfor()//获取就诊人信息
        
    }
    // beforeCreate () {
    //     document.title = this.$route.meta.title//界面标题根据获取上个界面的数据修改
    // }
}
</script>
<style scoped>
.content{
    width: 100%;
}
.content .content_top{
    width: 100%;
    height: 45px;
    padding: 10px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f8f8f8;
}
.content .content_top .top_title{
    display: inline-block;
    /* flex: 1; */
    margin-left: 20px;
    line-height: 34px;
    font-size: 14px;
    color: #000;
}
.content .content_top .chois{
    height: 100%;
    flex: 2;
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
/* 选项卡 */
.content .content_tab{
    width: 100%;
}
/* .content .content_tab .content_tabs_title  .van-tabs__nav .van-tabs__line{
    background-color: #2b8de7!important;
    bottom: 14px;
} */
/* 最近就诊记录卡片(最近就诊) */
.content_tab .list_card{
    list-style: none;
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}
.content_tab .list_card .list_card_li{
    width: 90%;
    border: 1px solid #cdcdcd;
    box-shadow: #cccccc;
    border-radius: 10px;
    margin-left: 5%;
    margin-bottom: 10px;
    box-shadow: 2px 2px 2px 2px #cdcdcd;
}
.content_tab .list_card .list_card_li .card_libox{
    width: 90%;
    margin: auto;
    padding: 10px 0px;
}
/* 最近就诊记录卡片--头像和收藏 */
.list_card .list_card_li .card_li_top{
    width: 100%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #cdcdcd;
    font-size: 12px;
}
.list_card_li .card_li_top .li_top_img{
    flex: 1;
}
.list_card_li .card_li_top .li_top_title{
    flex: 2;
    text-align: left;
    font-size: 14px;
}
.list_card_li .card_li_top .li_top_score{
    flex: 1;
}
.list_card .list_card_li .card_li_top img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
/* 最近就诊记录卡片--挂号信息 */
.list_card .list_card_li .card_li_cent{
    width: 100%;
    padding-bottom: 8px;
    border-bottom: 1px solid #cdcdcd;
    text-align: left;
    font-size: 12px;
    /* padding: 10px; */
}
.list_card_li .card_li_cent span{
    display: inline-block;
    width: 50%;
    /* font-size: 14px; */
    height: 30px;
    line-height: 30px;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/* 最近就诊记录卡片--就诊时间记录 */
.list_card .list_card_li .card_li_down{
    width: 100%;
    text-align: left;
    /* padding: 10px; */
}
.list_card_li .card_li_down span{
    display: block;
    width: 100%;
    font-size: 12px;
    height: 36px;
    line-height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/* 收藏 */
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
.collection_list_li .card_libox .card_li_introduce{
    display: block;
    line-height: 20px;
    /* text-overflow: ellipsis; */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    font-size: 12px;
}
.blank{
    width: 100%;
    height: 100%;
    margin-top: 60%;
}
</style>