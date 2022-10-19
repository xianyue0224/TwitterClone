<script setup>
const { login } = useAuth()

const form = reactive({
  username: "",
  password: ""
})

async function handleLogin() {
  await login({
    username: form.username,
    password: form.password
  })
}
</script>

<template>
  <div>
    <div class="pt-5 space-y-6">

      <UIInput v-model="form.username" label="Username"
        placeholder="@username" />

      <UIInput v-model="form.password" label="Password" type="password"
        placeholder="********" />

      <div>
        <button @click="handleLogin">Login</button>
      </div>

    </div>
  </div>
</template>