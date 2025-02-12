/* eslint-disable react/prop-types */
import { LineChart, Line } from 'recharts';

const RenderLine = ({data}) => {
  console.log('data', data)

  const formattedData = data.map(d => ({
    ...d,
    ranger_response_datetime: new Date(d.ranger_response_datetime).getHours(), 
  }));
  console.log('formattedData', formattedData)
  return (
    <>
    <LineChart width={600} height={200} data={formattedData}>
      <Line type="monotone" dataKey="ranger_response_datetime" stroke="#8884d8" />
    </LineChart>
    </>
  )
}
export default RenderLine;