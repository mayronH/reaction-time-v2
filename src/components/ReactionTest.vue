<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const emit = defineEmits(['end-game'])

const delay = ref()
const showBox = ref(false)
const startTime = ref()
const timeout = ref()
const reactionTime = ref(0)
const counter = ref(0)
const score = ref(0)
const missClick = ref(false)

function playGame() {
  delay.value = 1000 + Math.random() * 5000
  missClick.value = false
  timeout.value = setTimeout(() => {
    showBox.value = true
    startTimer()
  }, delay.value)
}

onMounted(() => {
  playGame()
})

function startTimer() {
  startTime.value = Date.now()
}

function stopTimer() {
  reactionTime.value = Date.now()
  reactionTime.value = reactionTime.value - startTime.value
  score.value += reactionTime.value

  showBox.value = false
  clearTimeout(timeout.value)

  counter.value += 1
  playGame()
}

function handleMissClick() {
  clearTimeout(timeout.value)
  missClick.value = true
}

watch(
  () => counter.value,
  () => {
    if (counter.value == 5) {
      endGame(score.value / 5)
    }
  }
)

function endGame(averageScore: number) {
  emit('end-game', averageScore)
}
</script>
<template>
  <div class="tooFast" @click.self="handleMissClick">
    <div v-if="showBox && !missClick" class="box" @click="stopTimer">click</div>
    <div v-if="missClick" class="miss-click">
      <p>You clicked too soon</p>
      <button type="button" @click="playGame()">try again</button>
    </div>
  </div>
</template>

<style scoped>
.tooFast {
  width: 100%;
  height: 100%;

  padding: var(--small-size-fluid);

  display: flex;
  justify-content: center;
  align-items: center;
}
.miss-click {
  text-align: center;
}
.miss-click button {
  color: var(--accent);
  background-color: transparent;
  border: none;

  margin-top: var(--extra-small-size-fluid);
}
.miss-click button:is(:hover, :focus) {
  outline: 1px dashed var(--accent);
  outline-offset: 5px;
}
.box {
  background: var(--accent);

  width: 80vw;

  color: var(--white);
  font-size: var(--medium-size-fluid);
  text-align: center;

  padding: var(--large-size-fluid);
  margin: auto;

  border-radius: var(--border-radius);

  box-shadow: var(--box-shadow);
}
@media (min-width: 768px) {
  .box {
    width: 50%;
  }
}
</style>
