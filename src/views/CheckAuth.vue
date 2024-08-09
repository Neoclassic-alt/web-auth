<template>
  <main class="center">
    <Card>
      <template #content>
        <p>
          Пользователь <u>{{ verified ? 'авторизован' : 'не авторизован' }}</u>
        </p>
      </template>
    </Card>
  </main>
</template>

<script setup lang="ts">
import axios from 'axios'
import auth from '@/api/main'
import { ref, onMounted } from 'vue'
import jwtVerify from '@/utils/VerifyJWT'
import Card from 'primevue/card'

const verified = ref(false)

onMounted(async () => {
  const accessToken = auth.getAccessToken()
  const publicKey = await axios.post('/api/v2/getPublicKey', {})
  if (accessToken) {
    jwtVerify(accessToken, publicKey.data)
    verified.value = true
  }
})
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
