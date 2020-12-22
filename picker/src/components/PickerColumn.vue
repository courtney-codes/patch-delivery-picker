<template>
  <div class="picker-column">
    <div>{{ displayDate }}</div>
    <PickerCell
      v-for="(timeslot, i) in timeslots"
      :key="'timeslot' + i"
      @timeslotSelected="selectTimeslotAndDate"
      :deliverySlot="deliverySlot"
      :value="timeslot"
    />
  </div>
</template>

<script>
import PickerCell from '@/components/PickerCell.vue';
import { DATE_DISPLAY_FORMAT } from '@/util/constants';
import { DateTime } from 'luxon';

export default {
  props: {
    deliverySlot: {
      type: Object,
      required: true,
    },
    timeslots: {
      type: Array,
      required: true,
    },
  },
  computed: {
    displayDate() {
      return DateTime.fromISO(this.deliverySlot.date).toFormat(DATE_DISPLAY_FORMAT);
    },
  },
  methods: {
    selectTimeslotAndDate(timeslot) {
      this.$emit('dateTimeslotSelected', { date: this.deliverySlot.date, timeslot });
    },
  },
  components: {
    PickerCell,
  },
};
</script>

<style lang="scss" scoped>
  .picker-column {
    display: grid;
    grid-template-rows: minmax(auto, 120px) repeat(3, 1fr);
    row-gap: 8px;
  }
</style>
