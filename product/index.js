Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Array,
      required: true
    }
  },
  template: '#product-template',
  data() {
    return {
      selectedVariant: {},
      product: 'Longaniza de Brocolli',
      description: 'Viscosas pero sabrosas',
      details: ['Tapa dura', '487 páginas', '458gr'],
      variants: [
        {
          variantId: 2234,
          variantType: 'printed',
          img: './assets/printed-book.jpg',
          quantity: 0
        },
        {
          variantId: 2235,
          variantType: 'pdf',
          img: './assets/pdf-book.jpg',
          quantity: 10,
          onSale: false,
          default: true
        }
      ],
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.selectedVariant.quantity -= 1
      this.$emit("add-to-cart", this.selectedVariant)
    },
    removeFromCart() {
      var variantInCart = this.cart.filter(variant => variant == this.selectedVariant)
      if (variantInCart.length > 0) {
        this.selectedVariant.quantity += 1
        this.$emit("remove-from-cart", this.selectedVariant)
      }
    },
    updateProduct(variant) {
      this.selectedVariant = variant
    }
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  },
  computed: {
    inStock() {
      return this.stock > 0 ? true : false
    },
    img() {
      return this.selectedVariant.img
    },
    stock() {
      return this.selectedVariant.quantity
    },
    onSale() {
      return this.selectedVariant.onSale
    },
    shipping() {
      if (this.premium || this.selectedVariant.variantType == 'pdf') {
        return 'gratis'
      } else {
        return "$2.600"
      }
    }
  },
  created() {
    var defaultProd = this.variants.find(variant => variant.default == true)
    this.selectedVariant = defaultProd
  }
})