<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useReactionStore } from '../stores/reaction'
import Loading from '../components/LoadingComponent.vue'
import ChartBar from '../components/ChartBar.vue'
import ChartLine from '../components/ChartLine.vue'

const currentDate = new Date()
const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' })

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

const scoresPerDay = ref({
  labels: [''],
  datasets: [
    {
      label: '',
      borderColor: '',
      backgroundColor: '',
      data: [0],
    },
  ],
})
const gamesPlayedPerDay = ref({
  labels: [''],
  datasets: [
    {
      label: '',
      borderColor: '',
      backgroundColor: '',
      data: [0],
    },
  ],
})

const allTimeScore = ref({
  labels: [''],
  datasets: [
    {
      label: '',
      backgroundColor: '',
      data: [0],
    },
  ],
})

const gamesPlayed = ref({
  labels: [''],
  datasets: [
    {
      label: '',
      backgroundColor: '',
      data: [0],
    },
  ],
})

const reactionStore = useReactionStore()

const bestScore = ref(0)
const averageToday = ref(0)
const averageMonth = ref(0)
const total = ref(0)

function createIndicators() {
  let sumTotalMonth = 0
  let sumTotalDay = 0
  let counterDay = 0

  reactionStore.reactionData.forEach((reaction) => {
    const date = new Date(reaction.date)
    if (
      date.getMonth() == currentDate.getMonth() &&
      date.getFullYear() == currentDate.getFullYear()
    )
      sumTotalMonth += reaction.score
    if (
      date.getMonth() == currentDate.getMonth() &&
      date.getDate() == currentDate.getDate() &&
      date.getFullYear() == currentDate.getFullYear()
    ) {
      counterDay += 1
      sumTotalDay += reaction.score
    }
  })

  bestScore.value = reactionStore.reactionData.sort(function (a, b) {
    return a.score - b.score
  })[0].score

  averageMonth.value = parseFloat(
    (sumTotalMonth / reactionStore.reactionData.length).toFixed(2)
  )

  if (counterDay > 0)
    averageToday.value = parseFloat((sumTotalDay / counterDay).toFixed(2))

  total.value = reactionStore.reactionData.length
}

function createGraph() {
  const daysLabel = [] as Array<string>
  const dataScoresPerDay = [] as Array<number>
  const dataGamesPlayedPerDay = [] as Array<number>
  const dataScoresPerMonth = [] as Array<number>
  const dataGamesPlayedPerMonth = [] as Array<number>

  const totalDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  for (let i = 1; i <= totalDays; i++) {
    daysLabel.push(`${i}`)
  }

  reactionStore.reactionData.forEach((reaction) => {
    const date = new Date(reaction.date)

    if (date.getFullYear() == currentDate.getFullYear()) {
      if (dataGamesPlayedPerDay[date.getDate()]) {
        dataGamesPlayedPerDay[date.getDate()] += 1
      } else {
        dataGamesPlayedPerDay[date.getDate()] = 1
      }

      if (dataScoresPerDay[date.getDate()]) {
        dataScoresPerDay[date.getDate()] += reaction.score
      } else {
        dataScoresPerDay[date.getDate()] = reaction.score
      }

      if (dataGamesPlayedPerMonth[date.getMonth() + 1]) {
        dataGamesPlayedPerMonth[date.getMonth() + 1] += 1
      } else {
        dataGamesPlayedPerMonth[date.getMonth() + 1] = 1
      }

      if (dataScoresPerMonth[date.getMonth() + 1]) {
        dataScoresPerMonth[date.getMonth() + 1] += reaction.score
      } else {
        dataScoresPerMonth[date.getMonth() + 1] = reaction.score
      }
    }
  })

  for (let i = 0; i < dataGamesPlayedPerMonth.length; i++) {
    if (!dataGamesPlayedPerMonth[i]) dataGamesPlayedPerMonth[i] = 0
    if (!dataScoresPerMonth[i]) dataScoresPerMonth[i] = 0

    if (dataScoresPerMonth[i] > 0 && dataGamesPlayedPerMonth[i] > 0) {
      dataScoresPerMonth[i] = dataScoresPerMonth[i] / dataGamesPlayedPerMonth[i]
    }
  }

  for (let i = 0; i < dataGamesPlayedPerDay.length; i++) {
    if (!dataGamesPlayedPerDay[i]) dataGamesPlayedPerDay[i] = 0
    if (!dataScoresPerDay[i]) dataScoresPerDay[i] = 0

    if (dataScoresPerDay[i] > 0 && dataGamesPlayedPerDay[i] > 0) {
      dataScoresPerDay[i] = dataScoresPerDay[i] / dataGamesPlayedPerDay[i]
    }
  }

  dataGamesPlayedPerDay.shift()
  dataScoresPerDay.shift()
  dataGamesPlayedPerMonth.shift()
  dataScoresPerMonth.shift()

  scoresPerDay.value = {
    labels: daysLabel,
    datasets: [
      {
        label: `Average Reaction Time per day in ${currentMonth}`,
        borderColor: '#e53265',
        backgroundColor: '#e53265',
        data: dataScoresPerDay,
      },
    ],
  }

  gamesPlayedPerDay.value = {
    labels: daysLabel,
    datasets: [
      {
        label: `Games played per day in ${currentMonth}`,
        borderColor: '#e53265',
        backgroundColor: '#e53265',
        data: dataGamesPlayedPerDay,
      },
    ],
  }

  allTimeScore.value = {
    labels: monthLabel,
    datasets: [
      {
        label: 'Average Reaction Time per month',
        backgroundColor: '#e53265',
        data: dataScoresPerMonth,
      },
    ],
  }

  gamesPlayed.value = {
    labels: monthLabel,
    datasets: [
      {
        label: 'Games Played per month',
        backgroundColor: '#e53265',
        data: dataGamesPlayedPerMonth,
      },
    ],
  }
}

onMounted(async () => {
  await reactionStore.getReactions()
  createIndicators()
  createGraph()
})
</script>

<template>
  <Loading v-show="!reactionStore.reactionsLoaded" />
  <main v-if="reactionStore.reactionData.length > 0" class="content">
    <section class="indicators">
      <div class="best-score">
        <div class="info">Best Score:</div>
        <div class="data">{{ bestScore }}ms</div>
      </div>
      <div class="average-day">
        <div class="info">Average today:</div>
        <div class="data">{{ averageToday }}ms</div>
      </div>
      <div class="average-month">
        <div class="info">Average month:</div>
        <div class="data">{{ averageMonth }}ms</div>
      </div>
      <div class="total-games">
        <div class="info">Total tests:</div>
        <div class="data">{{ total }}</div>
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
