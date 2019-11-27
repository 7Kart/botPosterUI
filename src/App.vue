<template>
  <div id="app">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">PTCBOT Corporation!</div>
          </div>
        </div>
      </div>
    </header>
    <div>
      <addPostModal v-show="showAddPostModalFlag" @close="showAddPostModal" />
      <div class="home wrapper-content wrapper-content--fixed">
        <div class="postsList">
          <post :post="post" v-for="post in posts" :key="post.id" />
        </div>
        <div class="group-controll">
          <button
            type="button"
            class="btn btnPrimary"
            @click="showAddPostModalFlag=!showAddPostModalFlag"
          >add post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import post from "@/components/postItem";
import addPostModal from "@/components/addPostModal";

export default {
  name: "home",
  components: {
    post,
    addPostModal
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          question: "here?",
          img:
            "data:image/jpeg;base64,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"
        },
        {
          id: 2,
          question: "here 2",
          img: "https://zavalov.net/wp-content/uploads/2019/06/per_man-min1.png"
        }
      ],
      showAddPostModalFlag: false
    };
  },
  mounted() {
    this.$store.dispatch("getEmoji");
  },
  methods: {
    showAddPostModal() {
      this.showAddPostModalFlag = !this.showAddPostModalFlag;
    }
  }
};
</script>


<style lang="scss">
.group-controll {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  input {
    width: 15%;
  }
}
</style>
