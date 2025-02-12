/* eslint-disable react/prop-types */
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const RenderScatter = ({data}) => {
  

  // Step 1: Aggregate counts by day of the week
  const countsByDay = data.reduce((acc, d) => {
    const day = new Date(d.initial_call_datetime).getDay(); // 0 = Sunday, ..., 6 = Saturday
    acc[day] = (acc[day] || 0) + 1; // Increment count for the day
    return acc;
  }, {});

  // Step 2: Convert aggregated data into scatter plot format
  const scatterData = Object.entries(countsByDay).map(([day, count]) => ({
    x: dayLabels[Number(day)], // Convert numeric day to label
    y: count,
  }));

  scatterData.sort((a, b) => dayLabels.indexOf(a.x) - dayLabels.indexOf(b.x));

  // console.log('data', data)
  console.log('scatterData', scatterData)
  return (
    <>
      {scatterData.length > 0 && 
        <ScatterChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20,}}
        width={600} height={200}
        >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis type="category" dataKey="x" name="day" tick={{ fontSize: 12 }}  />
        <YAxis type="number" dataKey="y" name="count" />
        {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
        <Scatter  data={scatterData} fill="#8884d8" />
      </ScatterChart>
      }
    </>
  )
}
export default RenderScatter;