import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    emojiList: [],
    keyBoars: [],
    emoji: []
  },
  getters: {
    getKeyBoars: state => state.keyBoars,
    getEmoji: state => state.emoji,
    getInlineKeyboardString: state => {
      let inlineKey = [];

      state.keyBoars.forEach((line, lineInd) => {
        inlineKey.push([]);
        line.forEach((key, keyInd) => {
          inlineKey[lineInd].push({
            text: key.text,
            answer: key.answer,
            callback_data: `${lineInd}${keyInd}`
          });
        });
      });
      return JSON.stringify(inlineKey);
    }
  },
  mutations: {
    addKeyBoardRow(state) {
      state.keyBoars.push([]);
    },
    addKey(state, payload) {
      state.keyBoars[payload.keyboardRowIndex].push(payload.keyValue);
    },
    getEmoji(state, payload) {
      state.emoji = payload;
    },
    savePost() {
      console.log("data was saved");
    }
  },
  actions: {
    addKeyBoardRow({ commit }) {
      commit("addKeyBoardRow");
    },
    addKey({ commit }, payload) {
      commit("addKey", payload);
    },
    getEmoji({ commit }) {
      axios
        .get("")
        .then(res => {
          commit("getEmoji", res.data);
        })
        .catch(e => console.log(`emoji auery error ${e}`));
    },
    savePost({ commit }, payload) {
      console.log(payload);
      axios.post("", JSON.stringify(payload))
        .then(res => {
          commit("savePost", res.data);
        })
        .catch(e => {
          console.log("e", e);
        });
    }
  }
});
