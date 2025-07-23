import {defineStore} from "pinia";
import {ref} from "vue";

export const UserStore = defineStore('user', () => {
    const State = ref(false); //是否登录
    const Password = ref('');  //密码
    const Username = ref(''); //用户名
    const Key = ref('');  //密钥
    const Loading = ref(false)  //是否需要显示加载动画
    const token = ref('') //token
    const HasTryLogin=ref('');
    const role=ref('');

    return {
        State,
        Password,
        Username,
        Key,
        Loading,
        token,
        HasTryLogin,
        role,
    }


})