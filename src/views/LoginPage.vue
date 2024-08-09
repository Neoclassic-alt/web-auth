<template>
  <main class="center">
    <Card>
      <template #title>Авторизация</template>
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
                v-model="userData.credential"
                :class="{ error: errors.credential }"
              />
              <label for="username">E-mail или телефон</label>
            </FloatLabel>
            <p v-if="errors.credential" class="error-text">{{ errors.credential }}</p>
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
        </form>
        <Button label="Submit" class="mt-1 w-full" @click="validate(login)" />
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
  credential: '',
  password: ''
})

const errors: Ref<{
  credential: string | null
  password: string | null
}> = ref({
  credential: null,
  password: null
})

const response = ref('')

function validate(onSubmit: () => void) {
  let valid = true
  if (userData.credential.trim() === '') {
    errors.value.credential = 'E-mail или телефон обязателен'
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
    credential: null,
    password: null
  }
  onSubmit()
}

async function login() {
  const result = await auth.execute('login', userData)

  if (result.ok) {
    response.value = '✔️ Авторизация успешно выполнена!'
  } else {
    response.value = '❌ Ошибка при авторизации!'
  }
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
