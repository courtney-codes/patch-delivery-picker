<template>
    <button
      class="picker-cell"
      :class="pickerButtonStyles"
      @click="selectTimeslot()"
      data-testid="picker-cell-button"
      :tabindex="disabledTabIndex"
    >
      {{ slotDisplayLabel }}
      <span v-if="hasExistingBooking">{{ availableBookings }}</span>
    </button>
</template>

<script>
import { DELIVERY_SLOT_LABELS, MAX_BOOKINGS_PER_SLOT } from '@/util/constants';

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
        'picker-cell--disabled': this.hasExistingBooking,
      };
    },
    disabledTabIndex() {
      return this.hasExistingBooking ? -1 : 0;
    },
    slotDisplayLabel() {
      return DELIVERY_SLOT_LABELS[this.value];
    },
    numberOfAvailableBookings() {
      const { slots } = this.deliverySlot;
      return MAX_BOOKINGS_PER_SLOT - slots[this.value].bookings.length;
    },
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
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  min-width: 180px;
  background: #006733;
  color: #fff;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover, &:focus {
  background: #7CBF9D;
  color: #003C1E;
  border: 3px solid #003C1E;
  outline: none;
  }

  &--disabled {
    pointer-events: none;
    background: lightgrey;
    color: grey;

  }

  &--selected {
  }
}
</style>
