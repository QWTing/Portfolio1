export default {
  template: "#userProductModal",
  props: ["id"],
  data() {
    return {
      modal: "",
      Product: {},
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
    hideModel() {
      this.modal.hide();
    },
    getProduct() {
      const apiUrl = "https://vue3-course-api.hexschool.io/v2";
      const apiPath = "neci6553";
      const Url = `${apiUrl}/api/${apiPath}/`;
      axios.get(`${Url}product/${this.id}`).then((res) => {
        this.Product = res.data.product;
      });
    },
    addtoCart() {
      this.$emit("addCart", this.Product.id, this.qty);
      console.log(1, this.Product.id, this.qty);
      // this.hideModel();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
};

// category: "測試分類"
// content: "測試的說明"
// description: "測試的描述"
// id: "-MwC-s0S4KcVVfTd9-A5"
// imageUrl: "https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=1352&q=80"
// imagesUrl: (5) ['https://images.unsplash.com/photo-1516627145497-ae…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80', 'https://images.unsplash.com/photo-1587300003388-59…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', 'https://images.unsplash.com/photo-1517331156700-3c…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1948&q=80', 'https://images.unsplash.com/photo-1617093727343-37…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', 'https://images.unsplash.com/photo-1511914265872-c4…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80']
// is_enabled: 1
// origin_price: 500
// price: 500
// title: "測試的產品"
// unit: "單位"
