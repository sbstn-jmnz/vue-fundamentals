var app = new Vue({
  el: '#app',
  data: {
    img: './assets/printed-book.jpg',
    product: 'Longaniza de Brocolli',
    description: 'Viscosas pero sabrosas',
    link: './printed_book.html',
    stock: 100,
    onSale: true,
    details: ['Tapa dura', '487 páginas', '458gr'],
    variants: [
      {
        variantId: 2234,
        variantType: 'printed',
        img: './assets/printed-book.jpg'
      },
      {
        variantId: 2235,
        variantType: 'pdf',
        img: './assets/pdf-book.jpg'
      }
    ],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1
      }
    },
    updateImg(img) {
      this.img = img
    }
  },
  computed: {
    inStock() {
      return this.stock > 0 ? true : false
    }
  }

})