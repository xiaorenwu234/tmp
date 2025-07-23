<script setup>
import { ref, onMounted } from 'vue'
import { PasswordStore } from '@/stores/password'
import { UserStore } from '@/stores/User'
import instance, { setAuthToken } from '@/apis/axios.js'
import { OpenNotification } from '@/js/Notification.js'
import router from '@/router/index.js'

const userstore = UserStore()
const passwordstore = PasswordStore()

// const form = reactive({
//   username: '',
//   password: '',
//   repeat_password: ''
// })

const username = ref('')
const password = ref('')
let useStoredPassword = false

//校验登录
function Check_Key(password, username, key) {
  userstore.Loading = true
  const form_data = new FormData()
  form_data.append('username', username)
  form_data.append('password', password)
  form_data.append('key', key)
  instance
    .post('/users/login', form_data)
    .then((request) => {
      userstore.Loading = false
      if (request.data.success === true) {
        userstore.token = request.data.token
        userstore.State = true
        userstore.Username = username
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        localStorage.setItem('key', key)
        setAuthToken(userstore.token)
        OpenNotification('登录成功', '')
        router.push('/home')
      } else {
        OpenNotification('登录失败', '用户名或密码错误')
      }
    })
    .catch((error) => {
      console.log(error.response.data)
      return false
    })
}

//提交表单
const onSubmit = () => {
  if (username.value === '') {
    OpenNotification('登录失败', '请输入用户名')
    return
  }
  if (password.value === '') {
    OpenNotification('登录失败', '请输入密码')
    return
  }
  if (useStoredPassword) {
    let _username = localStorage.getItem('username')
    let _password = localStorage.getItem('password')
    let _key = localStorage.getItem('key')
    Check_Key(_password, _username, _key)
  } else {
    let key = passwordstore.generate_key(16)
    let tmp_password = passwordstore.encrypt(password.value, key) //加密后的字符串
    console.log(tmp_password)
    console.log(key)
    Check_Key(tmp_password, username.value, key)
  }
}

const handleFocus = () => {
  if (useStoredPassword) {
    useStoredPassword = false
    password.value = ''
  }
}

onMounted(() => {
  username.value = localStorage.getItem('username')
  password.value = localStorage.getItem('password')
  const key = localStorage.getItem('key')
  if (username.value && password.value && key) {
    useStoredPassword = true
    password.value = '··········'
  }
})
</script>

<template>
  <div class="w-screen h-screen flex use_font">
    <img
      src="../components/backgrounds/LoginBackground.jpg"
      class="fixed top-0 left-0 h-screen"
      alt="背景图片"
    />
    <div
      class="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white border-2 mx-auto my-auto z-10"
      style="width: 400px"
    >
      <div class="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
        欢迎来到
        <span class="bg-gradient-to-r from-[#0F766E] to-[#20A848] bg-clip-text text-transparent"
          >企业标准管理信息系统</span
        >
      </div>
      <div class="text-sm font-normal mb-4 text-center text-[#1e0e4b]">登录以使用</div>
      <form class="flex flex-col gap-3">
        <div class="block relative">
          <label
            for="email"
            class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
            >用户名</label
          >
          <input
            type="text"
            v-model="username"
            id="email"
            class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
        </div>
        <div class="block relative">
          <label
            for="password"
            class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
            >密码</label
          >
          <div class="relative">
            <input
              type="text"
              id="password"
              v-model="password"
              @focus="handleFocus"
              class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
            />
          </div>
        </div>
      </form>
      <button
        type="submit"
        class="bg-teal-700 w-max mx-auto my-4 px-6 py-2 rounded text-white text-sm font-normal"
        @click="onSubmit"
      >
        登 录
      </button>
    </div>
  </div>
</template>

<style scoped></style>
