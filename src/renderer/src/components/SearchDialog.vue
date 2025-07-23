<template>
  <el-dialog
      v-model="DialogVisible"
      :title="Title"
      width="370"
      :before-close="handleClose"
  >
    <span></span>
    <template #footer>
      <el-form :model="form" label-width="auto" style="max-width: 300px">
        <el-form-item label="标准编号">
          <el-input v-model="form.Standard_Num" :disabled="props.Mode===1" @focus="isFocused=true" @blur="isFocused=false" @keydown.enter="handleEnter"/>
        </el-form-item>
        <el-form-item label="颁发单位">
          <el-input v-model="form.Firm" :disabled="props.Mode===0" @focus="isFocused=true" @blur="isFocused=false" @keydown.enter="handleEnter"/>
        </el-form-item>
        <el-form-item label="颁发日期">
          <el-input v-model="form.Get_Date" :disabled="props.Mode===0" placeholder="请输入年代：如2024" @focus="isFocused=true" @blur="isFocused=false" @keydown.enter="handleEnter"/>
        </el-form-item>
        <el-form-item label="标准中文名称">
          <el-input v-model="form.Standard_Name_In_Chinese" @focus="isFocused=true" @blur="isFocused=false" @keydown.enter="handleEnter"/>
        </el-form-item>
        <el-form-item label="标准英文名称">
          <el-input v-model="form.Standard_Name_In_English" :disabled="props.Mode===1" @focus="isFocused=true" @blur="isFocused=false" @keydown.enter="handleEnter"/>
        </el-form-item>
        <el-form-item>
          <div class="mx-auto">
            <el-button type="primary" @click="onSubmit">检索</el-button>
            <el-button type="info" @click="Refresh_Form">重置</el-button>
            <el-button @click="DialogVisible=false">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="fixed right-0 bottom-0 z-50">注册</div>
    </template>
  </el-dialog>
</template>

<script setup>
import {ElMessageBox} from 'element-plus'
import { reactive, ref } from 'vue'
import instance from "@/apis/axios.js";
import {UserStore} from "@/stores/User.js";
import {SearchFormStore} from "@/stores/SearchForm.js";
import {OpenNotification} from "@/js/Notification.js";

const userstore = UserStore();
const DialogVisible = defineModel('DialogVisible')
const Title = '高级检索'


const props = defineProps({
  article_type: String,
  Mode: Number
})

const form = reactive({
  Standard_Num: '',
  Firm: '',
  Get_Date: '',
  Standard_Name_In_Chinese: '',
  Standard_Name_In_English: '',
})

//重置表单内容
const Refresh_Form = () => {
  form.Standard_Name_In_English = '';
  form.Standard_Name_In_Chinese = '';
  form.Get_Date = '';
  form.Standard_Num = '';
  form.Firm = '';
}

const tableData = defineModel('tableData');
const total = defineModel('total');
const pageSize = defineModel('pageSize');
const currentPage = defineModel('currentPage');

const handleClose = () => {
  ElMessageBox.confirm(
      '是否要关闭高级检索界面',
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


const searchformstore = SearchFormStore();

const RefreshSearchStore = () => {
  searchformstore.form.Firm = form.Firm;
  searchformstore.form.Get_Date = form.Get_Date;
  searchformstore.form.Standard_Name_In_Chinese = form.Standard_Name_In_Chinese;
  searchformstore.form.Standard_Name_In_English = form.Standard_Name_In_English;
  searchformstore.form.Standard_Num = form.Standard_Num;
  searchformstore.Mode = 1;
}

//搜索
const onSubmit = () => {
  let search_tables = props.article_type;
  RefreshSearchStore();
  searchformstore.searchTable=props.article_type;

  instance.get('/search/AdvancedSearch', {
    params: {
      page_id: currentPage.value,
      page_num: pageSize.value,
      username: userstore.Username,
      search_tables: search_tables.toString(),
      standard_number: searchformstore.form.Standard_Num,
      chinese_name: searchformstore.form.Standard_Name_In_Chinese,
      english_name: searchformstore.form.Standard_Name_In_English,
      issuing_body: searchformstore.form.Firm,
      issue_date: searchformstore.form.Get_Date,
    }
  })
      .then(response => {
        total.value = response.data.len;
        tableData.value = response.data.data;
        OpenNotification('搜索完成','');
        DialogVisible.value=false;
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const isFocused = ref(false);

function handleEnter() {
  if (isFocused.value) {
    onSubmit();
  }
}
</script>

