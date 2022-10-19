<script setup>
const { twitterBorderColor } = useTailwindConfig()
defineProps({
  tweet: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>

    <TweetItemHeader :tweet="tweet" />

    <div class="ml-16">
      <p class="flex-shrink w-auto font-medium text-gray-800 dark:text-white">
        {{tweet.text}}
      </p>

      <div v-for="(image,idx) in tweet.mediaFiles" :key="idx"
        class="flex my-3 mr-2 border-2 rounded-2xl" :class="twitterBorderColor">

        <img :src="image.url" class="w-full rounded-2xl" />

      </div>
    </div>

    <div class="mt-2">
      <TweetItemActions :tweet="tweet" />
    </div>

  </div>
</template>