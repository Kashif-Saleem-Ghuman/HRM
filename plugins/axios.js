export default function ({ $axios, redirect, error: nuxtError  }) {

  $axios.onError(error => {
    console.log('axios_plugin_Error', error)
    const code = parseInt(error.response && error.response.status);

    if(code === 500 || code === 400) {
      nuxtError({
        statusCode: code,
        message: error?.response?.data?.message,
      })
    }
    if(error?.code === "ERR_NETWORK") {
      nuxtError({
        statusCode: 503,
        message: 'Network Error. Please check your internet connection.'
      })
    }
  })
}
