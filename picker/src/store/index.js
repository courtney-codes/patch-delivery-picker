import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    deliverySlots: [],
  },
  mutations: {
    SAVE_DELIVERY_SLOTS(state, deliverySlots) {
      state.deliverySlots = deliverySlots;
    },
  },
  actions: {
    loadDeliverySlots({ commit }) {
      axios.get('http://localhost:3000/delivery-slots')
        .then(({ data }) => {
          commit('SAVE_DELIVERY_SLOTS', data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
  },
});

export default store;
