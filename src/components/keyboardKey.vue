<template>
  <div class="keyButton">
    <div class="input-container" @click="editColunm" v-out="saveChanges">
      <p v-show="!showInput">{{keyData.text}}</p>
      <div v-show="showInput" class="input-group">
        <input @click="emojiListCoord = null;" type="text" v-model="question" />
        <div @click="showEmojiList">
          <span>😀</span>
        </div>
      </div>
      <emoji :coords="emojiListCoord" v-show="emojiListCoord" @chooseEmoji="setEmoji" />
      <textAreaPopUp v-show="textAreaCoord" :coords="textAreaCoord" @closeTextArea="setAnswer" />
    </div>
    <div class="icon-group">
      <font-awesome-icon icon="edit" size="1x" :style="{ color: '#487a48' }" @click="showTextArea" />
      <font-awesome-icon
        icon="trash-alt"
        size="1x"
        :style="{ color: 'rgb(172, 56, 81)' }"
        @click="deleteButt"
      />
    </div>
  </div>
</template>

<script>
import emoji from "@/components/emojiList";
import textAreaPopUp from "@/components/UI/TextAreaPopUp";

export default {
  components: {
    emoji,
    textAreaPopUp
  },
  data() {
    return {
      showInput: false,
      question: "",
      blockHide: false,
      emojiListCoord: null,
      textAreaCoord: null
    };
  },
  props: {
    keyData: {
      type: Object,
      required: true
    }
  },
  methods: {
    editColunm() {
      if (!this.blockHide) {
        this.question = this.keyData.text;
        this.answer = this.keyData.answer;
        this.showInput = true;
        this.blockHide = true;
      }
    },
    deleteButt() {
      console.log("delete button");
    },
    saveChanges() {
      this.keyData.text = this.question;
      this.keyData.answer = this.answer;
      this.showInput = false;
      this.blockHide = false;
      this.emojiListCoord = null;
    },
    showEmojiList(e) {
      this.emojiListCoord = {
        x: e.target.getBoundingClientRect().x,
        y:
          e.target.getBoundingClientRect().y +
          e.target.getBoundingClientRect().height
      };
    },
    showTextArea(e) {
      this.textAreaCoord = {
        x: e.target.getBoundingClientRect().x,
        y:
          e.target.getBoundingClientRect().y +
          e.target.getBoundingClientRect().height
      };
    },
    setEmoji(emoji) {
      this.question += emoji;
    },
    setAnswer(answer) {
      this.textAreaCoord = null;
      this.answer = answer;
    }
  },

  directives: {
    out: {
      bind(el, binding, node) {
        let element = document.getElementsByClassName("modal-content")[0];
        el.onElementClickOut = function(e) {
          var isClickInside = node.elm.contains(e.target);
          if (!isClickInside) {
            binding.value();
          }
        };
        element.addEventListener("click", el.onElementClickOut, true);
      },
      unbind() {
        // element.removeEventListener("click", el.onElementClickOut, true);
        console.log("unbind");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.keyButton {
  padding: 2px 6px;
  border-radius: 20px;
  border: 1px solid #dcdfe6;
  background-color: #dddddd;
  min-width: 20%;
  p {
    text-align: center;
  }
  .icon-group {
    display: flex;
    align-items: center;
    svg {
      margin: 0 2px;
    }
  }

  .input-container {
    width: 100%;
  }
}

.input-group {
  display: flex;
  flex-direction: row;
  width: 100%;
  input {
    border-radius: 20px 0px 0px 20px;
    padding: 2px 6px;
    margin: 0;
  }
  div {
    cursor: pointer;
    border-radius: 0px 20px 20px 0px;
    background: #106371;
    text-align: center;
    justify-content: normal;
    vertical-align: inherit;
    margin: 1px 0 1px 0;
    display: flex;
    span {
      margin: auto;
    }
  }
}
</style>