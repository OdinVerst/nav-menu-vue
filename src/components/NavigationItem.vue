<script setup lang="ts">
import { NavigationItemType } from "../types/navigationItemType";
import { ref } from 'vue';
import { useNavigationStore } from "../store/navigation";

const props = defineProps<{
  item: NavigationItemType;
  activePath: string[] | null;
}>();

const navigationStore = useNavigationStore();
const {activePath, item} = props;

const isOpen = ref((activePath || []).includes(item.key) || false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const handleClick = () => {
  if (props.item.link) {
    navigationStore.setCurrentPage(props.item.link);
  }
};

</script>

<template>
  <li>
    <div class="item-container" @click="toggleOpen">
      <button v-if="item.children && item.children.length" class="toggle-btn">
        {{ isOpen ? '▲' : '▼' }}
      </button>
      <router-link v-if="item.link" :to="item.link" activeClass="border-indigo-500" @click="handleClick">
        <span>{{ item.name }}</span>
      </router-link>
    </div>
    <ul v-if="isOpen && item.children && item.children.length" class="nested-list">
      <NavigationItem v-for="child in item.children" :key="child.key" :item="child" :active-path="activePath" />
    </ul>
  </li>
</template>

<style>

</style>
