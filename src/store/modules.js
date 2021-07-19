const state = {
  username: '',
  mailaddress: '',
  password: '',
};

const mutations = {
  setUserName(state, username) {
    state.username = username;
  },
  setMailAddress(state, mailaddress) {
    state.mailaddress = mailaddress;
  },
  setPassword(state, password) {
    state.password = password;
  },
};

const getters = {};

const actions = {};

export default {
  state,
  mutations,
  getters,
  actions,
};
