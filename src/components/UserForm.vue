<template>
  <div @click="$emit('cancel')" class="modal-overlay"></div>
  <div class="modal">
    <h2>{{ user ? 'Edit user' : 'Add new user' }}</h2>
    <form class="modal-form" @submit.prevent="submitForm">
      <label class="modal-form__row">
        First Name:
        <input class="modal-form__input" v-model="form.firstName" required />
      </label>
      <label class="modal-form__row">
        Second Name:
        <input class="modal-form__input" v-model="form.lastName" required />
      </label>
      <label class="modal-form__row">
        Email:
        <input class="modal-form__input" v-model="form.email" required />
      </label>
      <div class="modal-form__button-group">
        <button
          @click="$emit('cancel')"
          class="modal-form__button modal-form__button--red"
          type="button"
        >
          Cancel
        </button>
        <button class="modal-form__button modal-form__button--green" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue'
import { type User } from '@/types/User'

const props = defineProps<{ user: User | null }>()
const emit = defineEmits<{
  (event: 'save', user: User): void
  (event: 'cancel'): void
}>()

const form = reactive<User>({
  id: props.user?.id || Date.now(),
  firstName: props.user?.firstName || '',
  lastName: props.user?.lastName || '',
  email: props.user?.email || '',
  lastVisitedAt: props.user?.lastVisitedAt || Date.now()
})

const disableScroll = (): void => document.body.classList.add('no-scroll')
const enableScroll = (): void => document.body.classList.remove('no-scroll')

onMounted(() => {
  disableScroll()
})

onUnmounted(() => {
  enableScroll()
})

const submitForm = () => {
  emit('save', { ...form })
}
</script>

<style scoped lang="sass">
.modal-overlay
  display: flex
  justify-content: center
  position: absolute
  top: 0
  right: 0
  width: 100%
  height: 100%
  background: rgba(0,0,0,.7)

.modal
  position: absolute
  top: 30%
  padding: 20px
  border: 1px solid #fff
  border-radius: 15px
  background: #fff

.modal-form
  display: flex
  flex-direction: column
  width: 350px
  &__row
    display: flex
    flex-direction: column
    margin-bottom: 15px
  &__input
    font-size: 16px
    padding: 10px 10px
    border: 1px solid #e6e6e6
    border-radius: 5px
    outline: none
  &__button-group
    display: flex
    justify-content: space-around
  &__button
    width: 40%
    height: 40px
    margin-top: 15px
    border-radius: 8px
    border-color: transparent
    outline: none
    cursor: pointer
    font-size: 16px
    color: #fff
    &--green
      background: #3CB371
    &--red
      background: #DC143C
</style>
