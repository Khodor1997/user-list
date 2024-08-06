<template>
  <div class="sorter">
    <select class="sorter__select" v-model="selectedSort" @change="emitSort">
      <option value="date-desc">Date added (newest first)</option>
      <option value="date-asc">Date added (oldest first)</option>
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits<{
  (e: 'sort', sortOrder: 'date-asc' | 'date-desc' | 'name-asc' | 'name-desc'): void
}>()

const selectedSort = ref<'date-asc' | 'date-desc' | 'name-asc' | 'name-desc'>('date-desc')

const emitSort = () => {
  emits('sort', selectedSort.value)
}
</script>

<style lang="sass" scoped>
.sorter
  display: flex
  align-items: center
  gap: 10px
  &__select
    background: #fff
    padding: 5px
    border: 2px solid #e6e6e6
    border-radius: 6px
    outline: none
</style>
