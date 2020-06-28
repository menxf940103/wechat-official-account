<template>
  <div class="content">
    <div class="addInfo">
      <van-address-edit
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
    <span class="address">新增地址</span>
  </div>
</template>

<script>
import Vue from 'vue';
import { AddressEdit } from 'vant';
// import { Toast } from 'vant';
export default {
  components:{
    [AddressEdit.name]:AddressEdit
  },
 data() {
    return {
      // areaList,
      // searchResult: []
    }
  },

  methods: {
    onSave() {
      Toast('save');
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }];
      } else {
        this.searchResult = [];
      }
    }
  }}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
.address {
  width: 250px;
  height: 48px;
  display: block;
  border-radius: 48px;
  background-color: #617def;
  color: #fff;
  line-height: 48px;
  text-align: center;
  font-size: 13px;
  margin: 100px auto 0;
}
</style>