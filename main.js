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
  template: `<div class="row pt-5">
  <div class="col-12 col-md-6">
    <img :src="img" alt="" class="img-thumbnail">
  </div>
  <div class="col-12 col-md-6">
    <h1>{{ product }}</h1>
    <p>{{ description }}</p>
    <p>Stock: {{ stock }}</p>
    <p v-if="stock > 10" :class="">In Stock</p>
    <p v-else-if="stock <=10 && stock > 0">Quedan muy pocos</p>
    <p v-else>Out of Stock</p>
    <ul>
      <li v-for='detail in details'> {{ detail }}</li>
    </ul>
    <div class="input-group mb-3">
    <div class="input-group-prepend">
      <label class="input-group-text" for="inputGroupSelect01">Variante</label>
    </div>
    <select class="custom-select" id="inputGroupSelect01" v-model="selectedVariant">
      <option v-for="variant in variants" :value="variant":key="variant.variantId">{{variant.variantType}}</option>
    </select>
    </div>
    <a :href="link">Ver detalle</a>
    <p>Envío: {{ shipping }}</p>
    <button class="btn btn-info" :disabled="!inStock" v-on:click="addToCart">Agregar al Carro</button>
    <button class="btn btn-warning" v-on:click="removeFromCart">Sacar del Carro</button>
    
    <div class="mt-5">
    <h2>Reviews</h2>
    <p v-if="!reviews.length">Aún no hay reviews.</p>
    <ul>
      <li v-for="review in reviews">
      <p>{{ review.name }}</p>
      <p>Rating: {{ review.rating }}</p>
      <p>{{ review.review }}</p>
      </li>
    </ul>
   </div>
    <product-review @review-submitted="addReview"></product-review>
    </div>
</div>`,
  data() {
    return {
      selectedVariant: {},
      product: 'Longaniza de Brocolli',
      description: 'Viscosas pero sabrosas',
      link: './printed_book.html',
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
    },
    addReview(productReview) {
      this.reviews.push(productReview)
    }
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

Vue.component('product-review', {
  template: `
  <div>
  <div v-if="errors.length" class="alert alert-warning  alert-dismissible" role="alert">
  <p>
  <b>Por favor corregir los siguientes errores:</b>
  <ul>
    <li v-for="error in errors">{{ error }}</li>
  </ul>
  </p>
  <button type="button" @click="errors = []" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  </div>
  <h4>Agregar Review</h4>
  <form class="form-group mt-2" @submit.prevent="onSubmit">
  <p>
    <label for="name">Nombre:</label>
    <input id="name" v-model="name" placeholder="Nombre" class="form-control">
  </p>
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review" class="form-control" placeholder="Review"></textarea>
  </p>
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>
  <p>
    <input type="submit" class="btn btn-warning" value="Enviar">  
  </p>    
</form>
</div>`,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }
        this.$emit("review-submitted", productReview)
        this.name = null,
          this.review = null,
          this.rating = null
      } else {
        if (!this.name) this.errors.push("El nombre es requerido.")
        if (!this.review) this.errors.push("El contenido de review no puede estar vacío.")
        if (!this.rating) this.errors.push("Debes entregar un valor para el rating.")
      }
    }

  }
})



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