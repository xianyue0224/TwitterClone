<script setup>
const { defaultTransition, twitterBorderColor } = useTailwindConfig()

const wrapperClasses = computed(() => `${defaultTransition} ${twitterBorderColor}`)
</script>

<template>
  <div :class="wrapperClasses"
    class="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300 border-b">
    <slot></slot>
  </div>
</template>
