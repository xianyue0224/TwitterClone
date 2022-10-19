<script setup>
const { twitterBorderColor, defaultTransition } = useTailwindConfig()
const props = defineProps({
  tweets: {
    type: Array,
    required: true
  }
})

const isEmptyArray = computed(() => props.tweets.length === 0)
</script>

<template>
  <div>

    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">
        No Tweets 😹
      </p>
    </div>

    <div v-else
      class="pb-4 border-b hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer"
      v-for="(tweet,idx) in tweets" :key="idx"
      :class="[twitterBorderColor,defaultTransition]">
      <TweetItem :tweet="tweet" />
    </div>
  </div>
</template>