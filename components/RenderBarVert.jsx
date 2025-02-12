/* eslint-disable react/prop-types */
import * as d3 from 'd3'
import { BarChart, Bar, XAxis, YAxis, } from 'recharts';


const RenderBarVert = ({data}) => {

  const boroughCounts = Array.from(
    d3.rollup(data, v => v.length, d => d.borough), 
    ([borough, count]) => ({ borough, count })
  );

  console.log('data', data);
  console.log('boroughCounts', boroughCounts)
  return (
    <>
      {/* <BarChart data={boroughCounts} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}> */}
      <BarChart width={400} height={400} data={boroughCounts}
        margin={{ bottom: 60 }}
      >
        <XAxis dataKey="borough" angle={-45} textAnchor="end" />
        <YAxis />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </>
  )
}
export default RenderBarVert;