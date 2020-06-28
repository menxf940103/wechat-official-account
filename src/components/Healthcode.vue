<template>
  <div class="content">
      <!-- <div class="qr_code">
        <vue-qr   :text='this.qrCodeText' :margin="0" :size="120"></vue-qr>
      </div>
      <div class="personInfo">
          <p><span>姓名：</span><span>张三</span></p>
          <p><span>身份证号：</span><span>72398472398759379</span></p>
          <p><span>手机号：</span><span>64563647</span></p>
      </div> -->
  </div>
</template>

<script>
import VueQr from 'vue-qr'
import { gethealthCode } from '../api/api'

export default {
    components: {VueQr},
    data() {
        return {
            qrCodeText:'',
        }
    },
    methods: {
        getHealthCodeAction:function(){//获取电子健康码
            gethealthCode().then((res)=>{
                 window.location.replace(res.data)
                // window.location.href = res.data
                // this.qrCodeText = res.data
            }).catch((error=>{console.log(error)}))
        },

    },
    mounted(){
        this.getHealthCodeAction()
    },
}
</script>

<style scoped>
.content{
    width: 100%;
}
.qr_code{
    margin-top: 40px;
    margin-bottom: 50px;
}
.personInfo{
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
}
.personInfo p{
    display: flex;
    justify-content: space-between;
    line-height: 46px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #eee;
}
</style>