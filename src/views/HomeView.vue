<script setup lang="ts">
import { ref } from 'vue'
import ResultReaction from '../components/ResultReaction.vue'
import ReactionTest from '../components/ReactionTest.vue'

const onGame = ref(false)
const gameBox = ref<HTMLElement>()
const showResult = ref(false)
const score = ref(0)

function startGame() {
  onGame.value = true
  if (gameBox.value) {
    gameBox.value.scrollIntoView()
  }
  showResult.value = false
}

function endGame(averageScore: number) {
  onGame.value = false
  score.value = averageScore
  showResult.value = true
}
</script>
<template>
  <main class="content">
    <section class="hero">
      <div class="heading">
        <h1>Reaction Time Test</h1>
      </div>

      <div class="content">
        <p>
          Click on the button to start the test. A box will appear after a
          random amount of time, try to click fast as possible but not before
          the box appears. The reaction time is the average of 5 scores
        </p>

        <button
          :disabled="onGame"
          class="btn btn-start"
          type="button"
          @click="startGame"
        >
          Start Test
        </button>
      </div>
    </section>

    <section ref="gameBox" class="game">
      <ReactionTest v-if="onGame" @end-game="endGame" />
      <ResultReaction v-if="showResult" :score="score" />
    </section>
  </main>
</template>

<style scoped>
.hero,
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--small-size-fluid);
}
h1 {
  text-transform: capitalize;
  text-align: center;
  font-size: var(--medium-size-fluid);
}
p {
  text-align: justify;
  color: var(--text-grey);
}
.btn-start:disabled {
  cursor: not-allowed;

  filter: grayscale(0.6);
}
.game {
  min-height: 80vh;
  width: 90vw;

  display: grid;
  place-items: center;

  margin-block: var(--small-size-fluid);

  border: 2px dashed var(--bg-lighter);
  border-radius: var(--border-radius);
}
@media (min-width: 768px) {
  .hero {
    flex-direction: row;
  }
  .heading {
    flex-basis: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .game {
    max-width: 728px;
  }
}
</style>
