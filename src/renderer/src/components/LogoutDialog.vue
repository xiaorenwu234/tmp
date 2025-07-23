<script setup>
import {ElMessageBox, ElNotification} from 'element-plus'
import {computed, h, ref} from "vue";
import {UserStore} from '@/stores/User';
import {OpenNotification} from "@/js/Notification.js";
import router from "@/router/index.js";

const userstore = UserStore();
const DialogVisible = defineModel('DialogVisible')
const Mode = ref(0);  //登录或注册状态
const Title = computed(() => Mode.value === 0 ? '登录' : '修改密码')

const handleClose = () => {
  userstore.Loading = false;
  ElMessageBox.confirm(
      '是否要注销',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    console.log('确认')
    OpenNotification('注销成功', '');
    userstore.State = false;
    userstore.Username = '';
    DialogVisible.value = false;
    router.push('/');
  }).catch(() => {
    console.log('取消')
  })
}


//注销操作
const onLogout = () => {
  handleClose();
}
</script>

<template>
  <el-dialog
      v-model="DialogVisible"
      width="500"
  >
    <span></span>
    <template #footer>
      <el-form label-width="auto" style="max-width: 600px" v-loading="userstore.Loading">
        <el-form-item>
          <div class="flex w-full">
            <div class="mx-auto text-xl">
              当前用户：{{ userstore.Username }}
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="mx-auto">
            <el-button type="primary" @click="onLogout">退出登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>