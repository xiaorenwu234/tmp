<script setup>
import UpdateFile1 from "@/components/UpdateFile.vue";
import UpdateFile2 from "@/components/UpdateFile.vue";
import UpdateFile3 from "@/components/UpdateFile.vue";
import {ref} from "vue";
import {OpenNotification} from "@/js/Notification.js";
import instance from "@/apis/axios.js";

const file1 = ref(null);
const file2 = ref(null);
const file3 = ref(null);

const handleUpdate1 = (file) => {
  file1.value = file;
}

const handleUpdate2 = (file) => {
  file2.value = file;
}

const handleUpdate3 = (file) => {
  file3.value = file;
}

const onSubmit=()=>{
  if(file1.value===null&&file2.value===null&&file3.value===null){
    OpenNotification('请至少上传一个压缩包','');
    return;
  }
  if(file1.value!==null){
    const formData = new FormData();
    formData.append("zip_file", file1.value);
    instance.post('/favorites/daorushuju',formData)
        .then(response=>{
          console.log(response.data);
          if(response.data.success===true){
            OpenNotification('上传文件1成功','');
          }
          else{
            OpenNotification('上传失败',response.data.message);
          }
        })
        .catch(error=>{
          console.log(error.response.data);
        })
  }
  if(file2.value!==null){
    const formData = new FormData();
    formData.append("zip_file", file2.value);
    instance.post('/favorites/daorushuju',formData)
        .then(response=>{
          if(response.data.success===true){
            OpenNotification('上传文件2成功','');
          }
          else{
            OpenNotification('上传失败','')
          }
        })
        .catch(error=>{
          console.log(error.response.data);
        })
  }
  if(file3.value!==null){
    const formData = new FormData();
    formData.append("zip_file", file3.value);
    instance.post('/favorites/daorushuju',formData)
        .then(response=>{
          if(response.data.success===true){
            OpenNotification('上传文件3成功','');
          }
          else{
            OpenNotification('上传失败','')
          }
        })
        .catch(error=>{
          console.log(error.response.data);
        })
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-wrap">
    <div class="w-full flex my-2">
      <div class="flex mx-auto flex-wrap">
        <UpdateFile1 :inputid="'input1'" @handleUpdate="handleUpdate1" class="mx-2" :content="'计量标准'"></UpdateFile1>
          <UpdateFile2 :inputid="'input2'" @handleUpdate="handleUpdate2" class="mx-2" :content="'电力标准'"></UpdateFile2>
        <UpdateFile3 :inputid="'input3'" @handleUpdate="handleUpdate3" class="mx-2" :content="'电力法规'"></UpdateFile3>
      </div>
    </div>
    <el-button type="success" size="large" class="mx-auto my-2 tracking-widest" @click="onSubmit">上 传</el-button>
  </div>
</template>

<style scoped>

</style>