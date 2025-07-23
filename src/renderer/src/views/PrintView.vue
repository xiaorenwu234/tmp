<template>
  <div id="print-form">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="打印机">
        <el-select v-model="form.deviceName" default-first-option="true" placeholder="未检测到打印机">
          <el-option
            v-for="i in printerInfo"
            :label="i.displayName"
            :value="i.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="纸张大小">
        <el-select v-model="form.pageSize" placeholder="please select your zone">
          <el-option
            v-for="i in ['A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid']"
            :label="i"
            :value="i"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="单面/双面">
        <el-select v-model="form.duplexMode" placeholder="please select your zone">
          <el-option label="单面" value="simplex" />
          <el-option label="双面长边翻页" value="longEdge" />
          <el-option label="双面短边翻页" value="shortEdge" />
        </el-select>
      </el-form-item>
      <el-form-item label="彩色">
        <el-switch v-model="form.color" />
      </el-form-item>
      <el-form-item label="横向">
        <el-switch v-model="form.landscape" />
      </el-form-item>
      <el-form-item label="打印份数">
        <el-input v-model.number="form.copies" type="number" min="1" />
      </el-form-item>
      <!-- <el-form-item label="页面范围">
        <el-input v-model="form.pageRanges" placeholder="格式：1-3,5,7-9" />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, Ref } from 'vue'

type PrinterInfo = {
  name: string, // 操作系统理解的打印机名称。
  displayName: string // 打印预览中显示的打印机名称。
  description: string // 任务描述。
  status: number, // 打印机的当前状态。
  isDefault: boolean, // 是否将此的打印机设置为操作系统的默认打印机。
  options: object, // 包含不同数量的平台打印机信息的对象。
}

let printerInfo = ref<PrinterInfo[]>()

onMounted(async () => {
  printerInfo.value = await window.electronAPI.getPrinters()
  form.deviceName = printerInfo.value[0].name
  document.title = '打印选项'
})

// do not use same name with ref
const form = reactive<{
  deviceName?: string, // Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
  color: boolean, // Set whether the printed web page will be in color or grayscale.
  landscape: boolean, // Whether the web page should be printed in landscape mode.
  // pagesPerSheet: number, // The number of pages to print per page sheet.
  copies: number, // The number of copies of the web page to print.
  // pageRanges: string, // 要打印的页面范围。 在macOS上，只有数组的第一个值被信任。
  duplexMode: 'simplex' | 'shortEdge' | 'longEdge', // Set the duplex mode of the printed web page. 可以是 simplex、shortEdge 或 longEdge。
  pageSize: 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'Legal' | 'Letter' | 'Tabloid'
}>({
  color: true,
  landscape: false,
  copies: 1,
  // pageRanges: '',
  duplexMode: 'simplex',
  pageSize: 'A4'
  // deviceName string (optional) - Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
})

const parsePageRanges = (str: string) => {
  return str.split(',').map((range) => {
    const [from, to] = range.split('-').map(Number)
    if (isNaN(from)) {
      throw new Error(`Invalid range: ${range}`)
    }
    return {
      from: from - 1, // Convert to 0-based index
      to: (isNaN(to) ? from : to) - 1 // If 'to' is undefined, use 'from'
    }
  })
}

const onSubmit = () => {
  let arg = {
    silent: true,
    margins: {
      marginType: 'none'
    }
  }
  for (let key in form) {
    if (form[key] !== '') {
      arg[key] = form[key]
    }
  }
  // if (arg.hasOwnProperty('pageRanges')) {
  //   arg['pageRanges'] = parsePageRanges(arg['pageRanges'])
  // }
  window.electronAPI.printOption(arg)
  window.close()
}
</script>

<style lang="scss" scoped>
#print-form {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;

  button {
    margin: 0 auto;
  }
}
</style>
