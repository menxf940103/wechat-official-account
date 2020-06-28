<template>
    <div class="content">
        <div class="content_top">
            <form action="/">
                <!-- <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
                    <div slot="action" @click="onSearch">搜索</div>
                </van-search> -->
                <van-cell class="content_colle" icon="like-o" title="最近就诊与收藏" is-link to="/mydoctor" />
            </form>
        </div>
        <div class="box">
            <div class="list">
                <ul>
                    <li v-for="(item,index) in this.dataList" :key="item.id" :class="{active:num==index}" @click="getNum(index)">{{item.parentName}}</li>
                </ul>
            </div>
            <div class="cont" v-if="this.getName == '预约挂号'">
                <div v-for='(itemCon,index) in this.dataList' v-show="index == num" :key="index">
                    <van-cell v-for="(items,index) in itemCon.depts " :key="index" :title="items.deptName" is-link :to="{ path: 'outdepartment', query: { deptId : items.deptId}}"  />
                </div>
            </div> 
            <div class="cont" v-if="this.getName == '当天挂号'">
                <div v-for='(itemCon,index) in this.dataList' v-show="index == num" :key="index">
                    <van-cell v-for="(items,index) in itemCon.depts " :key="index" :title="items.deptName" is-link :to="{ path: '/daychoose', query: { deptId : items.deptId}}"  />
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Search, Sidebar, SidebarItem, TreeSelect  } from 'vant';
import { getDeptInfo, getDayDeptInfo } from '../api/api'

// Vue.use(Search);
export default {
    components:{
        [Search.name]: Search,
        [Sidebar.name]: Sidebar,
        [SidebarItem.name]: SidebarItem,
        [TreeSelect.name]: TreeSelect,
    },
    data(){
        return{
            num: 0,
            value:'',
            activeKey:1,
            dataList:[],//总数据，大数组
            cardiology:[],//门诊
            roomId:"",//
            getName:"",//上个入口名字
        }
    },
    methods:{
        onSearch:function(){//搜索
            console.log(this.value)
        },
        getData(){//获取数据
            if(this.getName == '预约挂号'){
                getDeptInfo().then((res) => {
                    if(res.code == 1){
                        this.dataList = res.data
                    }
                }).catch((error) => {console.log(error)})
            }else if(this.getName == '当天挂号'){
                getDayDeptInfo().then((res) => {
                    if(res.code == 1){
                        this.dataList = res.data
                    }
                }).catch((error) => {console.log(error)})
            }
        },
        getNum(index) {
          this.num = index;
        },
    },
    mounted(){
        this.getName = this.$route.query.getName
        this.getData()
    }
}
</script>
<style scoped>
.content{
    width: 100%;
}
.content .content_top{
    /* position: fixed; */
    z-index: 10;
    top: 0;
    width: 100%;
    border-bottom: 1px solid #ccc
}
.content .content_tree{
    position: relative;
    top: 100px;
}
.content_tree .van-tree-select{
    height: 100%;
    position: fixed;
    width: 100%;
}
.content_tree .van-tree-select .van-tree-select__nav,.content_tree .van-tree-select .van-tree-select__content{
    margin-bottom: 100px;
}
.content_colle{
    text-align: left;
}
/* ---------- */
.content .box{
    width: 100%;
    display: flex;
    flex-direction: row;
    /* position: absolute; */
    /* margin-top: 5rem; */
}
.content .box .list{
    flex: 1;
}
.box .list ul{
    display: block;
    list-style: none;
    padding: 0;
    margin: 0;
    color: #717181;
    font-size: 16px;
    line-height: 60px;
    background-color: #f9f9f9;
}
.box .list ul li{
    font-size: 12px;
    height: 3rem;
    line-height: 3rem;
}
.content .box .cont{
    flex: 2;
}
.active {
    color: #fff;
    background: #77b6f3;
}
.van-cell {
    text-align: left;
}
</style>