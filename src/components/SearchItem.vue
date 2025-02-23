<template>
  <li class="searchItem">
    <router-link
      v-if="item.link"
      activeClass="searchItem__link_active"
      class="searchItem__link"
      :to="item.link"
      @click="handleClick"
    >
      <span>{{ item.name }}</span>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { NavigationItemType } from "../types/navigationItemType";
import { useNavigationStore } from "../store/navigation";

const props = defineProps<{
  item: NavigationItemType;
}>();
const navigationStore = useNavigationStore();

const handleClick = () => {
  if (props.item.link) {
    navigationStore.setCurrentPage(props.item.link);
  }
};
</script>

<style scoped>
.searchItem {
  margin-bottom: var(--size-spacer-item-nav);
}

.searchItem__link {
  color: currentColor;
  text-decoration: none;
}

.searchItem__link:hover {
  color: var(--color-text-accent);
}

.searchItem__link_active {
  font-weight: bold;
  color: var(--color-text-accent);
}
</style>
