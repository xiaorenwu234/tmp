<script setup>
import {onMounted, ref, watch} from "vue";
// import SearchDialog from "@/components/SearchDialog.vue";
import {UserStore} from "@/stores/User.js";
import {ElMessage, ElMessageBox} from "element-plus";
import MoveDialog from "@/components/MoveDialog.vue";
import instance from "@/apis/axios.js";
import {openPdf} from "../../stores/Pdf";
import {OpenNotification} from "@/js/Notification.js";

const userstore = UserStore();
const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)

const tableData = ref([]);

const FavoriteIndex = defineModel('FavoriteIndex');

//跟页码有关的内容
const currentPage = ref(1)
const pageSize = ref(15)
const size = ref('default')
const background = ref(false)
const disabled = ref(false)
const Loading = ref(false);

const props=defineProps({
  favorites_type:String,
})

//是否显示移动窗口
const MoveDialogVisible = ref(false);

//是否显示文件夹
const ShowFolders = defineModel('ShowFolders');

//要移动的pdf的id和收藏夹的id
const from_favorites_id = ref('');
const article_id = ref('');
const article_type = ref('');

const total = ref(0);

//高级搜索是否显示
// const DialogVisible = ref(false);

const handleSizeChange = (val) => {
  GetTableData();
}

const handleCurrentChange = (val) => {
  GetTableData();
}

//获取初始数据
const GetTableData = () => {
  let tmp_favorites_id;
  tmp_favorites_id=FavoriteIndex.value.favorites_id;
  instance.get('/favorites/getArticle', {
    params: {
      'username': userstore.Username,
      'favorites_id': tmp_favorites_id,
      'page': currentPage.value,
      'number_per_page': pageSize.value,
      'favorites_type':props.favorites_type
    }
  })
      .then(response => {
        tableData.value = response.data.data;
        total.value = response.data.length;
        for (let i = 0; i < tableData.value.length; ++i) {
          tableData.value[i]['Favorite'] = true;
          tableData.value[i]['HasMoved'] = false;
        }
        console.log(tableData.value);
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const GetBack = () => {
  ShowFolders.value = true;
}

//处理收藏情况
const handleFavorite = (row) => {
  let message;
  if (row.Favorite === true) {
    message = '取消收藏成功'
    ElMessageBox.confirm(
        '是否确定要取消收藏',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
    ).then(() => {
      ElMessage({
        message: message,
        type: 'success',
      });

      for (let i = 0; i < tableData.value.length; ++i) {
        if (row.article_name === tableData.value[i].article_name) {
          tableData.value[i].Favorite = !tableData.value[i].Favorite;

          //后端交互
          const formData = new FormData();
          formData.append('username', userstore.Username);
          formData.append('favorites_id', FavoriteIndex.value.sub_favorites_id);
          formData.append('article_id', tableData.value[i].article_id);
          formData.append('article_type', tableData.value[i].article_type);
          tableData.value=tableData.value.filter(item=>{
            return item.article_id!==row.article_id;
          })
          instance.post('/favorites/deleteArticle', formData)
              .then(response => {
                console.log(response.data.success);
                GetTableData();
              })
              .catch(error => {
                console.log(error.response.data);
              })
          break;
        }
      }

    }).catch(() => {
      console.log('取消')
    })
  } else {
    message = '收藏成功'
    ElMessage({
      message: message,
      type: 'success',
    });

    for (let i = 0; i < tableData.value.length; ++i) {
      if (row.article_name === tableData.value[i].article_name) {
        tableData.value[i].Favorite = !tableData.value[i].Favorite;

        //后端交互
        const formData = new FormData();
        formData.append('username', userstore.Username);
        formData.append('favorites_id', FavoriteIndex.value.sub_favorites_id);
        formData.append('article_id', tableData.value[i].article_id);
        formData.append('article_type', tableData.value[i].article_type);
        instance.post('/favorites/addArticleToFav', formData)
            .then(response => {
              console.log(response.data.success);
            })
            .catch(error => {
              console.log(error.response.data);
            })

        break;
      }
    }
  }
};

const handleMove = (row) => {
  if (row.HasMoved === true) {
    ElMessage.error('该文件已经移出');
    return;
  }
  article_id.value = row.article_id;
  article_type.value = row.article_type;
  if(props.favorites_type==='main'){
    from_favorites_id.value=FavoriteIndex.value.favorites_id;
  }
  else{
    from_favorites_id.value = FavoriteIndex.value.sub_favorites_id;
  }

  MoveDialogVisible.value = true;
}

//移除文件的时候将移动的状态改变
const handleMoveOut = () => {
  GetTableData();
}

const PushPdf = (row) => {
  openPdf(row);
}

onMounted(GetTableData);

//调整窗口宽度
watch(() => screenWidth, (val) => {
  screenWidth.value = val;
})

onMounted(() => {
  window.onresize = () => {
    return (() => {
      screenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    })()
  }
})

const cellHandleclick = (row, column, cell, event) => {
  if (column.label === '名称') {
    PushPdf(row);
  }
}

function rowStyle({rowIndex}) {
  if (rowIndex % 2 === 0) {
    return {background: 'white'}; // 灰色背景
  } else {
    return {background: 'rgba(179,247,237,0.45)'}; // 浅蓝色背景
  }
}

const SearchContent = ref('');
const isFocused = ref(false);

const SearchOperation=()=>{
  const formData=new FormData();
  formData.append('username',userstore.Username);
  formData.append('favorites_id',FavoriteIndex.value.sub_favorites_id);
  formData.append('chinese_article_name',SearchContent.value);
  formData.append('favorites_type',props.favorites_type);
  console.log('ok');
  instance.post('/favorites/searchArticle',formData)
      .then(response=>{
        console.log(response.data);
        tableData.value=response.data.data;
        // total.value=response.data.article_number;
        for(let i=0;i<tableData.value.length;++i){
          tableData.value[i]['Favorite']=true;
          tableData.value[i]['HasMoved']=false;
        }
      })
      .catch(error=>{
        console.log(error.response.data);
      })
}

function handleEnter() {
  if (isFocused.value) {
    SearchOperation();
  }
}

onMounted(() => {
  SearchContent.value = '';
})
</script>

<template>
  <div class="w-full h-full flex-wrap">
    <div class="flex w-full">
      <el-button size="large" class="mx-2 mb-2" @click="GetBack" type="success">返回</el-button>
      <div class="h-10 flex justify-center items-center mx-2">
        <p class="text-center">检索词：</p>
      </div>
      <el-input
          v-model="SearchContent"
          style="width: 240px;height:40px"
          placeholder="请输入内容"
          clearable
          size="default"
          @focus="isFocused = true" @blur="isFocused = false" @keydown.enter="handleEnter"
      />
      <el-button size="large" class="mr-2 ml-4" @Click="SearchOperation">搜索</el-button>
    </div>


    <div class="w-full mb-12">
      <el-table :data="tableData" class="w-full cursor-pointer" empty-text="没有信息" :Loading="Loading"
                @cell-click="cellHandleclick" :row-style="rowStyle" :header-cell-style="{color:'black',fontSize: '15px'}">
        <el-table-column prop="article_name" label="名称" min-width="40%"/>
        <el-table-column prop="Favorite" label="操作" min-width="10%">
          <template #default="scope">
            <el-button @click="handleFavorite(scope.row)">{{ scope.row.Favorite === true ? '取消收藏' : '收藏' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="HasMoved" label="移动" min-width="10%">
          <template #default="scope">
            <el-button @click="handleMove(scope.row)">{{ scope.row.HasMoved === false ? '移动' : '已移出' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <MoveDialog v-model:DialogVisible="MoveDialogVisible" :article_id="article_id" :from_favorites_id="from_favorites_id"
              :article_type="article_type" @handleMoveOut="handleMoveOut" :from_favorites_type="props.favorites_type"></MoveDialog>
</template>

<style scoped>
</style>
