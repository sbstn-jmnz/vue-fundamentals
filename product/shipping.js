Vue.component('product-shipping', {
  props: {
    shipping: {
      type: String,
      required: true
    }
  },
  template: "#shipping-template"
})