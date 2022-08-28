<template>
  <!-- <TimerComponent/> -->
  <HomeComponent />
</template>

<script>
import TimerComponent from "./components/TimerComponent.vue";
import HomeComponent from "@c/HomeComponent.vue";

export default {
  name: "App",
  components: {
    TimerComponent,
    HomeComponent,
  },
};
</script>