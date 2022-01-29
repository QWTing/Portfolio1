import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

createApp({
  data() {
    return {
      api:'https://vue3-course-api.hexschool.io/v2',
      apipath:'necy6553',
      products:[],
      product:{
        imagesUrl: [],
      },
      isNew:false,
      productModal:null,
      delProductModal:null,
      NewimgUrl:'',
      Url:true
    }
  },
  methods: {
    //檢查是否登入
    chicklogin(){
      axios.post(`${this.api}/api/user/check`)
        .then((res) => {
          this.getData()
        })
        .catch((err) => {
          window.location = 'login.html'
        })
    },
    //取得資料
    getData(){
      axios.get(`${this.api}/api/${this.apipath}/admin/products`)
        .then((res) => {
          this.products = res.data.products
          console.log(this.products)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //取得單一產品資料
    detaildata(item){
      this.product = item
    },
    updateData(){
      if(this.isNew){
        axios.post(`${this.api}/api/${this.apipath}/admin/product`,{ data : this.product })
          .then((res) => {
            alert(res.data.message)
            this.productModal.hide()
            this.getData()
          })
          .catch((err) => {
            console.log(err)
          }) 
      }else if(!this.isNew){
        axios.put(`${this.api}/api/${this.apipath}/admin/product/${this.product.id}`,{ data : this.product })
          .then((res) => {
            this.productModal.hide()
            this.getData()
            alert(res.data.message)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    delData(){
      axios.delete(`${this.api}/api/${this.apipath}/admin/product/${this.product.id}`)
        .then((res) => {
          alert(res.data.message)
          this.getData()
          this.delProductModal.hide()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    openModal(isNew ,item){
      if(isNew === 'New'){
        this.productModal.show()
        this.isNew = true
        this.product = {}
      }
      else if(isNew === 'edit'){
        this.productModal.show()
        this.isNew = false
        this.product = {...item}
        console.log(this.product)
      }
      else if(isNew === 'delete'){
        this.delProductModal.show()
        this.product = {...item}
      }
    },
    AppImg(item){
      if(item === 'New'){
        this.product.imagesUrl=[]
        this.product.imagesUrl.push('')
        console.log(product.imagesUrl[product.imagesUrl.length - 1])
      }
      if(item === 'app'){
        this.product.imagesUrl.push('')
      }
      if(item === 'cancel'){
        this.product.imagesUrl.pop('')
      }
    }
  },
  mounted(){
    //啟用為新增或是修改互動視窗
    this.productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    })
    //啟用為刪除互動視窗
    this.delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    })
    //讀取token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    //檢查是否登入
    this.chicklogin()
  }
}).mount('#app')

// category: "蛋糕"
// content: "尺寸：6寸"
// description: "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！"
// id: "-MtrQSpirscy7ys3TEnl"
// imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80"
// imagesUrl: ['https://images.unsplash.com/photo-1618888007540-2b…x8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80']
// is_enabled: 16
// num: 1
// origin_price: 1000
// price: 900
// title: "蜂蜜檸檬蛋糕"
// unit: "個"