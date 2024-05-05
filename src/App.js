import React, { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import './App.css';
import './component/css/topmenu.css';
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
  const roleOptions = jobs.map(job => job.jobRole).filter(Boolean).map(role => ({ label: role, value: role }));
  const experienceOptions = jobs
    .flatMap(job => [job.minExp, job.maxExp])
    .filter(exp => exp !== null && exp !== undefined)
    .map(exp => ({ label: exp.toString(), value: exp.toString() }));
  const salaryOptions = jobs
    .flatMap(job => {
      if (job.minJdSalary !== null && job.minJdSalary !== undefined && job.maxJdSalary !== null && job.maxJdSalary !== undefined) {
        return [
          { salary: job.minJdSalary, currency: job.salaryCurrencyCode },
          { salary: job.maxJdSalary, currency: job.salaryCurrencyCode }
        ];
      }
      return [];
    })
    .map(s => ({ label: `${s.salary} ${s.currency}`, value: s.salary.toString() }));
  const locationOptions = jobs.map(job => job.location).filter(Boolean).map(location => ({ label: location, value: location }));

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
          <Multiselect options={locationOptions} displayValue="label" placeholder="Select Location" />
        </div>
      </div>
      <div className='cards'>
        <Cards jobs={jobs} />
      </div>
    </div>
  );
}

export default App;
