<template>
  <button
    class="picker-cell"
    :class="{ 'picker-cell--disabled': disabled, 'picker-cell--selected': selected }"
    @click="selectTimeslot()"
    data-testid="picker-cell-button"
  >
    {{ value }}
  </button>
</template>

<script>
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
  cursor: pointer;

  &--disabled {
    pointer-events: none;
    cursor: not-allowed;
  }

  &--selected {
  }
}
</style>
