<template>
  <div id="app">
    <div class="container">
      <aside class="sidebar">
        <NavigationList />
      </aside>
      <main class="content">
        <h1>Добро пожаловать!</h1>
        <p>Здесь будет основной контент, связанный с выбранным пунктом меню.</p>
      </main>
    </div>
  </div>
</template>

<script>
import NavigationList from './components/NavigationList.vue';

export default {
  name: 'App',
  components: {
    NavigationList,
  },
}
</script>
