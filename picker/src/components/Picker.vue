<template>
  <div class="picker-container">
    <h1>
      Currently selected delivery slot: {{ selectedTimeslot.date }} {{ selectedTimeslot.timeslot }}
    </h1>
    <div class="picker-grid">
      <PickerColumn
        v-for="(deliverySlot, index) in deliverySlots"
        :key="index"
        :deliverySlot="deliverySlot"
        :timeslots="timeslotOptions"
        @dateTimeslotSelected="selectTimeslot"
      />
    </div>
    <button class="picker-booking-button" @click="bookDeliverySlot(selectedTimeslot)">
      Book now
    </button>
  </div>
</template>

<script>
import PickerColumn from '@/components/PickerColumn.vue';
import { mapState } from 'vuex';
import { AVAILABLE_DELIVERY_SLOTS } from '@/util/constants';

export default {
  created() {
    this.$store.dispatch('loadDeliverySlots');
  },
  data() {
    return {
      timeslotOptions: AVAILABLE_DELIVERY_SLOTS,
    };
  },
  computed: {
    ...mapState(['deliverySlots', 'selectedTimeslot']),
  },
  methods: {
    selectTimeslot($event) {
      this.$store.commit('SELECT_TIMESLOT', $event);
    },
    async bookDeliverySlot() {
      try {
        await this.$store.dispatch('bookDeliverySlot', this.selectedTimeslot);

        this.selectedTimeslot = {};
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    PickerColumn,
  },
};
</script>

<style lang="scss" scoped>
.picker-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 32px 64px;
  padding: 32px 0 64px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid lightgrey;
}

.picker-grid {
  width: (180px * 4) + (16px * 4);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: column;
  grid-gap: 16px;
  overflow: hidden;
  overflow-x: scroll;
  margin-bottom: 32px;
}

.picker-booking-button {
  box-sizing: border-box;
  font-size: 18px;
  border-radius: 32px;
  padding: 16px 32px;
  font-weight: 700;
  background-color: #08e1ae;
  border: 3px solid #006733;
  background: #006733;
  color: #fff;
  transition: background-color 0.2s ease;

  &:hover,
  &:focus {
    background: #7cbf9d;
    color: #003c1e;
    border: 3px solid #003c1e;
    outline: none;
  }
}
</style>
