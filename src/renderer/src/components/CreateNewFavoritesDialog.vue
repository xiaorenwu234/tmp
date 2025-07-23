<script setup>
import {ElMessageBox, ElNotification} from "element-plus";
import {UserStore} from "@/stores/User.js";
import {onMounted, ref, watch} from "vue";
import instance from "@/apis/axios.js";
import {OpenNotification} from "@/js/Notification.js";

const userstore = UserStore();
const DialogVisible = defineModel('DialogVisible');
const Title = '新建'

const props=defineProps({
  CreateMode:String,
  FatherID:String,
})

//当前选中的收藏夹对象
const MyFavorite = ref({name: ''});

const emits = defineEmits(['GetFavorites']);

const handleClose = () => {
  ElMessageBox.confirm(
      '是否要关闭创建界面',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    console.log('确认')
    MyFavorite.value.name='';
    DialogVisible.value = false;
  }).catch(() => {
    console.log('取消')
  })
}

//处理创建事件
const handleCreate = () => {
  const username = userstore.Username;
  const Favorite_Name = MyFavorite.value.name;
  const html=props.CreateMode==='0'?'/favorites/addNewFav':'/favorites/addSubFav';
  const formData = new FormData();
  formData.append('username', username);
  formData.append('favorites_name', Favorite_Name);
  formData.append('father_favorites_id', props.FatherID);

  instance.post(html, formData)
      .then(response => {
        if (response.data.success === true) {
          OpenNotification('创建成功', '');
          emits('GetFavorites');
          MyFavorite.value.name='';
          DialogVisible.value=false;
        } else {
          OpenNotification('创建失败', response.data.message);
        }
      })
      .catch(error => {
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
            <el-input v-model="MyFavorite.name" style="text-align: center"></el-input>
          </el-card>
          <div class="flex">
            <div class="mx-auto mt-4">
              <el-button type="primary" size="large" @click="handleCreate">确定</el-button>
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