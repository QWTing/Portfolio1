import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js'

const app = createApp({
  data(){
    return {
      user:{
        username:'',
        password:'',
      }
    }
  },
  methods:{
    login(){
      const url = 'https://vue3-course-api.hexschool.io/v2/'
      axios.post(`${url}admin/signin`,this.user)
        .then((res) => {
          alert(res.data.message)
          const {token,expired} = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          window.location = './product.html'
        })
        .catch((err) => {
          alert(err.data.error.message)
        })
    }
  }
})

app.mount('#app')