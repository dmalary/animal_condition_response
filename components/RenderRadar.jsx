/* eslint-disable react/prop-types */
import * as d3 from 'd3'
import { Radar, RadarChart, ResponsiveContainer, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const RenderRadar = ({data}) => {

  const categories = ["Unhealthy", "N/A", "Healthy", "Injured", "DOA",  ];

  // Aggregate data with D3
  const rawRadarData = Array.from(
    d3.rollup(data, v => v.length, el => el.animal_condition),
    ([condition, count]) => ({ condition, count })
  );

  // Ensure all categories are present, defaulting to 0 if missing
  const radarData = categories.map(condition => ({
    condition,
    count: rawRadarData.find(d => d.condition === condition)?.count || 0
  }));

  // console.log('data', data);
  console.log('radarData', radarData)

  return (
    <>
    <ResponsiveContainer width="100%" height="100%">
      {(radarData.length > 0 && radarData.length <= 2 ) ?
      <div>Not enough data available</div>  
      :
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData} width={400} height={400}>
          <PolarGrid />
          <PolarAngleAxis dataKey="condition" />
          <PolarRadiusAxis />
          <Radar dataKey="count" stroke="#0f61a9" fill="#0f61a9" fillOpacity={0.6} />
        </RadarChart>
        }
    </ResponsiveContainer>
    </>
  )
}
export default RenderRadar;