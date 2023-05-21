const errorHandler = (error: any) => {
  const { response } = error;
  if (response?.data) {
    return alert(response.data.error);
  } else {
    if (error.message === "Network Error") alert("Network Error");
    else alert(error.message || "Something went wrong.");
  }
};

export default errorHandler;
