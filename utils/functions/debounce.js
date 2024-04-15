export function debounceAction(action) {
    if (!this.debounced) {
      this.debounced = true;
      setTimeout(() => {
        action();
        setTimeout(() => {
          this.debounced = false;
        }, 3000);
      }, 0);
    }
  }
