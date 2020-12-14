<template>
  <div></div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: {}
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectTimeslot() {
      this.$emit("timeslotSelected", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.picker-cell {
  cursor: pointer;
  
  &--disabled {
    pointer-events: none;
    cursor: not-allowed;
  }
}
</style>
