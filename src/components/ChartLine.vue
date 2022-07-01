<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  ChartData,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

const props = defineProps({
  chartId: {
    type: String,
    default: 'line-chart',
  },
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 400,
  },
  cssClasses: {
    default: '',
    type: String,
  },
  styles: {
    type: Object as PropType<Partial<CSSStyleDeclaration>>,
    default: () => {
      null
    },
  },
  chartData: {
    type: Object as PropType<ChartData<'line'>>,
    default: () => {
      null
    },
  },
})

const chartOptions = ref({ responsive: true })
</script>
<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="props.chartId"
    :css-classes="props.cssClasses"
    :styles="props.styles"
    :width="props.width"
    :height="props.height"
  />
</template>
