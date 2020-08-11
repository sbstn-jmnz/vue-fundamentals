Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true
    },
    shipping: {
      type: String,
      required: true
    },
    details: {
      type: Array,
      required: true
    }
  },
  template: "#tabs-template",
  data() {
    return {
      tabs: ['Reviews', 'Hacer review', 'Envío', 'Detalles'],
      selectedTab: 'Reviews'
    }
  }
})