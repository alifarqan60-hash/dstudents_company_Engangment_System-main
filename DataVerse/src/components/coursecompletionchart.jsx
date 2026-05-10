import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const CourseCompletionPieChart = ({ completedPercentage }) => {
  const data = {
    labels: ['Completed', 'Incomplete'],
    datasets: [
      {
        data: [completedPercentage, 100 - completedPercentage],
        backgroundColor: ['#2D9CDB','#E6F7FF'],
        hoverBackgroundColor: ['#2D9CDB','#E6F7FF'],
        borderWidth:0
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="relative w-28 h-28">
      <Pie data={data} options={options} />
    </div>
  );
};

export default CourseCompletionPieChart;
