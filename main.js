
var eventBus = new Vue()
var app = new Vue({
  el: '#app',
  data: {
    cart: [],
    premium: true,
    showStyle: {
      display: "block",
      "padding-right": "16px",
      "padding-top": "20px"
    },
    displayCart: false
  },
  methods: {
    addToCart(variant) {
      this.cart.push(variant)
    },
    removeFromCart(variant) {
      let index = this.cart.indexOf(variant)
      if (index > -1) {
        this.cart.splice(index, 1)
      }
    }
  },
  computed: {
    modalStyle() {
      if (this.displayCart) {
        return this.showStyle
      } else {
        return {}
      }
    }
  }
})