<template>
  <div class="user-card">
    <div class="user-card__info">
      <div class="user-card__details">
        <span class="user-card__name">{{ fullName }}</span>
        <span class="user-card__date">{{ formattedDate }}</span>
      </div>
      <div class="user-card__email">
        <span>Email: {{ user.email }}</span>
      </div>
    </div>
    <div class="user-card__actions">
      <button @click="deleteUser(user.id)" class="user-card__button user-card__button--delete">
        <i class="bi bi-x-lg"></i>
      </button>
      <button @click="editUser" class="user-card__button user-card__button--edit">
        <i class="bi bi-pencil"></i>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs, nextTick } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { type User } from '@/types/User'

const userStore = useUserStore()
const props = defineProps<{ user: User }>()
const emit = defineEmits<{ (event: 'edit', user: User): void }>()

const { user } = toRefs(props)

const fullName = computed(() => `${user.value.firstName} ${user.value.lastName}`)

const formattedDate = computed(() => {
  const date = new Date(user.value.lastVisitedAt)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const deleteUser = (id: number): void => {
  userStore.deleteUser(id)

  nextTick(() => {
    userStore.applyFilters()
  })
}

const editUser = (): void => {
  emit('edit', props.user)
}
</script>
<style lang="sass" scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css")

.user-card
  display: flex
  justify-content: space-between
  min-width: 450px
  max-width: 600px
  padding: 10px 20px
  margin-bottom: 10px
  border: 1px solid #e6e6e6
  border-radius: 7px
  transition: .2s
  cursor: pointer
  &:hover
    transform: scale(1.05)

  &__info
    flex-grow: 1
  &__details
    display: flex
    justify-content: space-between
  &__name
    font-size: 18px
    font-weight: 600
  &__date
    opacity: .5
    font-size: 13px
  &__actions
    display: flex
    flex-direction: column
    justify-content: space-around
    margin-left: 20px
  &__button
    padding: 0
    border: 0
    background: transparent
    cursor: pointer
    font-size: 20px
    outline: none
    opacity: .5
    transition: .3s
    &:hover
      opacity: 1
    &--delete
      color: #DC143C
    &--edit
      color:#D2691E
</style>
