<template>
  <div id="app">
    <div class="container">
      <aside class="sidebar">
        <NavigationList />
      </aside>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import NavigationList from "./components/NavigationList.vue";
import { defineComponent, onMounted } from 'vue'
import { useNavigationStore } from "./store/navigation.js";

export default defineComponent({
  name: "App",
  components: {
    NavigationList,
  },
  setup() {
    const navigationStore = useNavigationStore();

    onMounted(() => {
      navigationStore.fetchNavigationData();
    });
  },
});
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 10px;
}

@media (max-width: 630px) {
  .container {
    grid-template-columns: 1fr;
  }
}
</style>
