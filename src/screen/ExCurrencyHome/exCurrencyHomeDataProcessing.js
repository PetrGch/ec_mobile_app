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

export function adaptCentralBankDataForChart(chartData) {
  return chartData.reduce((dataItemAcc, dataItem) => {
      return {
        labels: [...dataItemAcc.labels, dataItem.period],
        datasets: [
          {
            ...dataItemAcc.datasets[0],
            data: [...dataItemAcc.datasets[0].data, dataItem["sell price"]]
          },
          {
            ...dataItemAcc.datasets[1],
            data: [...dataItemAcc.datasets[1].data, dataItem["buy price"]]
          }
        ]
      }
    },
    {
      labels: [],
      datasets: [
        {
          data: [],
          color: (opacity = 1) => `rgba(133, 191, 75, ${opacity})`
        }, {
          data: [],
          color: (opacity = 1) => `rgba(80, 191, 191, ${opacity})`
        }
      ]
    });
}
