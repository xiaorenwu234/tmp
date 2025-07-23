<script setup>
import {UserStore} from "@/stores/User.js";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import FavoriteTableFrame from "@/views/Frames/FavoriteTableFrame.vue";
import RenameDialog from "@/components/RenameDialog.vue";
import {ElMessageBox} from "element-plus";
import CreateNewFavoritesDialog from "@/components/CreateNewFavoritesDialog.vue";
import instance from "@/apis/axios.js";
import {OpenNotification} from "@/js/Notification.js";

const userstore = UserStore();
const MyFavorites = ref([]);
const RenameDialogVisible = ref(false);

//我当前选中的收藏夹
const MyFavorite = ref({favorites_id: '', favorites_name: ''});

//暂存当前右键点的是哪个文件夹
const tmpindex = ref(0);

//是否是显示文件夹页面
const ShowFolders = ref(true);

//是否显示新建界面
const CreateNewFavoritesDialogVisible = ref(false);

const CreateNewFavorites = () => {
  if(userstore.State===false){
    OpenNotification('请先登录');
    MyFavorites.value=[];
    return;
  }
  CreateNewFavoritesDialogVisible.value = true;
}

//获取收藏夹
const GetFavorites = () => {
  if(userstore.State===false){
    OpenNotification('请先登录');
    MyFavorites.value=[];
    return;
  }
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


//进入收藏夹
const handleClick = (index) => {
  ShowFolders.value = false;
  FavoriteIndex.value = MyFavorites.value[index];
}

//用来处理给重命名模块传值的问题
const tmpname = ref('');
const tmpid = ref('');

//处理重命名
const handleRename = (index) => {
  MyFavorite.value.favorites_id = MyFavorites.value[index].favorites_id;
  MyFavorite.value.favorites_name = MyFavorites.value[index].favorites_name;
  tmpname.value = MyFavorite.value.favorites_name;
  tmpid.value = MyFavorite.value.favorites_id;
  RenameDialogVisible.value = true;
  ShowFolders.value = true;
}

onMounted(GetFavorites);

const showMenu = ref(false);
const menuPosition = ref({x: 0, y: 0});

//在内部的右键
const handleRightClick = (event, index) => {
  menuPosition.value = {x: event.clientX, y: event.clientY};
  showMenu.value = true;
  tmpindex.value = index;
  event.preventDefault();
};

//删除对应收藏夹操作
const DeleteMyFavorite = (index) => {
  MyFavorite.value = MyFavorites.value[index];

  const formData = new FormData();
  formData.append("favorites_id", MyFavorite.value.favorites_id);
  formData.append('username', userstore.Username);

  instance.post('/favorites/deleteFav', formData)
      .then(response => {
        if (response.data.success === true) {
          OpenNotification('删除成功', '');
          MyFavorites.value.splice(index, 1);
        } else {
          OpenNotification('删除失败', response.data.message);
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
}


const FavoriteIndex=ref(0);

//删除收藏夹
const handleDelete = (index) => {
  ElMessageBox.confirm(
      '确定要删除这个收藏夹吗',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    console.log('确认')
    DeleteMyFavorite(index);
  }).catch(() => {
    console.log('取消')
  })
}

//右键选择事件
const menuItemClicked = (item) => {
  showMenu.value = false;
  if (item === 1) {
    handleClick(tmpindex.value)
  } else if (item === 2) {
    handleRename(tmpindex.value);
  } else if (item === 3) {
    handleDelete(tmpindex.value);
  }
};
//隐藏右键菜单
const hideMenu = () => {
  showMenu.value = false;
};

watch(() => userstore.State, GetFavorites);

onMounted(() => {
  window.addEventListener('click', hideMenu);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', hideMenu);
});
</script>

<template>
  <div class="w-full h-full flex flex-wrap" v-if="ShowFolders">

    <div class="w-full">
      <el-button class="mx-6 mb-2" size="large" @click="CreateNewFavorites">创建新收藏夹</el-button>
    </div>

    <div v-for="(MyFavorite,index) in MyFavorites" :key="index" class="mx-6 my-2" @dblclick="handleClick(index)"
         @contextmenu.prevent="(event) => handleRightClick(event, index)">
      <div>
        <ul v-if="showMenu" :style="{ top: menuPosition.y + 'px', left: menuPosition.x + 'px' }" class="custom-menu">
          <li @click="menuItemClicked(1)">打开</li>
          <li @click="menuItemClicked(2)">重命名</li>
          <li @click="menuItemClicked(3)">删除</li>
        </ul>
        <el-card style="width: 240px" class="hover:bg-gray-200 cursor-pointer">
          <img src="../../components/icons/Folder.svg" alt="收藏夹" class="m-auto">
          <template #footer>
            <div class="flex">
              <el-popover
                  placement="bottom"
                  :width="200"
                  trigger="hover"
                  :content="MyFavorite.favorites_name"
              >
                <template #reference>
                  <div class="flex w-full">
                    <div class="mx-auto truncate w-60 text-center">{{ MyFavorite.favorites_name }}</div>
                  </div>
                </template>
              </el-popover>
            </div>
          </template>
        </el-card>
      </div>
    </div>
  </div>
  <div class="w-full h-full">
<!--    <SecondFavoriteFrame :FavoriteIndex="FavoriteIndex" v-if="!ShowFolders"-->
<!--                        v-model:ShowFolders="ShowFolders"></SecondFavoriteFrame>-->
    <FavoriteTableFrame v-if="!ShowFolders"
                        v-model:FavoriteIndex="FavoriteIndex" :favorites_type="'main'" v-model:ShowFolders="ShowFolders"></FavoriteTableFrame>
  </div>
  <RenameDialog v-model:DialogVisible="RenameDialogVisible" v-model:favorites_name="tmpname"
                v-model:favorites_id="tmpid" @GetFavorites="GetFavorites" :RenameMode="'0'"></RenameDialog>
  <CreateNewFavoritesDialog v-model:DialogVisible="CreateNewFavoritesDialogVisible"
                            @GetFavorites="GetFavorites" :CreateMode="'0'" :FatherID="'0'"></CreateNewFavoritesDialog>
</template>

<style scoped>
.custom-menu {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.custom-menu li {
  padding: 8px 12px;
  cursor: pointer;
}

.custom-menu li:hover {
  background-color: #f0f0f0;
}
</style>