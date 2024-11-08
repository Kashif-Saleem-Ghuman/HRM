
export const apiError = (context, statusCode) => {

  switch (statusCode) {
    case 'ERR_NETWORK':
      return context.error({
        statusCode: statusCode,
        message: 'Error loading page',
        details: 'It looks like your internet connection is down. Please check it'
    });
    case 401:
      return context.error({
        statusCode: 401,
        message: 'Authentication Error',
        details: 'It might be your token has expired',
    });
    default:
      return context.error({
        statusCode: statusCode,
        message: 'An unexpected server error occurred',
        details: 'Please try again later or contact support if the issue persists'
      });
  }

}

export default (context, inject) => {
  inject('apiError', (statusCode) => apiError(context, statusCode));
};


