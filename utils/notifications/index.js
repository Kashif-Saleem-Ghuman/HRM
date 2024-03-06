
export function createNotificationObject({ text, variant }) {
    return { text, variant: variant ?? "danger" }
  }