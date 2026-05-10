import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays, format } from "date-fns";

const LearningHeatmap = ({ activityLog }) => {
  const today = new Date();
  const endDate = today;
  const startDate = subDays(today, 365);

  // Convert activityLog into the required format
  const heatmapData = Array.from({ length: 366 }, (_, i) => {
    const date = format(subDays(today, i), "yyyy-MM-dd");
    return {
      date,
      count: activityLog[date] || 0, // Use the count from activityLog, or 0 if no data exists for the date
    };
  });

  return (
    <div className="p-5 border shadow-lg rounded-lg">
      <h2 className="text-lg mb-5">Your learning Heatmap throughout the year</h2>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return "color-empty";
          }
          return `color-gitlab-${Math.min(value.count, 4)}`; // Limit count to a max scale of 4 for consistent styling
        }}
        tooltipDataAttrs={(value) => ({
          "data-tip": value.date
            ? `${value.date}: ${value.count} activities`
            : "No activity",
        })}
      />
    </div>
  );
};

export default LearningHeatmap;
