<template>
  <modal title="Add post" @close="closeModal">
    <div slot="body">
      <div class="form-item">
        <input type="text" v-model="post.question" placeholder="Question" />
      </div>
      <div class="form-item">
        <input type="file" @change="uploadFile" placeholder="File" />
      </div>
      <div>
        <keyboardsBot />
      </div>
      <button class="btn btnPrimary" @click="onSubmit">save</button>
    </div>
  </modal>
</template>

<script>
import modal from "@/components/UI/Modal";
import axios from "axios";
import keyboardsBot from "@/components/keyboardsBot";

export default {
  components: {
    modal,
    keyboardsBot
  },
  data() {
    return {
      post: {
        question: "",
        filePath: ""
      }
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    onSubmit() {
      const param = {
        query: this.post.question,
        filePath: this.post.filePath,
        inline_keyboard: this.$store.getters.getInlineKeyboardString,
        sendQ: 1
      };
      console.log("get keyBoard!", param);
      this.$store.dispatch("savePost", param);
    },
    uploadFile(e) {
      const files = e.currentTarget.files;
      var file = files[0];
      let formData = new FormData();
      formData.append("userfile", file);
      axios
        .post("", formData)
        .then(
          result => {
            this.post.filePath = result.data.filename;
          },
          err => {
            console.log(`err ${err}`);
          }
        )
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
