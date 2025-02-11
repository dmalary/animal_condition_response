import { useState, useEffect } from 'react'

import './App.css'

import { createClient } from "@supabase/supabase-js";
import { supaKey } from '../config';

  const supabase = createClient("https://xyvyhlsnixwgdenajxxk.supabase.co", supaKey);

  function App() {
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
      getInstruments();
    }, []);

    async function getInstruments() {
      const { data } = await supabase.from("incident").select();
      setIncidents(data);
    }

    return (
      <ul>
        {incidents.map((instrument) => (
          <li key={instrument.name}>{instrument.name}</li>
        ))}
      </ul>
    );
  }

  export default App;