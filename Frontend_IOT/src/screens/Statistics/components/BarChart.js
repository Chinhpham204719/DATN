import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { iDate } from '../../../utils/iDate';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
const BarChart = ({ deviceItem }) => {

  let label = []
  let gasvalue = []
  let humidity = []
  let temperature = []
  deviceItem?.forEach(element => {
    label.push(iDate(element?.at, '{j}/{n}/{f}, {h}:{m} '))
    gasvalue.push(element?.gasvalue)
    humidity.push(element?.humidity)
    temperature.push(element?.temperature)
  });
  label = label.slice(label?.length - 11, label?.length - 1).reverse()

  gasvalue = gasvalue.slice(gasvalue?.length - 11, gasvalue?.length - 1).reverse()

  humidity = humidity.slice(humidity?.length - 11, humidity?.length - 1).reverse()

  temperature = temperature.slice(temperature?.length - 11, temperature?.length - 1).reverse()

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', maxHeight:'100vh' }}>
      <Bar
        style={{ maxWidth: '50%', maxHeight:'50%' }}
        data={{
          labels: label,
          datasets: [
            {
              label: "gasvalue",
              backgroundColor: [
                "#FF6363",
              ],
              data: gasvalue
            }
          ]
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: "Statistics of Gas Value"
          }
        }}
      />
      <Bar
        style={{ maxWidth: '50%', maxHeight:'50%' }}
        data={{
          labels: label,
          datasets: [
            {
              label: "Humidity",
              backgroundColor: [
                "#FFFDA2",
              ],
              data: humidity
            }
          ]
        }}
        options={{
          legend: { display: false },

          title: {
            display: true,
            text: "Statistics of Humidity"
          }
        }}
      />
      <Bar
        style={{ maxWidth: '50%', maxHeight:'51%' }}
        data={{
          labels: label,
          datasets: [
            {
              label: "Temperature",
              backgroundColor: [
                "#BAFFB4",
              ],
              data: temperature
            }
          ]
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: "Statistics of Temperature"
          }
        }}
      />
    </div>
  )

}
export default BarChart
