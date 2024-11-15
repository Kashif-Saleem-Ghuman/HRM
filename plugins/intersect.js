import Vue from 'vue';

Vue.directive('intersect', {
  bind(el, binding) {
    const options = {
      root: binding.value.root || null,
      rootMargin: binding.value.rootMargin || '0px',
      threshold: binding.value.threshold || 0,
    };

    const callback = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        console.log('Element is intersecting');
        if (typeof binding.value.onIntersect === 'function') {
          binding.value.onIntersect(); // Trigger the callback
        } else {
          console.warn('onIntersect is not a function');
        }
      }
    };

    // Add observer to element
    el.__observer__ = new IntersectionObserver(callback, options);
    el.__observer__.observe(el);
  },
  unbind(el) {
    if (el.__observer__) {
      el.__observer__.disconnect();
      delete el.__observer__;
    }
  },
});
