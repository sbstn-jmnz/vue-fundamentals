Vue.component('product-review', {
  template: "#review-template",
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
        eventBus.$emit("review-submitted", productReview)
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