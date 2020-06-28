<template>
  <div>我的社保
      <a id="social" @click="goto" href="https://mp.weixin.qq.com/insurance/card/view" ></a>
  </div>
</template>

<script>
export default {
    mounted(){
        if(history.length>2){
            history.back()
        }else{
            // this.goto()
            document.querySelector('#social').click()
        }   

    },
}
</script>

<style scoped>

</style>