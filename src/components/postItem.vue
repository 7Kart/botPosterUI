<template>
  <div class="post_wrapper">
    <div class="post-content">
      <p>Question - {{post.question}}</p>
      <img :src="post.img" />
      <p>Answer</p>
    </div>
  </div>
</template>    

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.post-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  img {
    height: 100px;
  }
}
</style>