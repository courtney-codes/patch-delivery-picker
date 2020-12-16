<template>
  <div>
    <PickerCell
      v-for="(timeslot, i) in timeslots"
      :key="'timeslot' + i"
      @timeslotSelected="selectTimeslotAndDate"
      :value="timeslot"
    />
  </div>
</template>

<script>
import PickerCell from '@/components/PickerCell.vue';

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    timeslots: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectTimeslotAndDate(timeslot) {
      this.$emit('dateTimeslotSelected', { date: this.value, timeslot });
    },
  },
  components: {
    PickerCell,
  },
};
</script>

<style lang="scss" scoped></style>
