//显示弹出的消息提醒框
import {ElNotification} from "element-plus";
import {h} from "vue";

export const OpenNotification = (title, message) => {
    ElNotification({
        title: title,
        message: h('i', {style: 'color: teal'}, message),
        duration: 2000,
    })
}