<script setup>
const loading = ref(false)
const { twitterBorderColor } = useTailwindConfig()
const { getHomeTweets } = useTweet()

const homeTweets = ref([])

onBeforeMount(async () => {
  try {
    loading.value = true
    const tweets = await getHomeTweets()
    homeTweets.value = tweets
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <MainSection title="Home" :loading="loading">

      <Head>
        <Title>Home / Twitter</Title>
      </Head>

      <div class="border-b" :class="twitterBorderColor">
        <TweetForm />
      </div>

      <TweetListFeed :tweets="homeTweets" />

    </MainSection>
  </div>
</template>

