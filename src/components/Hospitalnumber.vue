<template>
    <div class="content">
        <van-cell-group>
            <van-field label="住院号" v-model="value" placeholder="请输入用户名" clearable/>
        </van-cell-group>
        <p class="tips">
            <span class="tips_left">温馨提示：</span>
            <span>住院凭证由医院提供</span>
        </p>
        <div class="save">
            <button class="save_btn" @click="getSave">保存</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            value:"12524526222"
        }
    },
    methods:{
        getSave(){
            console.log('点击保存')
        }
    }
}
</script>
<style scoped>
.content{
    width: 100%;
    margin: auto;
}
.content .tips{
    width: 90%;
    text-align: left;
    font-size: 12px;
    margin: auto;
}
.content .tips .tips_left{
    color: #53a4f4;
}
.content .save{
    margin-top: 1rem;
    width: 100%;
}
.content .save .save_btn{
    border: none;
    width: 60%;
    margin: auto;
    height: 2.5rem;
    line-height: 2.5rem;
    color: white;
    background-color: #617def;
    border-radius: 10px;
}
</style>