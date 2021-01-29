<template>
  <button
    class="picker-cell"
    :class="pickerButtonStyles"
    @click="selectTimeslot()"
    data-testid="picker-cell-button"
    :tabindex="disabledTabIndex"
  >
    {{ slotDisplayLabel }}
    <span v-if="canBeBooked" class="picker-cell__availability"
      >{{ numberOfAvailableBookings }} available</span
    >
    <span v-else class="picker-cell__availability">Unavailable</span>
  </button>
</template>

<script>
import { DELIVERY_SLOT_LABELS, MAX_BOOKINGS_PER_SLOT } from '@/util/constants';
import { mapState } from 'vuex';

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    deliverySlot: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    pickerButtonStyles() {
      return {
        'picker-cell--disabled': !this.canBeBooked,
        'picker-cell--selected': this.isSelected,
      };
    },
    canBeBooked() {
      return this.numberOfAvailableBookings > 0;
    },
    disabledTabIndex() {
      return this.canBeBooked ? -1 : 0;
    },
    slotDisplayLabel() {
      return DELIVERY_SLOT_LABELS[this.value];
    },
    numberOfAvailableBookings() {
      const { slots } = this.deliverySlot;
      return MAX_BOOKINGS_PER_SLOT - slots[this.value].bookings.length;
    },
    isSelected() {
      const { date, timeslot } = this.selectedTimeslot;
      return this.deliverySlot.date === date && this.value === timeslot;
    },
    ...mapState(['selectedTimeslot']),
  },
  methods: {
    selectTimeslot() {
      this.$emit('timeslotSelected', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.picker-cell {
  box-sizing: border-box;
  cursor: pointer;
  padding: 16px 48px;
  background: #fff;
  border: 3px solid #006733;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  min-width: 180px;
  background: #006733;
  color: #fff;
  transition: background-color 0.3s ease, color 0.3s ease;

  .picker-cell__availability {
    font-size: 14px;
    font-weight: 400;
    display: inline-block;
  }

  &:hover,
  &:focus {
    background: #7cbf9d;
    color: #003c1e;
    border: 3px solid #003c1e;
    outline: none;
  }

  &--disabled {
    pointer-events: none;
    background: lightgrey;
    color: grey;
    border: 3px solid lightgrey;
  }

  &--selected {
    background: #7cbf9d;
    color: #003c1e;
    border: 3px solid #003c1e;
    outline: none;
  }
}
</style>
