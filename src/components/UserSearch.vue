<template>
  <div>
    <input class="search-input" type="text" v-model="input" placeholder="Search" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { type User } from '@/types/User'

const props = defineProps<{ users: User[] }>()
const emit = defineEmits(['updateSearchResults'])

let input = ref<string>('')

const filteredList = computed(() => {
  const searchTerm = input.value.toLowerCase()
  if (!searchTerm) return props.users

  return props.users.filter(({ firstName, lastName, email }) => {
    const fullName = `${firstName} ${lastName}`.toLowerCase()
    return fullName.includes(searchTerm) || email.toLowerCase().includes(searchTerm)
  })
})

watch(filteredList, (newFilteredList) => {
  emit('updateSearchResults', newFilteredList)
})
</script>
<style lang="sass" scoped>

.search-input
  height: 29px
  width: 250px
  border: 2px solid #e6e6e6
  outline: none
  padding: 0 10px
  border-radius: 6px
  &:focus
    border-color: #FFA500
</style>
