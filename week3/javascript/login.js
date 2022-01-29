import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

createApp({
  data() {
    return {
      user: {
        username:'',
        password:''
      },
      success:0
    }
  },
  methods: {
    login(){
      const api = 'https://vue3-course-api.hexschool.io/v2'

      axios.post(`${api}/admin/signin`,this.user)
       .then((res) => {
         //輸入cookie資料
         const { token, expired } = res.data
         document.cookie = `hexToken=${token};expired=${new Date(expired)}; path=/`;
         this.success=0
         //轉換畫面
         document.location.href="./index.html"
       })
       .catch((err) => {
         //顯示'密碼錯誤'
         this.success=1
       })
    }
  }
}).mount('#app')