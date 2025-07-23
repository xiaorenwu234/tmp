<template>
  <div class="common-layout w-full h-full">
    <el-container class="w-full h-full use_font">
      <el-header style="padding: 0">
        <!-- <div class="w-full h-full flex bg-gradient-to-r from-[#149C91] to-green-500"> -->
        <div class="w-full h-full flex">
          <div class="h-full text-white">
            <div class="text-2xl flex h-full ml-4 mr-6 use_font">
              <div class="my-auto">企业标准化管理信息系统</div>
            </div>
          </div>
          <div class="flex-1 text-white flex">
            <div class="mx-4 my-auto">访客总量：{{ Math.floor(outputValue1) }}</div>
            <!--            <el-statistic title="访客总量" class="mx-4 my-auto text-white" style="color:white" :value="outputValue" />-->
            <div class="mx-4 my-auto">日访问量：{{ Math.floor(outputValue2) }}</div>
          </div>
<!--          <div class="w-20 flex pr-4">-->
<!--            <div-->
<!--              class="m-auto text-white hover:text-gray-500 transition-colors duration-400"-->
<!--              @click="Logout"-->
<!--            >-->
<!--              退出登录-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </el-header>
      <!-- <div class="date-bar">
        <div class="date">日期：{{ Date.now() }}</div>
      </div> -->
      <el-container>
        <el-aside width="200px">
          <Navicat v-model:index="index"></Navicat>
        </el-aside>
        <el-container>
          <el-main style="padding-top: 10px">
            <MainFrame v-model:index="index"></MainFrame>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <LoginDialog v-model:DialogVisible="ShowLogin" v-if="userstore.State === false"></LoginDialog>
    <LogoutDialog v-model:DialogVisible="ShowLogin" v-if="userstore.State === true"></LogoutDialog>
  </div>
</template>

<script setup>
import MainFrame from '@/views/Frames/MainFrame.vue'
import Navicat from '@/components/Navicat.vue'
import { UserStore } from '../stores/User.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import LoginDialog from '@/components/LoginDialog.vue'
import LogoutDialog from '@/components/LogoutDialog.vue'
import instance, { setAuthToken } from '@/apis/axios.js'
import { OpenNotification } from '@/js/Notification.js'
import { useTransition } from '@vueuse/core'
import { ElMessageBox } from 'element-plus'
import router from '@/router/index.js'

const userstore = UserStore()
const { State, Username } = storeToRefs(userstore)
const ShowLogin = ref(false) //是否要展示登录对话框
const index = ref(0)

//统计访问量
const CountViewers = ref(0)
const CountViewers2 = ref(0)

const outputValue1 = useTransition(CountViewers, {
  duration: 1500
})

const outputValue2 = useTransition(CountViewers2, {
  duration: 1500
})

const ActivateLogin = () => {
  ShowLogin.value = true
}

const Logout = () => {
  ElMessageBox.confirm('是否要退出登录', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      console.log('确认')
      OpenNotification('退出登录成功', '')
      userstore.State = false
      userstore.Username = ''
      router.push('/')
    })
    .catch(() => {
      console.log('取消')
    })
}

//获取访问量
onMounted(() => {
  instance
    .get('/users/get-visit')
    .then((response) => {
      console.log(response.data)
      CountViewers.value = response.data.visit_count
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  instance
    .get('/users/get-daily-visit')
    .then((response) => {
      console.log(response.data)
      CountViewers2.value = response.data.visit_count
    })
    .catch((error) => {
      console.log(error)
    })
})

// onMounted(()=>{
//   const form_data=new FormData();
//   let username=localStorage.getItem("username");
//   let password=localStorage.getItem("password");
//   let key=localStorage.getItem("key");
//
//   form_data.append("username", username);
//   form_data.append("password", password);
//   form_data.append("key", key);
//
//   instance.post('/users/login', form_data)
//       .then(request => {
//         userstore.Loading = false;
//         if (request.data.success === true) {
//           userstore.token = request.data.token;
//           userstore.State = true;
//           userstore.Username = username;
//           userstore.role=request.data.role;
//           setAuthToken(userstore.token);
//           OpenNotification('自动登录成功', '');
//           CloseDialog();
//         } else {
//           OpenNotification('自动登录失败', '请手动输入密码');
//         }
//         userstore.HasTryLogin=true;
//       })
//       .catch(error => {
//         console.log(error.response.data);
//         return false;
//       })
// })
</script>

<style scoped>
.use_font {
  font-family: 'TsangerYuYangT_W03_W03', sans-serif;
}
.el-header {
  background-image: url('/header.png');
  /* background-size: cover; */
  /* background-size: auto 100%;
  background-color: #46a79f;
  background-repeat: no-repeat; */

  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-shadow: 6px 0px 6px grey;
}
.date-bar {
  border-bottom: 1px solid var(--el-border-color);
}
.date {
  width: 100%;
  height: 30px;
  line-height: 30px;
}
</style>
