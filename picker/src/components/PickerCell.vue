<template>
  <button
    class="picker-cell"
    :class="pickerButtonStyles"
    @click="selectTimeslot()"
    data-testid="picker-cell-button"
  >
    {{ value }}
    <span v-if="hasExistingBooking">Booked</span>
  </button>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    deliverySlot: {
      type: Object,
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
  },
  computed: {
    hasExistingBooking() {
      return this.deliverySlot.slots[this.value]?.booked === true;
    },
    pickerButtonStyles() {
      return {
        'picker-cell--disabled': this.hasExistingBooking,
      };
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

  &:hover, &:focus {
  }

  &--disabled {
    pointer-events: none;
    cursor: not-allowed;
    background: lightgrey;
  }

  &--selected {
  }
}
</style>
