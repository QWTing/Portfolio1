/* global axios */
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";
// eslint-disable-next-line import/no-unresolved

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

// Activate the locale
const apiUrl = "https://vue3-course-api.hexschool.io/v2";

const apiPath = "neci6553";

const app = createApp({
  data() {
    return {
      cartData: {},
      products: [],
      productId: "",
      isLoadingItem: "",
      total: 0,
    };
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage,
  },
  methods: {
    getProducts() {
      axios.get(`${apiUrl}/api/${apiPath}/products/all`).then((res) => {
        this.products = res.data.products;
      });
    },
    openProductModal(id) {
      this.$refs.productModal.openModal();
      this.productId = id;
    },
    getCart() {
      axios.get(`${apiUrl}/api/${apiPath}/cart`).then((res) => {
        this.cartData = res.data.data;
      });
    },
    AddtoCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      this.isLoadingItem = id;

      axios.post(`${apiUrl}/api/${apiPath}/cart`, { data }).then((res) => {
        this.isLoadingItem = "";
        this.getCart();
      });
    },
    removeCartItem(id) {
      this.isLoadingItem = id;
      axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`).then((res) => {
        this.getCart();
        this.isLoadingItem = "";
      });
    },
    AllremoveCartItem() {
      axios.delete(`${apiUrl}/api/${apiPath}/carts`).then((res) => {
        this.getCart();
      });
    },
    UpdataCartItem(item) {
      const data = {
        product_id: item.id,
        qty: item.qty,
      };
      this.isLoadingItem = item.id;

      axios
        .put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data })
        .then((res) => {
          this.isLoadingItem = "";
          this.getCart();
        });
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
});

app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

app.component("product-modal", {
  props: ["id"],
  template: "#userProductModal",
  data() {
    return {
      modal: {},
      product: {},
      qty: 1,
    };
  },
  watch: {
    id() {
      this.getProduct();
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    getProduct() {
      axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`).then((res) => {
        this.product = res.data.product;
        console.log(this.product);
      });
    },
    AddtoCart() {
      this.$emit("addCart", this.product.id, this.qty);
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
});
app.mount("#app");

// category: "甜點"
// content: "100g"
// description: "很甜的布丁"
// id: "-MuYiXlCyIIXhmDAjJrT"
// imageUrl: "https://www.gomaji.com/blog/wp-content/uploads/2020/03/Tainan-Dessert-Banner-1024x683.jpg"
// is_enabled: 1
// num: 1
// origin_price: 100
// price: 50
// title: "布丁"
// unit: "個"
