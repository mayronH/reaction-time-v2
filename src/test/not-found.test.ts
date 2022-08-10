import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NotFound from '../views/404View.vue'

test('not found view', async () => {
  expect(NotFound).toBeTruthy()

  const wrapper = mount(NotFound)

  expect(wrapper.html()).toMatchSnapshot()
  expect(wrapper.text()).toContain('Page not Found')
})
