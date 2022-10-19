<script setup>
import { ChatBubbleBottomCenterTextIcon, ArrowPathRoundedSquareIcon, HeartIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
defineProps({
  tweet: {
    type: Object,
    required: true
  }
})

function generateRandom() {
  return Math.floor(Math.random() * 100)
}
</script>

<template>
  <div class="flex justify-around items-center w-full">

    <TweetItemActionsIcon color="blue">

      <template v-slot:icon="{classes}">
        <ChatBubbleBottomCenterTextIcon :class="classes" />
      </template>

      <template v-slot:default>
        {{tweet.repliesCount}}
      </template>

    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green">

      <template v-slot:icon="{classes}">
        <ArrowPathRoundedSquareIcon :class="classes" />
      </template>

      <template v-slot:default>
        {{generateRandom()}}
      </template>

    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="red">

      <template v-slot:icon="{classes}">
        <HeartIcon :class="classes" />
      </template>

      <template v-slot:default>
        {{generateRandom()}}
      </template>

    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="blue">

      <template v-slot:icon="{classes}">
        <ArrowUpTrayIcon :class="classes" />
      </template>

      <template v-slot:default>
        {{generateRandom()}}
      </template>

    </TweetItemActionsIcon>

  </div>
</template>
