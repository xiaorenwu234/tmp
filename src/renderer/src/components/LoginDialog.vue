<template>
  <el-dialog
      v-model="DialogVisible"
      :title="Title"
      width="500"
      :before-close="handleClose"
  >
    <span></span>
    <template #footer>
      <el-form :model="form" label-width="auto" style="max-width: 600px" v-loading="userstore.Loading">
        <el-form-item label="用户名">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"/>
        </el-form-item>
        <el-form-item label="确认密码" v-if="Mode===1">
          <el-input v-model="form.repeat_password" type="password"/>
        </el-form-item>
        <el-form-item>
          <div class="mx-auto">
            <el-button type="primary" @click="onSubmit">{{ Title }}</el-button>
            <el-button @click="CloseDialog">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="fixed right-0 bottom-0 z-50">注册</div>
    </template>
  </el-dialog>
</template>

<script setup>
import {ElMessageBox} from 'element-plus'
import {computed, reactive, ref} from "vue";
import {PasswordStore} from '@/stores/password';
import {UserStore} from '@/stores/User';
import instance, {setAuthToken} from "@/apis/axios.js";
import {OpenNotification} from "@/js/Notification.js";

const userstore = UserStore();
const passwordstore = PasswordStore();
const DialogVisible = defineModel('DialogVisible')
const Mode = ref(0);  //登录或注册状态
const Title = computed(() => Mode.value === 0 ? '登录' : '修改密码')


const form = reactive({
  username: '',
  password: '',
  repeat_password: '',
})

const handleClose = () => {
  userstore.Loading = false;
  ElMessageBox.confirm(
      '是否要关闭登录界面',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    DialogVisible.value = false;
  }).catch(() => {
    console.log('取消')
  })
}

const CloseDialog = () => {
  DialogVisible.value = false;
}

//校验登录
function Check_Key(password, username, key) {
  userstore.Loading = true;
  const form_data = new FormData();
  form_data.append("username", username);
  form_data.append("password", password);
  form_data.append("key", key);
  instance.post('/users/login', form_data)
      .then(request => {
        userstore.Loading = false;
        if (request.data.success === true) {
          userstore.token = request.data.token;
          userstore.State = true;
          userstore.Username = form.username;
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          localStorage.setItem('key', key);
          setAuthToken(userstore.token);
          OpenNotification('登录成功', '');
          CloseDialog();
        } else {
          OpenNotification('登录失败', '用户名或密码错误');
        }
      })
      .catch(error => {
        console.log(error.response.data);
        return false;
      })
}

//提交表单
const onSubmit = () => {
  let key = passwordstore.generate_key(16);
  let tmp_password = passwordstore.encrypt(form.password, key);  //加密后的字符串
  Check_Key(tmp_password, form.username, key);
}
</script>

