<script setup>
const download = () => {
  const element = document.createElement('a')
  element.href = '/企业标准管理信息系统用户手册.doc'
  element.download = '企业标准管理信息系统用户手册.doc'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
</script>

<template>
  <div class="handbook">
    <h1>使用说明</h1>
    <!-- <div>修订后粘贴在此处</div> -->
    <el-card class="card" @click="download">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style="margin: 24px auto"
        width="96px"
        height="96px"
        viewBox="0 0 32 32"
      >
        <path
          fill="#283c82"
          d="M18.536 2.323v2.545c3.4.019 7.12-.035 10.521.019a.783.783 0 0 1 .912.861c.054 6.266-.013 12.89.032 19.157c-.02.4.009 1.118-.053 1.517c-.079.509-.306.607-.817.676c-.286.039-.764.034-1.045.047c-2.792-.014-5.582-.011-8.374-.01h-1.175v2.547L2 27.133V4.873z"
        />
        <path
          fill="#fff"
          d="M18.536 5.822h10.5V26.18h-10.5v-2.545h8.27v-1.272h-8.27v-1.59h8.27V19.5h-8.27v-1.59h8.27v-1.273h-8.27v-1.59h8.27v-1.273h-8.27v-1.59h8.27v-1.273h-8.27v-1.59h8.27V8.048h-8.27zm-9.963 5.621c.6-.035 1.209-.06 1.813-.092c.423 2.147.856 4.291 1.314 6.429c.359-2.208.757-4.409 1.142-6.613a57 57 0 0 0 1.905-.1c-.719 3.082-1.349 6.19-2.134 9.254c-.531.277-1.326-.013-1.956.032c-.423-2.106-.916-4.2-1.295-6.314c-.372 2.061-.856 4.094-1.282 6.136q-.916-.048-1.839-.111c-.528-2.8-1.148-5.579-1.641-8.385q.818-.038 1.635-.067c.328 2.026.7 4.043.986 6.072c.448-2.08.907-4.161 1.352-6.241"
        />
      </svg>
      <template #footer>点击下载</template>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.handbook {
  font-family: 'Times New Roman', Times, serif;
}
h1 {
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  margin: 0.5em;
}
div {
  text-align: center;
}
.card {
  width: 360px;
  margin: 54px auto;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    transform: translateY(-12px);
    color: #0000ff;
    text-decoration: underline;
  }
}
</style>
