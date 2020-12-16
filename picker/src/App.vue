<template>
  <div id="app">
    <Picker />
  </div>
</template>

<script>
import Picker from '@/components/Picker.vue';

export default {
  name: 'App',
  components: {
    Picker,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
