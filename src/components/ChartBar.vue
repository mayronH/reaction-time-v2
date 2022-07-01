<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartData,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  chartId: {
    type: String,
    default: 'bar-chart',
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
    type: Object as PropType<ChartData<'bar'>>,
    default: () => {
      null
    },
  },
})

const chartOptions = ref({ responsive: true })
</script>
<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="props.chartId"
    :css-classes="props.cssClasses"
    :styles="props.styles"
    :width="props.width"
    :height="props.height"
  />
</template>
