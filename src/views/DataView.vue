<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useReactionStore } from '../stores/reaction'
import Loading from '../components/LoadingComponent.vue'
import ChartBar from '../components/ChartBar.vue'
import ChartLine from '../components/ChartLine.vue'
import { useUserStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'

const currentDate = new Date()
const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' })

const themeStore = useThemeStore()

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

const userStore = useUserStore()

function createIndicators() {
  let sumTotalMonth = 0
  let sumTotalDay = 0
  let countDay = 0
  let countMonth = 0

  reactionStore.reactionData.forEach((reaction) => {
    const date = new Date(reaction.date)
    if (
      date.getMonth() == currentDate.getMonth() &&
      date.getFullYear() == currentDate.getFullYear()
    ) {
      sumTotalMonth += reaction.score
      countMonth += 1
    }
    if (
      date.getMonth() == currentDate.getMonth() &&
      date.getDate() == currentDate.getDate() &&
      date.getFullYear() == currentDate.getFullYear()
    ) {
      countDay += 1
      sumTotalDay += reaction.score
    }
  })

  if (reactionStore.reactionData.length > 0) {
    bestScore.value = reactionStore.reactionData.sort(function (a, b) {
      return a.score - b.score
    })[0].score

    averageMonth.value = parseFloat((sumTotalMonth / countMonth).toFixed(2))

    if (countDay > 0)
      averageToday.value = parseFloat((sumTotalDay / countDay).toFixed(2))

    total.value = reactionStore.reactionData.length
  }
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
      if (date.getMonth() == currentDate.getMonth()) {
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
        borderColor: themeStore.accentColor,
        backgroundColor: themeStore.accentColor,
        data: dataScoresPerDay,
      },
    ],
  }

  gamesPlayedPerDay.value = {
    labels: daysLabel,
    datasets: [
      {
        label: `Games played per day in ${currentMonth}`,
        borderColor: themeStore.accentColor,
        backgroundColor: themeStore.accentColor,
        data: dataGamesPlayedPerDay,
      },
    ],
  }

  allTimeScore.value = {
    labels: monthLabel,
    datasets: [
      {
        label: 'Average Reaction Time per month',
        backgroundColor: themeStore.accentColor,
        data: dataScoresPerMonth,
      },
    ],
  }

  gamesPlayed.value = {
    labels: monthLabel,
    datasets: [
      {
        label: 'Games Played per month',
        backgroundColor: themeStore.accentColor,
        data: dataGamesPlayedPerMonth,
      },
    ],
  }
}

onMounted(async () => {
  if (userStore.isLoggedIn) {
    await reactionStore.getReactions()
    createIndicators()
    createGraph()
  }
})

watch(
  () => themeStore.accentColor,
  () => {
    createGraph()
  }
)
</script>

<template>
  <Loading v-show="!reactionStore.reactionsLoaded && userStore.isLoggedIn" />
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

  <main v-else-if="userStore.user === null" class="login">
    <h2>
      Login with github account to save your reaction time and display your data
    </h2>
    <button
      type="button"
      role="menuitem"
      class="github"
      @click="userStore.loginWithGit"
    >
      <svg
        width="256px"
        height="250px"
        viewBox="0 0 256 250"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid"
      >
        <g>
          <path
            d="M128.00106,0 C57.3172926,0 0,57.3066942 0,128.00106 C0,184.555281 36.6761997,232.535542 87.534937,249.460899 C93.9320223,250.645779 96.280588,246.684165 96.280588,243.303333 C96.280588,240.251045 96.1618878,230.167899 96.106777,219.472176 C60.4967585,227.215235 52.9826207,204.369712 52.9826207,204.369712 C47.1599584,189.574598 38.770408,185.640538 38.770408,185.640538 C27.1568785,177.696113 39.6458206,177.859325 39.6458206,177.859325 C52.4993419,178.762293 59.267365,191.04987 59.267365,191.04987 C70.6837675,210.618423 89.2115753,204.961093 96.5158685,201.690482 C97.6647155,193.417512 100.981959,187.77078 104.642583,184.574357 C76.211799,181.33766 46.324819,170.362144 46.324819,121.315702 C46.324819,107.340889 51.3250588,95.9223682 59.5132437,86.9583937 C58.1842268,83.7344152 53.8029229,70.715562 60.7532354,53.0843636 C60.7532354,53.0843636 71.5019501,49.6441813 95.9626412,66.2049595 C106.172967,63.368876 117.123047,61.9465949 128.00106,61.8978432 C138.879073,61.9465949 149.837632,63.368876 160.067033,66.2049595 C184.49805,49.6441813 195.231926,53.0843636 195.231926,53.0843636 C202.199197,70.715562 197.815773,83.7344152 196.486756,86.9583937 C204.694018,95.9223682 209.660343,107.340889 209.660343,121.315702 C209.660343,170.478725 179.716133,181.303747 151.213281,184.472614 C155.80443,188.444828 159.895342,196.234518 159.895342,208.176593 C159.895342,225.303317 159.746968,239.087361 159.746968,243.303333 C159.746968,246.709601 162.05102,250.70089 168.53925,249.443941 C219.370432,232.499507 256,184.536204 256,128.00106 C256,57.3066942 198.691187,0 128.00106,0 Z M47.9405593,182.340212 C47.6586465,182.976105 46.6581745,183.166873 45.7467277,182.730227 C44.8183235,182.312656 44.2968914,181.445722 44.5978808,180.80771 C44.8734344,180.152739 45.876026,179.97045 46.8023103,180.409216 C47.7328342,180.826786 48.2627451,181.702199 47.9405593,182.340212 Z M54.2367892,187.958254 C53.6263318,188.524199 52.4329723,188.261363 51.6232682,187.366874 C50.7860088,186.474504 50.6291553,185.281144 51.2480912,184.70672 C51.8776254,184.140775 53.0349512,184.405731 53.8743302,185.298101 C54.7115892,186.201069 54.8748019,187.38595 54.2367892,187.958254 Z M58.5562413,195.146347 C57.7719732,195.691096 56.4895886,195.180261 55.6968417,194.042013 C54.9125733,192.903764 54.9125733,191.538713 55.713799,190.991845 C56.5086651,190.444977 57.7719732,190.936735 58.5753181,192.066505 C59.3574669,193.22383 59.3574669,194.58888 58.5562413,195.146347 Z M65.8613592,203.471174 C65.1597571,204.244846 63.6654083,204.03712 62.5716717,202.981538 C61.4524999,201.94927 61.1409122,200.484596 61.8446341,199.710926 C62.5547146,198.935137 64.0575422,199.15346 65.1597571,200.200564 C66.2704506,201.230712 66.6095936,202.705984 65.8613592,203.471174 Z M75.3025151,206.281542 C74.9930474,207.284134 73.553809,207.739857 72.1039724,207.313809 C70.6562556,206.875043 69.7087748,205.700761 70.0012857,204.687571 C70.302275,203.678621 71.7478721,203.20382 73.2083069,203.659543 C74.6539041,204.09619 75.6035048,205.261994 75.3025151,206.281542 Z M86.046947,207.473627 C86.0829806,208.529209 84.8535871,209.404622 83.3316829,209.4237 C81.8013,209.457614 80.563428,208.603398 80.5464708,207.564772 C80.5464708,206.498591 81.7483088,205.631657 83.2786917,205.606221 C84.8005962,205.576546 86.046947,206.424403 86.046947,207.473627 Z M96.6021471,207.069023 C96.7844366,208.099171 95.7267341,209.156872 94.215428,209.438785 C92.7295577,209.710099 91.3539086,209.074206 91.1652603,208.052538 C90.9808515,206.996955 92.0576306,205.939253 93.5413813,205.66582 C95.054807,205.402984 96.4092596,206.021919 96.6021471,207.069023 Z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
      Login
    </button>
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
main.content {
  margin-block: var(--small-size-fluid);
}
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

.empty,
.login {
  display: grid;
  place-items: center;

  margin-block: var(--small-size-fluid);

  height: 100%;

  text-align: center;
}
.empty svg {
  color: var(--text-grey);
}

.login h2 {
  margin-bottom: var(--medium-size-fluid);
}

.github {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--small-size-fluid);

  background-color: var(--accent);

  color: var(--bg-dark);
  font-size: var(--medium-size-fluid);
  font-weight: 600;

  padding: 0.25rem var(--extra-small-size-fluid);

  border-radius: var(--border-radius);
  border: none;
}
.github svg {
  width: var(--medium-size-fluid);
  height: var(--medium-size-fluid);
}
@media (min-width: 768px) {
  .graphs > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
