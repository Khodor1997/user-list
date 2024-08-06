import { defineStore } from 'pinia'
import { type User } from '@/types/User'
import { fetchUsers } from '@/api/userApi'

interface UserState {
  users: User[]
  filteredUsers: User[]
  sortOrder: 'date-asc' | 'date-desc' | 'name-asc' | 'name-desc'
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    filteredUsers: [],
    sortOrder: 'date-desc'
  }),
  actions: {
    async fetchAndSetUsers() {
      try {
        const users = await fetchUsers()
        this.setUsers(users)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    },
    setUsers(users: User[]) {
      this.users = users
    },
    addUser(user: User) {
      this.users.push(user)
      this.applyFilters()
    },
    updateUser(user: User) {
      const index = this.users.findIndex((u) => u.id === user.id)
      if (index !== -1) {
        this.users.splice(index, 1, user)
        this.applyFilters()
      }
    },
    deleteUser(userId: number) {
      this.users = this.users.filter((u) => u.id !== userId)
    },
    setSortOrder(order: 'date-asc' | 'date-desc' | 'name-asc' | 'name-desc') {
      this.sortOrder = order
      this.applyFilters()
    },
    applyFilters() {
      this.filteredUsers = [...this.users].sort((a, b) => {
        switch (this.sortOrder) {
          case 'date-asc':
            return new Date(a.lastVisitedAt).getTime() - new Date(b.lastVisitedAt).getTime()
          case 'date-desc':
            return new Date(b.lastVisitedAt).getTime() - new Date(a.lastVisitedAt).getTime()
          case 'name-asc':
            return a.firstName.localeCompare(b.firstName)
          case 'name-desc':
            return b.firstName.localeCompare(a.firstName)
          default:
            return 0
        }
      })
    }
  }
})
