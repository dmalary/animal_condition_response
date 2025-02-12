/* eslint-disable react/prop-types */
import * as d3 from 'd3'
import { Radar, RadarChart, 
  // PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';


const RenderRadar = ({data}) => {
 
  const radarData = Array.from(
    d3.rollup(data, v => v.length, el => el.animal_condition),
    ([condition, count]) => ({ condition, count })
  );
  
  // console.log('data', data);
  // console.log('radarData', radarData)

  return (
    <>
      {(radarData.length > 0 && radarData.length <= 2 ) ?
      <div>Not enough data available</div>  
      :
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData} width={400} height={400}>
          {/* <PolarGrid />
          <PolarAngleAxis dataKey="condition" />
          <PolarRadiusAxis /> */}
          <Radar dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
        }
    </>
  )
}
export default RenderRadar;