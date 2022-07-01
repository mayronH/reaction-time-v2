<script setup lang="ts">
import { ref } from 'vue'
import Loading from '../components/LoadingComponent.vue'
import ChartBar from '../components/ChartBar.vue'
import ChartLine from '../components/ChartLine.vue'

const data = ref(true)

const monthLabel = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const currentMonth = new Date().toLocaleString('en-US', { month: 'long' })

const daysLabel = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
]

const gamesPlayedPerDay = ref({
  labels: daysLabel,
  datasets: [
    {
      label: `Games played per day in ${currentMonth}`,
      borderColor: '#e53265',
      backgroundColor: '#e53265',
      data: [40, 20, 12],
    },
  ],
})

const scoresPerDay = ref({
  labels: daysLabel,
  datasets: [
    {
      label: `Average Reaction Time per day in ${currentMonth}`,
      borderColor: '#e53265',
      backgroundColor: '#e53265',
      data: [40, 20, 12],
    },
  ],
})

const gamesPlayed = ref({
  labels: monthLabel,
  datasets: [
    {
      label: 'Games Played per month',
      backgroundColor: '#e53265',
      data: [40, 20, 12],
    },
  ],
})

const allTimeScore = ref({
  labels: monthLabel,
  datasets: [
    {
      label: 'Average Reaction Time per month',
      backgroundColor: '#e53265',
      data: [40, 20, 12],
    },
  ],
})
</script>
<template>
  <Loading v-show="false" />
  <main v-if="data" class="content">
    <section class="indicators">
      <div class="best-score">
        <div class="info">Best Score:</div>
        <div class="data">200ms</div>
      </div>
      <div class="average-day">
        <div class="info">Average today:</div>
        <div class="data">300ms</div>
      </div>
      <div class="average-month">
        <div class="info">Average month:</div>
        <div class="data">240ms</div>
      </div>
      <div class="total-games">
        <div class="info">Total tests:</div>
        <div class="data">40</div>
      </div>
    </section>

    <section class="graphs">
      <div class="month">
        <div class="scores">
          <h2>Average Reaction Time per day in {{ currentMonth }}</h2>
          <ChartLine :width="100" :height="50" :chart-data="scoresPerDay" />
        </div>
        <div class="games-played">
          <h2>Games Played per day in {{ currentMonth }}</h2>
          <ChartLine
            :width="100"
            :height="50"
            :chart-data="gamesPlayedPerDay"
          />
        </div>
      </div>

      <div class="all-time">
        <div class="scores">
          <h2>Average Reaction Time per month</h2>
          <ChartBar :width="100" :height="50" :chart-data="allTimeScore" />
        </div>
        <div class="games-played">
          <h2>Games Played per month</h2>
          <ChartBar :width="100" :height="50" :chart-data="gamesPlayed" />
        </div>
      </div>
    </section>
  </main>
  <main v-else class="empty">
    <svg
      width="100px"
      height="100px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.1213 21.364L19.2426 19.2427M21.364 17.1214L19.2426 19.2427M19.2426 19.2427L17.1213 17.1214M19.2426 19.2427L21.364 21.364"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 6V12C4 12 4 15 11 15C18 15 18 12 18 12V6"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11 3C18 3 18 6 18 6C18 6 18 9 11 9C4 9 4 6 4 6C4 6 4 3 11 3Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11 21C4 21 4 18 4 18V12"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <h2>No Data Found</h2>
    <p>Something went wrong or you didn't make any test</p>
  </main>
</template>

<style scoped>
.indicators {
  display: flex;
  flex-wrap: wrap;
  gap: var(--extra-small-size-fluid);

  background-color: var(--bg-medium);

  border-radius: var(--border-radius);

  padding: var(--medium-size-fluid);

  width: 100%;
}

.graphs {
  background-color: var(--bg-medium);

  border-radius: var(--border-radius);

  padding: var(--medium-size-fluid);

  width: 100%;

  margin-block: var(--medium-size-fluid);
}

.graphs > div {
  display: flex;
  flex-direction: column;
  text-align: center;

  margin-block: var(--small-size-fluid);
}

.indicators > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: var(--small-size-fluid);

  background-color: var(--bg-lighter);

  text-align: center;

  border-top: var(--extra-small-size-fluid) solid var(--accent);
  border-radius: var(--border-radius);
}

.info {
  color: var(--text-grey);
  font-size: var(--small-size-fluid);
  font-weight: 300;
  text-transform: capitalize;

  padding-bottom: var(--extra-small-size-fluid);
}

.data {
  color: var(--accent);
  font-size: var(--medium-size-fluid);
  font-weight: 300;

  line-height: 1;
}

.empty {
  display: grid;
  place-items: center;

  margin-block: var(--small-size-fluid);

  height: 100%;

  text-align: center;
}
.empty svg {
  color: var(--text-grey);
}

@media (min-width: 768px) {
  .graphs > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
