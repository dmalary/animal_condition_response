import { useState, useEffect } from 'react'
import * as d3 from 'd3'

import './App.css'

import { createClient } from "@supabase/supabase-js";
import { supaKey } from '../config';

import Dropdown  from '../components/Dropdown';
import RenderBarVert from '../components/RenderBarVert'
import RenderRadar from '../components/RenderRadar'
import RenderScatter from '../components/RenderScatter'

  const supabase = createClient("https://xyvyhlsnixwgdenajxxk.supabase.co", supaKey);

  function App() {
    const [loading, setLoading] = useState(true); 
    const [incidents, setIncidents] = useState([]);
    const [error, setError] = useState(null); 
    const [selectedSpecies, setSelectedSpecies] = useState(null);

    useEffect(() => {
      getIncidents();
    }, []);

    async function getIncidents() {
      try {
        setLoading(true); // Start loading
        const { data, error } = await supabase.from("urban_park_ranger_animal_response").select();
  
        if (error) throw error; 
        setIncidents(data);
  
      } catch (err) {
        setError(err.message); 
  
      } finally {
        setLoading(false); // Stop loading
      }
    }

    
    const dropdownDataMap = d3.rollup(incidents, v => v.length, inc => inc.species_description); 

    const dropdownDataArray = Array.from(dropdownDataMap.keys());

    const filterData = incidents.filter(el => el.species_description === selectedSpecies);

    // console.log('incidents', incidents)
    // incidents && console.log('dropdownDataArray', dropdownDataArray);
    // console.log('selectedSpecies', selectedSpecies)
    // console.log('timeData', timeData)

    return (
      <div className='min-h-200 md:min-w-200'>
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          // <div className='grid grid-cols-1 md:grid-cols-4 md:gap-4 mx-auto'>
          //   <div className='col-span-4 text-left'>
          <div className="max-w-6xl mx-auto">
          {/* HEADER & DROPDOWN */}
            <div className="text-left mb-6">
              <h1 className="text-lg font-bold md:max-w-130 mt-2 mb-4">NYC Parks Animal Condition Response</h1>
              <hr className="title-divider md:w-100 h-2 my-5 border-0 rounded-sm"></hr>
              <p className="max-w-2xl py-2">This dashboard provides insights into the responses of urban park rangers to animal incidents. Select a species from the dropdown menu to explore data on:</p>
              <ul className='max-w-2xl py-2"'>
                <li className='py-1'><strong>Incident Counts by Borough:</strong> View the number of incidents per borough.</li>
                <li className='py-1'><strong>Animal Condition During Rescue:</strong> Examine the condition of the animals during their rescue.</li>
                <li className='py-1'><strong>Weekday Distribution of Incidents:</strong> See how incidents are spread across different days of the week.</li>
              </ul>
              <hr className="title-divider h-0.5 my-5 border-0 rounded-sm"></hr>
              <div className='my-4'>
              <h2 className="text-lg font-bold my-4">{selectedSpecies || "Pick a species"}</h2>
                <Dropdown data={dropdownDataArray} onSelect={setSelectedSpecies} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full p-4 pl-0 pb-2 bg-white shadow rounded-lg w-100 h-100">
                <RenderBarVert data={filterData} />
              </div>

              <div className="w-full p-4 bg-white shadow rounded-lg w-100 h-100">
                <RenderRadar data={filterData} />
              </div>

              <div className="w-full md:col-span-2 p-4 bg-white shadow rounded-lg">
                {/* <RenderScatter data={filterData} /> */}
              </div>
            </div>

            {/* <div className='col-span-2 mx-auto'>
              <RenderBarVert data={filterData}/>
            </div>
            <div className='col-span-2 mx-auto'>
              <RenderRadar data={filterData}/>
            </div>
            <div className='col-span-4 mx-auto'>
              <RenderScatter data={filterData}/>
            </div> */}
          </div>
        )}
      </div>
    );
  }

  export default App;