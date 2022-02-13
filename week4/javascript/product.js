// 產品資料格式
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
import pagination from './pagination.js';

let productModal = {}
let delProductModal = {}

const app = createApp({
  components :{
    pagination
  },
  data(){
    return {
      user:{
        api:'https://vue3-course-api.hexschool.io/v2/',
        apipath:'necy6553'
      },
      products:[],
      tempproduct:{
        imagesUrl:[]
      },
      pagination:{},
      isNew:false
    }
  },
  methods:{
    checkLogin(){
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      axios.defaults.headers.common['Authorization'] = token;

      axios.post(`${this.user.api}api/user/check`)
        .then((res) => {
          this.getData()
        })
        .catch((err) => {
          document.location = './index.html'
        })
    },
    getData(page = 1){
      //query
      axios.get(`${this.user.api}api/${this.user.apipath}/admin/products/?page=${page}`)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch((err) => {
        })
    },
    setmodel(){
      productModal = new bootstrap.Modal(document.getElementById('productModal'), {
        keyboard: false
      })
      delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
        keyboard: false
      })
    },
    openmodel(status , product){
      if(status == 'New'){
        this.tempproduct= {
          imagesUrl:[]
        }
        productModal.show(),
        this.isNew = true
      }
      else if (status == 'edit'){
        productModal.show()
        this.tempproduct = {...product}
        this.isNew = false
      }
      else if (status == 'delete'){
        delProductModal.show()
        this.tempproduct = {...product}
      }
    },
    updataProduct(){
      let Url =''
      let motheds =''
      if(this.isNew){
        Url = `${this.user.api}api/${this.user.apipath}/admin/product`
        motheds = 'post'
      }else if(!this.isNew){
        Url = `${this.user.api}api/${this.user.apipath}/admin/product/${this.tempproduct.id}`
        motheds = 'put'
      }
      axios[motheds](Url,{ data : this.tempproduct })
        .then((res) => {
          productModal.hide()
          this.getData()
        })
        .catch((err) => {
        })
    },
    deleteProduct() {
      let Url = `${this.user.api}api/${this.user.apipath}/admin/product/${this.tempproduct.id}`
      let motheds = 'delete'
      axios[motheds](Url,{ data : this.tempproduct })
        .then((res) => {
          delProductModal.hide()
          this.getData()
        })
    }
    
  },
  mounted(){
    this.checkLogin() 
    this.setmodel()
  }
})

app.component('productModal',{
  data(){
    return{
      api:'https://vue3-course-api.hexschool.io/v2/',
      apipath:'necy6553'
    }
  },
  props:['tempproduct'],
  template: '#templatefForProductModal',
  methods:{
    updataProduct(){
      let Url =''
      let motheds =''
      if(this.isNew){
        Url = `${this.api}api/${this.apipath}/admin/product`
        motheds = 'post'
      }else if(!this.isNew){
        Url = `${this.api}api/${this.apipath}/admin/product/${this.tempproduct.id}`
        motheds = 'put'
      }
      axios[motheds](Url,{ data : this.tempproduct })
        .then((res) => {
          productModal.hide()
          this.$emit('getData')
        })
        .catch((err) => {
        })
    },
  }
})

app.mount('#app')
