Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: "#details-template"
})