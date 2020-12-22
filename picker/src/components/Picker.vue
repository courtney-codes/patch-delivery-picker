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
  </div>
</template>

<script>
import PickerColumn from '@/components/PickerColumn.vue';
import axios from 'axios';
import { AVAILABLE_DELIVERY_SLOTS } from '@/util/constants';

export default {
  mounted() {
    this.fetchDeliverySlots();
  },
  data() {
    return {
      deliverySlots: [],
      selectedTimeslot: {},
      timeslotOptions: AVAILABLE_DELIVERY_SLOTS,
    };
  },
  computed: {
    testSlots() {
      return Object.values(this.deliverySlots[2].slots).map((slot) => slot.booked);
    },
  },
  methods: {
    selectTimeslot($event) {
      this.selectedTimeslot = $event;
    },
    async fetchDeliverySlots() {
      try {
        const { data } = await axios.get('http://localhost:3000/delivery-slots');
        this.deliverySlots = data;
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
  width: 80%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: column;
  grid-gap: 16px;
  overflow: hidden;
  overflow-x: scroll;
}
</style>
