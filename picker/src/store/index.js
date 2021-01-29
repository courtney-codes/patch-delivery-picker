import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    deliverySlots: [],
    selectedTimeslot: {},
  },
  mutations: {
    SAVE_DELIVERY_SLOTS(state, deliverySlots) {
      state.deliverySlots = deliverySlots;
    },
    SELECT_TIMESLOT(state, selectedTimeslot) {
      state.selectedTimeslot = selectedTimeslot;
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
    bookDeliverySlot({ dispatch }, timeslot) {
      axios.post('http://localhost:3000/delivery-slots/book-slot', timeslot)
        .then(() => {
          dispatch('loadDeliverySlots');
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
  },
});

export default store;
