<script setup>
const darkMode = ref(false)

const { useAuthUser, initAuth, useAuthLoading } = useAuth()
const user = useAuthUser()
const isAuthLoading = useAuthLoading()

onBeforeMount(initAuth)

</script>

<template>
  <div :class="{'dark':darkMode}">
    <div class="bg-white dark:bg-dim-900">

      <!-- loading -->
      <LoadingPage v-if="isAuthLoading" />

      <!-- App -->
      <div v-else-if="user" class="min-h-full">

        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">

          <!-- Left sidebar -->

          <div class="hidden md:block xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </div>

          <!-- Main content -->

          <main class="col-span-12  xs:col-span-12 xl:col-span-7">
            <RouterView />
          </main>

          <!-- Right sidebar -->

          <div class="hidden md:block xl:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>

        </div>

      </div>

      <!-- login -->
      <AuthPage v-else></AuthPage>

    </div>
  </div>
</template>

