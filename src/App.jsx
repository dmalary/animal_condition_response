import { useState, useEffect } from 'react'
import * as d3 from 'd3'

import './App.css'

import { createClient } from "@supabase/supabase-js";
import { supaKey } from '../config';

  const supabase = createClient("https://xyvyhlsnixwgdenajxxk.supabase.co", supaKey);

  function App() {
    const [loading, setLoading] = useState(true); 
    const [incidents, setIncidents] = useState([]);
    const [error, setError] = useState(null); 

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

    // console.log('incidents', incidents)
    const dropdownDataMap = d3.rollup(incidents, v => v.length, inc => inc.species_description); 

    const dropdownDataArray = Array.from(dropdownDataMap.keys());

    incidents && console.log('dropdownDataArray', dropdownDataArray);

    return (
      <>
        <div>
        {/* {loading && <p>Loading incidents...</p>} */}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          incidents.length
        )}
        </div>
      </>
    );
  }

  export default App;