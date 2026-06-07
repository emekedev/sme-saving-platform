import API from "./api";

const getTransactions = async () => {
  const response = await API.get("/transactions");
  return response.data;
};

export default {
  getTransactions,
};