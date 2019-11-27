<template>
  <div class="keyboard">
    <button class="btn btnPrimary addRowButton" @click="addRow">add keyboard row</button>
    <div class="keyboard-row" v-for="(keyboard, index) in keyboards" :key="index">
      <button class="btn btnDefault mini" @click="addColumn(index)">+</button>
      <div>
        <keyboardKey
          :keyData="column"
          v-for="(column, index) in keyboard"
          :key="index"
          class="answer-button"
        >{{column.char}}</keyboardKey>
      </div>
    </div>
  </div>
</template>
<script>
import keyboardKey from "@/components/keyboardKey";

export default {
  components: {
    keyboardKey
  },
  data() {
    return {
      keyboards: this.$store.getters.getKeyBoars
    };
  },
  methods: {
    addRow() {
      this.$store.dispatch("addKeyBoardRow");
    },
    addColumn(rowIndex) {
      this.$store.dispatch("addKey", {
        keyboardRowIndex: rowIndex,
        keyValue: {
          text: "",
          answer: ""
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mini {
  padding: 0;
  margin: 5px;
}

.addRowButton{
  padding: 2px 5px;
  width: 50%;
  margin: 0 auto;
}

.keyboard {
  margin: 5px 0;
  display: flex;
  flex-direction: column;
}

.keyboard-row {
  display: flex;
  flex-direction: row;
  margin: 5px;
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>