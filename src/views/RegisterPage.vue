<template>
  <main class="center">
    <Card>
      <template #title>Регистрация</template>
      <template #content>
        <p v-if="response" style="background: bisque; padding: 6px; border-radius: 8px">
          {{ response }}
        </p>
        <form>
          <div class="mt-2">
            <FloatLabel>
              <InputText
                type="text"
                id="username"
                v-model="userData.username"
                :class="{ error: errors.username }"
              />
              <label for="username">Имя пользователя</label>
            </FloatLabel>
            <p v-if="errors.username" class="error-text">{{ errors.username }}</p>
          </div>
          <div class="mt-2">
            <FloatLabel>
              <InputText
                type="email"
                id="email"
                v-model="userData.email"
                :class="{ error: errors.email }"
              />
              <label for="email">E-mail</label>
            </FloatLabel>
            <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
          </div>
          <div class="mt-2">
            <FloatLabel>
              <InputText
                type="phone"
                id="phone"
                v-model="userData.phone"
                :class="{ error: errors.phone }"
              />
              <label for="phone">Телефон</label>
            </FloatLabel>
            <p v-if="errors.phone" class="error-text">{{ errors.phone }}</p>
          </div>
          <div class="mt-2">
            <FloatLabel>
              <InputText
                type="password"
                id="password"
                v-model="userData.password"
                :class="{ error: errors.password }"
              />
              <label for="password">Пароль</label>
            </FloatLabel>
            <p v-if="errors.password" class="error-text">{{ errors.password }}</p>
          </div>
          <Button label="Submit" class="mt-1 w-full" @click="validate(register)" />
        </form>
      </template>
    </Card>
  </main>
</template>

<script setup lang="ts">
import { type Ref, ref, reactive } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'
import auth from '@/api/main'

const userData = reactive({
  username: '',
  email: '',
  password: '',
  phone: ''
})

const errors: Ref<{
  username: string | null
  email: string | null
  phone: string | null
  password: string | null
}> = ref({
  username: null,
  email: null,
  phone: null,
  password: null
})

function validate(onSubmit: () => void) {
  let valid = true
  if (userData.username.trim() === '') {
    errors.value.username = 'Имя пользователя обязательно'
    valid = false
  }
  if (userData.email.trim() === '' && userData.phone.trim() === '') {
    errors.value.email = 'E-mail или телефон обязателен'
    errors.value.phone = 'E-mail или телефон обязателен'
    valid = false
  }
  if (userData.password.trim() === '') {
    errors.value.password = 'Пароль обязателен'
    valid = false
  }

  if (!valid) {
    return false
  }

  errors.value = {
    username: null,
    email: null,
    phone: null,
    password: null
  }
  onSubmit()
}

const response = ref('')

async function register() {
  const result = await auth.execute('register', userData)

  if (result.ok) {
    response.value = '✔️ Регистрация успешно выполнена!'
  } else {
    response.value = '❌ Ошибка при регистрации!'
  }

  await auth.execute('sendConfirmCode', {
    email: userData.email,
    phone: userData.phone,
    use_call: false
  })

  await auth.execute('confirmEmail', userData.email)
}
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.mt-1 {
  margin-top: 1rem;
}
.mt-2 {
  margin-top: 2rem;
}
.w-full {
  width: 100%;
}
.error {
  border: 1px solid red;
}
.error-text {
  color: red;
  font-size: 12px;
}
</style>
