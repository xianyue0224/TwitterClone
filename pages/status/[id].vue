<script setup>
const loading = ref(false)
const tweet = ref(null)

const route = useRoute()
function getTweetIdFromRoute() {
  return route.params.id
}

const { getTweetById } = useTweet()

async function getTweet() {
  try {
    loading.value = true
    const { tweet } = await getTweetById(getTweetIdFromRoute())
    tweet.value = tweet
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onBeforeMount(getTweet)
</script>

<template>
  <MainSection title="Tweet" :loading="loading">

    <Head>
      <Title>Tweet / Twitter</Title>
    </Head>

    <TweetDetails :tweet="tweet" />

  </MainSection>
</template>