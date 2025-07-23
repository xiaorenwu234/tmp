<template>
  <el-dialog
      v-model="DialogVisible"
      :title="Title"
      width="880"
      :before-close="handleClose"
  >
    <span></span>
    <template #footer>
      <div class="flex flex-wrap">
        <div v-for="(MyFavorite,index) in MyFavorites" :key="index" class="mx-6 my-2" @click="HandleMove(index)">
          <div>
            <el-card style="width: 160px" class="hover:bg-gray-200">
              <img src="@/components/icons/Folder.svg" alt="收藏夹" class="m-auto">
              <template #footer>
                <div class="flex">
                  <el-popover
                      placement="top"
                      trigger="hover"
                      :content="MyFavorite.favorites_name"
                      class="text-center"
                  >
                    <template #reference>
                      <div class="w-full flex">
                        <div class="mx-auto truncate w-40 text-center">{{ MyFavorite.favorites_name }}</div>
                      </div>
                    </template>
                  </el-popover>
                </div>
              </template>
            </el-card>
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {ElMessageBox, ElNotification} from "element-plus";
import {onMounted, ref } from 'vue'
import instance from "@/apis/axios.js";
import {UserStore} from "@/stores/User.js";
const userstore = UserStore();
const emits = defineEmits(['handleMoveOut']);

const DialogVisible = defineModel('DialogVisible')
const Title = '我的收藏夹';
const MyFavorites = ref([]);

const props = defineProps({
  article_id: String,
  from_favorites_id: String,
  article_type: String,
  from_favorites_type:String,
})

const handleClose = () => {
  ElMessageBox.confirm(
      '是否要关闭窗口',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    DialogVisible.value = false;
    console.log('确认')
  }).catch(() => {
    console.log('取消')
  })
}

//获取所有的一级目录
const GetMyFavorites = () => {
  const username = userstore.Username;

  instance.get('/favorites/getMyFav', {
    params: {
      'username': username
    }
  })
      .then(response => {
        MyFavorites.value = response.data.data;
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const HandleMove=(index)=>{
  const FavoriteID = MyFavorites.value[index].favorites_id;
  const FavoriteName = MyFavorites.value[index].favorites_name;
  ElMessageBox.confirm(
    `是否要移动到 ${FavoriteName} 收藏夹中`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {

    const formData = new FormData();
    formData.append('username', userstore.Username);
    formData.append('from_favorites_id', props.from_favorites_id);
    formData.append('article_id', props.article_id);
    formData.append('article_type', props.article_type)
    formData.append('to_favorites_id', FavoriteID);
    formData.append('to_favorites_type','main');
    formData.append('from_favorites_type',props.from_favorites_type);
    instance.post('/favorites/moveArticle', formData)
      .then(response => {
        if (response.data.success === true) {
          ElNotification({
            title: '移动成功',
            duration: 2000,
          })
          emits('handleMoveOut');
        } else {
          ElNotification({
            title: '移动失败',
            duration: 2000,
          })
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
    DialogVisible.value = false;
  }).catch(() => {
    console.log('取消')
  })
}

onMounted(GetMyFavorites);
</script>

