

export const createConfig = () => {
  const store = window.$nuxt.$store
  return { 
    headers: {
      common: {
        Authorization: "Bearer " + store.state.token.accessToken
      }
    }
  }
}