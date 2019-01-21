import moment from "moment";

export function processCentralBankData(centralBankData) {
  if (!centralBankData || !centralBankData.dataDetail) {
    return null;
  }

  const lineData = [];

  const chartData = centralBankData.dataDetail.map(data => {
    const period = moment(data.period).format("MM/DD");
    const parsedData = {period};
    Object.keys(data.lines).forEach(key => {
      const newField = key.replace("_", " ");
      if (lineData.indexOf(newField) === -1) {
        lineData.push(newField);
      }
      parsedData[newField] = parseFloat(data.lines[key]).toFixed(3);
    });

    return parsedData;
  });

  return { lineData, chartData }
}