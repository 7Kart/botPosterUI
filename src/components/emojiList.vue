<template>
  <div class="emoji-list">
    <div class="emoji-list-container">
      <input placeholder="find emoji" v-model="emojiFilterValue" />
      <div class="emoji-container">
        <div
          :title="emoji.name"
          class="emoji-item"
          v-for="(emoji, index) in getFilteredEmogi"
          :key="index"
          @click="chooseEmoji(emoji.char)"
        >{{emoji.char}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coords: {
      type: Object
    }
  },
  data() {
    console.log("this.$store.getters.getEmoji", this.$store.getters.getEmoji);
    return {
      emojiList: this.$store.getters.getEmoji,
      emojiFilterValue: null
    };
  },
  computed: {
    getFilteredEmogi() {
      if (this.emojiFilterValue) {
        return this.emojiList.filter(emoji => {
          return (
            emoji.name
              .toLowerCase()
              .startsWith(this.emojiFilterValue.toLowerCase()) ||
            emoji.category
              .toLowerCase()
              .startsWith(this.emojiFilterValue.toLowerCase())
          );
        });
      } else {
        return this.emojiList;
      }
    }
  },
  watch: {
    coords() {
      if (this.coords) {
        this.$el.style.left = this.coords.x + "px";
        this.$el.style.top = this.coords.y + "px";
      }
    }
  },
  methods: {
    chooseEmoji(emojiName) {
      this.$emit('chooseEmoji', emojiName)
    }
  }
};
</script>

<style lang="scss">
.emoji-list {
  position: fixed;
  height: 200px;
  width: 350px;
  padding: 5px;
  background-color: white;
  input {
    padding: 5px;
    margin-bottom: 5px;
  }
}

.emoji-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 150px;
  overflow-y: scroll;
}

.emoji-item:hover {
  background-color: #106371;
}

.emoji-item {
  cursor: pointer;
}
</style>

