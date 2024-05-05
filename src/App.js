import React, { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import './App.css';
import Topmenu from './component/Topmenu';
import Cards from './component/Cards';

function App() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers({
          "Content-Type": "application/json"
        });

        const body = JSON.stringify({
          "limit": 10,
          "offset": 0
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: body
        };

        const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.jdList || !Array.isArray(data.jdList)) {
          throw new Error('Data format error: expected an array of jobs');
        }
        setJobs(data.jdList);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Extract options
  const salaryOptions = [...new Set(jobs.map(job => job.minJdSalary).filter(salary => salary !== null))];
  const experienceOptions = [...new Set([...jobs.map(job => job.minExp), ...jobs.map(job => job.maxExp)].filter(exp => exp !== null))];
  const roleOptions = [...new Set(jobs.map(job => job.jobRole))];
  const locationOptions = [...new Set(jobs.map(job => job.location))];

  // Filter out undefined values
  const filteredSalaryOptions = salaryOptions.filter(option => option !== undefined);
  const filteredExperienceOptions = experienceOptions.filter(option => option !== undefined);
  const filteredRoleOptions = roleOptions.filter(option => option !== undefined);
  const filteredLocationOptions = locationOptions.filter(option => option !== undefined);

  return (
    <div className="App">
      <Topmenu salaryOptions={filteredSalaryOptions} experienceOptions={filteredExperienceOptions} roleOptions={filteredRoleOptions} locationOptions={filteredLocationOptions} />
      <div className='cards'>
      <Cards jobs={jobs} />
      </div>
    </div>
  );
}

export default App;
