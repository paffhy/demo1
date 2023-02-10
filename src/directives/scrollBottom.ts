import type { Directive } from 'vue'
let toBottom: () => void
export default {
  mounted(el: HTMLElement, binding: any) {
    toBottom = () => {
      if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
        binding.value()
      }
    }
    el.addEventListener('scroll', toBottom)
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('scroll', toBottom)
  },
} as Directive
