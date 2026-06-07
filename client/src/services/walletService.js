import API from "./api";

const getWallet = async () => {
  const response = await API.get("/wallet");
  return response.data;
};

const creditWallet = async (data) => {
  const response = await API.post("/wallet/credit", data);
  return response.data;
};

const debitWallet = async (data) => {
  const response = await API.post("/wallet/debit", data);
  return response.data;
};

export default {
  getWallet,
  creditWallet,
  debitWallet,
};