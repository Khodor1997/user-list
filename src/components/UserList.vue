<template>
  <div class="user-list">
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">
        <UserListItem @edit="editUser" :user="user" />
      </li>
    </ul>
    <div v-else class="item error">
      <p>Ничего не найдено!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserListItem from '@/components/UserListItem.vue'
import { type User } from '@/types/User'

defineProps<{ users: User[] }>()

const emits = defineEmits<{
  (e: 'editUser', user: User): void
}>()

const editUser = (user: User) => {
  emits('editUser', user)
}
</script>

<style lang="sass" scoped>
.user-list
  ul
    padding: 0
    list-style-type: none
</style>
