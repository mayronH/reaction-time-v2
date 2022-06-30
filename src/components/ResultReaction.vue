<script setup lang="ts">
const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="result">
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
