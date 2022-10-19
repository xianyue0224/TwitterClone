<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <TweetItem :tweet="tweet" />
  <TweetForm placeholder="Tweet your reply" />
</template>