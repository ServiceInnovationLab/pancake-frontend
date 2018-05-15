export const sendTotalIncome = (totalIncome) => {
  return {
    type: 'SEND_TOTAL_INCOME',
    payload: totalIncome
  };
};
