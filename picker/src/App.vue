<template>
  <div id="app">
    <Picker />
  </div>
</template>

<script>
import Picker from '@/components/Picker.vue';
import 'fontsource-poppins';

export default {
  name: 'App',
  created() {
    document.title = 'Pick your delivery slot';
  },
  components: {
    Picker,
  },
};
</script>

<style>
body {
  background: #eee;
}
#app {
  font-family: Poppins, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
