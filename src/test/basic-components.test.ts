import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import router from '../router'

import NavigationBar from '../components/NavigationBar.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ChartLine from '../components/ChartLine.vue'
import ChartBar from '../components/ChartBar.vue'
import LoadingComponent from '../components/LoadingComponent.vue'
import ResultReaction from '../components/ResultReaction.vue'

test('NavigationBar', async () => {
  expect(NavigationBar).toBeTruthy()

  const wrapper = mount(NavigationBar, {
    global: {
      plugins: [createTestingPinia(), router],
    },
  })

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.find('.btn-menu').trigger('click')

  expect(wrapper.find('.btn-menu').attributes('aria-expanded')).toBe('true')
})

test('mount FooterComponent', async () => {
  expect(FooterComponent).toBeTruthy()

  const wrapper = mount(FooterComponent)

  expect(wrapper.text()).toContain('mayronH')
  expect(wrapper.html()).toMatchSnapshot()
})

// test('mount ChartBar', async () => {
//   expect(ChartBar).toBeTruthy()

//   const wrapper = mount(ChartBar, {
//     props: {
//       chartData: {
//         labels: 'Test',
//         datasets: [
//           {
//             label: 'Test ChartBar',
//             data: [1, 2, 3, 4, 5],
//           },
//         ],
//       },
//     },
//   })

//   expect(wrapper.html()).toMatchSnapshot()
// })

// test('mount ChartLine', async () => {
//   expect(ChartLine).toBeTruthy()

//   const wrapper = mount(ChartLine, {
//     props: {
//       chartData: {
//         labels: 'Test',
//         datasets: [
//           {
//             label: 'Test ChartLine',
//             data: [1, 2, 3, 4, 5],
//           },
//         ],
//       },
//     },
//   })

//   expect(wrapper.html()).toMatchSnapshot()
// })

test('mount LoadingComponent', async () => {
  expect(LoadingComponent).toBeTruthy()

  const wrapper = mount(LoadingComponent)

  expect(wrapper.html()).toMatchSnapshot()
})

test('mount ResultReaction', async () => {
  expect(ResultReaction).toBeTruthy()

  const wrapper = mount(ResultReaction, {
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      score: 200,
    },
  })

  expect(wrapper.text()).toContain('200 ms')
  expect(wrapper.html()).toMatchSnapshot()
})
