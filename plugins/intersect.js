import Vue from 'vue';

Vue.directive('intersect', {
  bind(el, binding) {
    const options = {
      root: binding.value.root || null,
      rootMargin: binding.value.rootMargin || '0px',
      threshold: binding.value.threshold || 0,
    };

    el.__observer__ = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        binding.value.onIntersect();
      }
    }, options);

    el.__observer__.observe(el);
  },
  unbind(el) {
    if (el.__observer__) {
      el.__observer__.disconnect();
      delete el.__observer__;
    }
  },
});
