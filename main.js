Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `<div class="row pt-5">
  <div class="col">
    <img :src="img" alt="" class="img-thumbnail">
  </div>
  <div class="col">
    <h1>{{ product }}</h1>
    <p>{{ description }}</p>
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
    <p>{{ shipping }}</p>
    <button class="btn btn-info" :disabled="!inStock" v-on:click="addToCart">Agregar al Carro</button>
    <button class="btn btn-warning" :disabled="!inStock" v-on:click="removeFromCart">Sacar del Carro</button>
    <div>

    <h2>Reviews</h2>
    <p v-if="!reviews.length">There are no reviews yet.</p>
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
      this.$emit("add-to-cart", this.selectedVariant.variantId)
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.selectedVariant.variantId)
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
        return 'Gratis'
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
  <p v-if="errors.length">
  <b>Por favor corregir los siguientes errores:</b>
  <ul>
    <li v-for="error in errors">{{ error }}</li>
  </ul>
</p>
  <form class="form-group mt-5" @submit.prevent="onSubmit">
  <p>
    <label for="name">Nombre:</label>
    <input id="name" v-model="name" placeholder="nombre">
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>
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
    <input type="submit" value="Submit">  
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
        if (!this.name) this.errors.push("Name required.")
        if (!this.review) this.errors.push("Review required.")
        if (!this.rating) this.errors.push("Rating required.")
      }
    }

  }
})

var app = new Vue({
  el: '#app',
  data: {
    cart: [],
    premium: false
  },
  methods: {
    addToCart(id) {
      this.cart.push(id)
    },
    removeFromCart(id) {
      let index = this.cart.indexOf(id)
      if (index > -1) {
        this.cart.splice(index, 1)
      }
    }
  }
})