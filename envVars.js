const getEnvVariables = async () => {
  if (process.env.NODE_ENV === 'development') {
    const dotenv = await import('dotenv');
    dotenv.config();
  }

  return {
    PORT: process.env.PORT || 3000,
    BASE_URL_NAGER: process.env.BASE_URL_NAGER,
    BASE_URL_COUNTRIESNOW: process.env.BASE_URL_COUNTRIESNOW,
  };
};

export const { PORT, BASE_URL_NAGER, BASE_URL_COUNTRIESNOW } = await getEnvVariables();
