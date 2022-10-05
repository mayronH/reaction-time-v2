<script setup lang="ts">
import { onMounted } from 'vue'
import Loading from './LoadingComponent.vue'
import { useUserStore } from '../stores/auth'
import { useReactionStore } from '../stores/reaction'

const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
})

const userStore = useUserStore()
const reactionStore = useReactionStore()

async function uploadReaction() {
  reactionStore.createReaction(props.score)
}

onMounted(async () => {
  if (userStore.isLoggedIn) {
    await uploadReaction()
  }
})
</script>

<template>
  <Loading v-show="reactionStore.reactionsLoaded" />
  <div v-show="!reactionStore.reactionsLoaded" class="result">
    <h2>Reaction time:</h2>
    <p class="score">{{ props.score }} ms</p>
  </div>
</template>

<style scoped>
.result {
  text-align: center;
}
h2 {
  font-size: var(--small-size-fluid);
  text-transform: capitalize;

  line-height: var(--large-size-fluid);
}
.score {
  color: var(--accent);
  font-size: var(--large-size-fluid);
  font-weight: 300;
  text-transform: lowercase;

  line-height: var(--small-size-fluid);
}
@media (min-width: 768px) {
  .result {
    display: flex;
    align-items: flex-end;
    gap: var(--small-size-fluid);
  }
  .score {
    line-height: normal;
  }
}
</style>
