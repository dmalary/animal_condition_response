import { useState, useEffect } from 'react'
import * as d3 from 'd3'

import './App.css'

import { createClient } from "@supabase/supabase-js";
import { supaKey } from '../config';

import Dropdown  from '../components/Dropdown';
import RenderLine from '../components/RenderLine';
import RenderBarVert from '../components/RenderBarVert'

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
      <div className='min-h-200'>
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <>
            <h1 className="text-lg font-bold">{selectedSpecies || "Pick a species"}</h1>
            <Dropdown data={dropdownDataArray} onSelect={setSelectedSpecies} />
            <RenderBarVert data={filterData}/>
            <RenderLine data={filterData}/>
          </>
        )}
      </div>
    );
  }

  export default App;