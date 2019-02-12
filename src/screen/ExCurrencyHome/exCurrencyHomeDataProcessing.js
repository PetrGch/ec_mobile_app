import moment from "moment";

export function processCentralBankData(centralBankData) {
  if (!centralBankData || !centralBankData.central_bank_details) {
    return null;
  }

  const lineData = ["sell price", "buy price"];
  const chartData = centralBankData.central_bank_details.map(detail => {
    const period = moment(detail.period).format("MM/DD");
    const parsedData = { period };

    parsedData["sell price"] = parseFloat(detail.sell_price).toFixed(3);
    parsedData["buy price"] = parseFloat(detail.buy_price).toFixed(3);

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
