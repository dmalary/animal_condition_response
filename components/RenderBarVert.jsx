/* eslint-disable react/prop-types */
import * as d3 from 'd3'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';



const RenderBarVert = ({data}) => {

  const boroughCounts = Array.from(
    d3.rollup(data, v => v.length, d => d.borough), 
    ([borough, count]) => ({ borough, count })
  );

  console.log('data', data);
  console.log('boroughCounts', boroughCounts)
  return (
    <>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={boroughCounts}
        margin={{ bottom: 50 }}
      >
        <XAxis dataKey="borough" angle={-45} textAnchor="end" />
        <YAxis />
        <Bar dataKey="count" fill="#0f61a9" />
      </BarChart>
      </ResponsiveContainer>
    </>
  )
}
export default RenderBarVert;