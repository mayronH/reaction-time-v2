import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ReactionTest from '../components/ReactionTest.vue'

test('mount ReactionTest', async () => {
  expect(ReactionTest).toBeTruthy()

  const wrapper = mount(ReactionTest)

  expect(wrapper.html()).toMatchSnapshot()
})

test('handle miss click', async () => {
  const wrapper = mount(ReactionTest)

  await wrapper.find('.tooFast').trigger('click')

  expect(wrapper.text()).toContain('You clicked too soon')
})

test('handle play again', async () => {
  const wrapper = mount(ReactionTest)

  await wrapper.find('.tooFast').trigger('click')

  await wrapper.find('button').trigger('click')

  expect(wrapper.text()).toContain('')
})

// test('handle click on box', async () => {
//   const wrapper = mount(ReactionTest)

//   await wrapper.find('.box').trigger('click')

//   expect(wrapper.text()).toContain('')
// })
