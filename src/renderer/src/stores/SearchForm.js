import {defineStore} from "pinia";
import {ref} from "vue";


export const SearchFormStore = defineStore('searchform',()=>{
    const form = ref({
        Standard_Num: '',
        Firm: '',
        Get_Date: '',
        Standard_Name_In_Chinese: '',
        Standard_Name_In_English: '',
        type:'',
    })

    const searchTable=ref([]);

    //状态，0代表普通搜索，1代表高级搜索
    const Mode=ref(0);

    return{
        form,
        Mode,
        searchTable
    }
})