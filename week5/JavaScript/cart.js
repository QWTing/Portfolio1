import ProductModal from "./ProductModal.js";

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

loadLocaleFromURL(
  "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);

configure({
  // 用來做一些設定
  generateMessage: localize("zh_TW"), // 啟用 locale
});

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "neci6553";
const Url = `${apiUrl}/api/${apiPath}/`;
Vue.createApp({
  data() {
    return {
      loadingItem: "",
      products: [],
      productID: "",
      cart: {},
    };
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage,
  },
  methods: {
    getProduct() {
      axios.get(`${Url}products/all`).then((res) => {
        this.products = res.data.products;
      });
    },
    getCart() {
      axios.get(`${Url}cart`).then((res) => {
        this.cart = res.data.data;
        this.getProduct();
      });
    },
    openProductModal(id) {
      this.productID = id;
      this.$refs.productModal.openModal();
    },
    updataCart(item) {
      this.loadingItem = item.id;
      const data = {
        product_id: item.product_id,
        qty: item.qty,
      };
      axios.put(`${Url}cart/${item.id}`, { data }).then((res) => {
        this.loadingItem = "";
        this.getCart();
      });
    },
    removeCart(item) {
      this.loadingItem = item.id;
      axios.delete(`${Url}cart/${item.id}`).then((res) => {
        this.loadingItem = "";
        this.getCart();
      });
    },
    addToCart(id, qty = 1) {
      this.loadingItem = id;
      const data = {
        product_id: id,
        qty,
      };
      axios.post(`${Url}cart`, { data }).then((res) => {
        this.loadingItem = "";
        this.getCart();
      });
    },
    allremoveCart() {
      if (!(this.cart = {})) {
        this.loadingItem = "allremove";
        axios.delete(`${Url}carts`).then((res) => {
          this.getCart();
          this.loadingItem = "";
        });
      }
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
  },
  mounted() {
    this.getProduct();
    this.getCart();
  },
})
  .component("ProductModal", ProductModal)
  .mount("#app");
