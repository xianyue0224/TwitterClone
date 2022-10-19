<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "text"
  }
})
defineEmits(["update:modelValue"])
</script>

<template>
  <div>
    <label for="" v-if="label"
      class="block pl-3 ml-px text-sm font-medium text-gray-700">
      {{label}}
    </label>
    <input :type="type" :value="modelValue" :placeholder="placeholder"
      @input="$emit('update:modelValue',$event.target.value)"
      class="block w-full px-4 border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
  </div>
</template>