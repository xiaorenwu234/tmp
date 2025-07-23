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
        <div v-for="(MyFavorite,index) in MyFavorites" :key="index" class="mx-6 my-2" @click="HandleAdd(index)">
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
      <el-button type="success" @click="Mode=0" v-if="Mode===1">返回一级收藏夹</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import {ElMessageBox} from "element-plus";
import { onMounted, ref } from 'vue'
import instance from "@/apis/axios.js";
import {UserStore} from "@/stores/User.js";
import {OpenNotification} from "@/js/Notification.js";

const userstore = UserStore();
const DialogVisible = defineModel('DialogVisible');
const Title = '我的收藏夹'
const MyFavorites = ref([]);

const emits = defineEmits(['ChangeStatus'])

const props = defineProps({
  article_id: String,
  article_type: String,
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

//获取所有的一级收藏夹
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

const HandleAdd=(index)=>{
  const FavoriteID = MyFavorites.value[index].favorites_id;
  const FavoriteName = MyFavorites.value[index].favorites_name;
  ElMessageBox.confirm(
    `是否要添加到 ${FavoriteName} 收藏夹中`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
        //添加到收藏夹中
        const formData = new FormData();
        formData.append('username', userstore.Username);
        formData.append('favorites_id', FavoriteID);
        formData.append('article_id', props.article_id);
        formData.append('article_type', props.article_type);

        instance.post('/favorites/addArticleToFav', formData)
          .then(response => {
            if (response.data.success === true) {
              OpenNotification('添加成功', '');
              DialogVisible.value = false;
              emits('ChangeStatus');
            } else {
              OpenNotification('添加失败', response.data.message);
            }
          })
      }
    )
    .catch(() => {
      console.log('取消')
    })
}
onMounted(GetMyFavorites);
</script>

