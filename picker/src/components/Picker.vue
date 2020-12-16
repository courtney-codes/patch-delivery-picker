<template>
  <div>
    <h1>
      Currently selected delivery slot: {{ selectedTimeslot.date }}, {{ selectedTimeslot.timeslot }}
    </h1>
    <PickerColumn
      :value="date"
      :timeslots="timeslotOptions"
      @dateTimeslotSelected="selectTimeslot"
    />
  </div>
</template>

<script>
import PickerColumn from '@/components/PickerColumn.vue';
import { DateTime } from 'luxon';

export default {
  data() {
    return {
      date: DateTime.local().toISODate(),
      selectedTimeslot: {},
      timeslotOptions: ['AM', 'PM', 'EVE'],
    };
  },
  methods: {
    selectTimeslot($event) {
      this.selectedTimeslot = $event;
    },
  },
  components: {
    PickerColumn,
  },
};
</script>

<style lang="scss" scoped></style>
