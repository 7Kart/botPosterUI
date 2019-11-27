<template>
  <div class="textAreaPopUpConteiner">
    <textarea res @blur="close" v-model="answer" @keypress.enter="close"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answer: ""
    };
  },
  
  props: {
    coords: {
      type: Object
    }
  },
  
  watch: {
    coords() {
      if (this.coords) {
        this.$el.style.left = this.coords.x + "px";
        this.$el.style.top = this.coords.y + "px";
        this.$el.children[0].focus();
      }
    }
  },
  methods: {
    close() {
      this.$emit("closeTextArea", this.answer);
    }
  }
};
</script>

<style lang="scss">
.textAreaPopUpConteiner {
  position: fixed;
  textarea: {
    resize: both;
  }
}
</style>