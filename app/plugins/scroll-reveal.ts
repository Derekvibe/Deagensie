import type { DirectiveBinding } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(
      el: HTMLElement,
      binding: DirectiveBinding<string | { animation?: string; delay?: number; duration?: number }>
    ) {
      if (typeof window === 'undefined') return;

      let animationClass = 'reveal-fade-up';
      let delayMs = 0;

      if (typeof binding.value === 'string') {
        animationClass = binding.value;
      } else if (typeof binding.value === 'object' && binding.value !== null) {
        if (binding.value.animation) animationClass = binding.value.animation;
        if (binding.value.delay) delayMs = binding.value.delay;
      }

      el.classList.add('reveal-hidden', animationClass);
      if (delayMs > 0) {
        el.style.transitionDelay = `${delayMs}ms`;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add('reveal-visible');
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      observer.observe(el);
    },
  });
});
