<template>
  <div>
    <div class="user-header">
      <UserSearch :users="userStore.users" @updateSearchResults="setFilteredUsers" />
      <button class="user-header__button" @click="addNewUser">Add user</button>
    </div>
    <UserSort @sort="handleSort" />
    <UserList :users="paginatedUsers" @editUser="updateUser" />
    <UserListPagination
      v-if="userStore.filteredUsers.length"
      :totalItems="userStore.filteredUsers.length"
      :itemsPerPage="itemsPerPage"
      @updatePage="updatePage"
    />
    <UserForm v-if="showUserForm" :user="selectedUser" @save="saveUser" @cancel="cancelUserForm" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { type User } from '@/types/User'
import UserForm from '@/components/UserForm.vue'
import UserSearch from '@/components/UserSearch.vue'
import UserListPagination from '@/components/UserListPagination.vue'
import UserList from '@/components/UserList.vue'
import UserSort from '@/components/UserSort.vue'

const userStore = useUserStore()

const showUserForm = ref<boolean>(false)
const selectedUser = ref<User | null>(null)
const currentPage = ref<number>(1)
const itemsPerPage = 5

const saveUser = (userData: User): void => {
  selectedUser.value ? userStore.updateUser(userData) : userStore.addUser(userData)

  cancelUserForm()
}

const updateUser = (userData: User): void => {
  selectedUser.value = userData
  showUserForm.value = true
}

const addNewUser = (): void => {
  showUserForm.value = true
}

const cancelUserForm = (): void => {
  showUserForm.value = false
  selectedUser.value = null
}

const setFilteredUsers = (users: User[]): void => {
  userStore.filteredUsers = users
  currentPage.value = 1
}

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage

  return userStore.filteredUsers.slice(start, end)
})

const updatePage = (page: number): void => {
  currentPage.value = page
}

const handleSort = (order: 'date-asc' | 'date-desc' | 'name-asc' | 'name-desc') => {
  userStore.setSortOrder(order)
}

onMounted(async () => {
  await userStore.fetchAndSetUsers()
  userStore.applyFilters()
})
</script>

<style lang="sass" scoped>
.user-header
  display: flex
  justify-content: space-between
  align-items: center
  min-width: 450px
  margin-top: 60px
  margin-bottom: 15px
  &__button
    background: #FFA500
    padding: 7px 20px
    border-radius: 6px
    border: none
    color: #fff
    cursor: pointer
    transition: .25s
    &:hover
      transform: scale(1.05)
</style>
