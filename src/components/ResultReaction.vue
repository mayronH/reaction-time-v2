<script setup lang="ts">
import { onMounted, ref } from 'vue'
import app from '../firebase/firebaseInit'
import Loading from './LoadingComponent.vue'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { useUserStore } from '../stores/auth'

const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
})

const loading = ref(false)
const userStore = useUserStore()

async function uploadReaction() {
  loading.value = true
  const db = getFirestore(app)
  await addDoc(collection(db, 'reactions'), {
    id: uuidv4(),
    score: props.score,
    dateUnix: new Date(),
    date: new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }),
    user: userStore.user?.uid,
  })
  loading.value = false
}

onMounted(async () => {
  if (userStore.isLoggedIn) {
    await uploadReaction()
  }
})
</script>

<template>
  <Loading v-show="loading" />
  <div v-show="!loading" class="result">
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
