<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
    <span>Страница {{ currentPage }} из {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Далее</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  totalItems: number
  itemsPerPage: number
}>()

const emits = defineEmits<{
  (e: 'updatePage', page: number): void
}>()

const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

watch(currentPage, (newPage) => {
  emits('updatePage', newPage)
})

const prevPage = (): void => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = (): void => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style lang="sass" scoped>
.pagination
  display: flex
  justify-content: center
  align-items: center
  margin-top: 20px

  button
    background: #FFA500
    padding: 7px 20px
    border-radius: 6px
    border: none
    color: #fff
    cursor: pointer
    transition: .25s

    &:disabled
      background: #cccccc
      cursor: not-allowed

    &:not(:disabled):hover
      transform: scale(1.05)

  span
    margin: 0 10px
</style>
