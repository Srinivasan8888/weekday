import React, { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import './App.css';
import './component/css/topmenu.css';
import Cards from './component/Cards';

function App() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');


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
  
  const roleOptions = Array.from(new Set(jobs.map(job => job.jobRole).filter(Boolean)))
  .sort()
  .map(role => ({ label: role, value: role }));

  const experienceOptions = Array.from(new Set(jobs.flatMap(job => [job.minExp, job.maxExp])
  .filter(exp => exp !== null && exp !== undefined)
  .map(exp => exp.toString())))
  .sort((a, b) => a - b)
  .map(exp => ({ label: exp, value: exp }));

    const salaryOptions = Array.from(new Set(jobs.flatMap(job => {
      if (job.minJdSalary !== null && job.minJdSalary !== undefined && job.maxJdSalary !== null && job.maxJdSalary !== undefined) {
        return [
          { salary: job.minJdSalary, currency: job.salaryCurrencyCode },
          { salary: job.maxJdSalary, currency: job.salaryCurrencyCode }
        ];
      }
      return [];
    }).map(s => JSON.stringify(s))))
      .map(str => JSON.parse(str))
      .sort((a, b) => a.salary - b.salary)
      .map(s => ({ label: `${s.salary} ${s.currency}`, value: s.salary.toString() }));
    
    // const locationOptions = Array.from(new Set(jobs.map(job => job.location).filter(Boolean)))
    // .sort()
    // .map(location => ({ label: location, value: location }));
  
    const locationOptions = Array.from(new Set(jobs.map(job => job.location).filter(Boolean)))
  .sort();


  return (
    <div className="App">
      <div className="filter-bar">
        <div className="filter-item">
          <Multiselect options={roleOptions} displayValue="label" placeholder="Select Role" />
        </div>
        <div className="filter-item">
          <Multiselect options={experienceOptions} displayValue="label" placeholder="Select Experience" />
        </div>
        <div className="filter-item">
          <Multiselect options={salaryOptions} displayValue="label" placeholder="Select Salary" />
        </div>
        <div className="filter-item">
          <input
          type="text"
          placeholder="Select Location"
          list="location-list"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <datalist id="location-list">
          {locationOptions.map((loc, index) => (
            <option key={index} value={loc} />
          ))}
        </datalist>
        </div>
      </div>
      <div className='cards'>
        <Cards jobs={jobs} />
      </div>
    </div>
  );
}

export default App;
