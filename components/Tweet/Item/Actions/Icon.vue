<script setup>
const { defaultTransition } = useTailwindConfig()
const props = defineProps({
  color: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center text-gray-40 cursor-pointer group">

    <div class="p-2 rounded-full  dark:group-hover:bg-opacity-20"
      :class="`${defaultTransition} group-hover:bg-${color}-100 group-hover:text-${color}-400`">

      <slot name="icon" classes="w-5 h-5"></slot>

    </div>

    <span :class="`ml-1 group-hover:text-${color}-400`">
      <slot></slot>
    </span>

  </div>
</template>
