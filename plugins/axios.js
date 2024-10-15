export default function ({ $axios, redirect }) {
  
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (!(code >= 200 && code < 300)) {
      redirect('/server-error');
    }
  })
}
