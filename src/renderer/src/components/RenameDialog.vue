<script setup>
import {ElMessageBox} from "element-plus";
import {UserStore} from "@/stores/User.js";
import instance from "@/apis/axios.js";
import {OpenNotification} from "@/js/Notification.js";
import {ref} from "vue";

const userstore=UserStore();
const DialogVisible = defineModel('DialogVisible');
const Title = '重命名'

const props=defineProps({
  RenameMode:String,
})

//当前选中的收藏夹对象
const favorites_name=defineModel('favorites_name');
const favorites_id=defineModel('favorites_id');

const emits=defineEmits(['GetFavorites'])

//关闭界面
const handleClose = () => {
  ElMessageBox.confirm(
      '是否要关闭重命名界面',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    console.log('确认')
    DialogVisible.value = false;
  }).catch(() => {
    console.log('取消')
  })
}

//处理重命名
const handleRename=()=>{
  const formData=new FormData();

  const html=props.RenameMode==='0'?'/favorites/renameFav':'/favorites/renameSubFav';
  formData.append('username',userstore.Username);
  formData.append('favorites_id',favorites_id.value);
  formData.append('new_favorites_name',favorites_name.value);
  formData.append('sub_favorites_id',favorites_id.value);
  formData.append('new_sub_favorites_name',favorites_name.value);
  instance.post(html, formData)
      .then(response=>{
        console.log(response.data);
        if(response.data.success===true){

          OpenNotification('重命名完成');
          emits('GetFavorites');
          DialogVisible.value = false;
        }
        else{
          OpenNotification('重命名失败');
        }
      })
      .catch(error=>{
        console.log(error.response.data);
      })
}
</script>

<template>
  <el-dialog
      v-model="DialogVisible"
      :title="Title"
      width="500"
      :before-close="handleClose"
  >
    <span></span>
    <template #footer>
      <div class="flex">
        <div class="mx-auto">
          <el-card style="width: 240px">
            <img src="./icons/Folder.svg" alt="收藏夹" class="m-auto">
            <el-input v-model="favorites_name"></el-input>
          </el-card>
          <div class="flex">
            <div class="mx-auto mt-4">
              <el-button type="primary" size="large" @click="handleRename">确定</el-button>
              <el-button size="large" @click="DialogVisible=false">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>