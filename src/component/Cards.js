import React from 'react';
import "./css/card.css"; 

const Cards = ({ jobs }) => {
    if (!jobs.length) {
      return <div>Loading jobs...</div>;
    }
  
    return (
      <div className="card-container">
        {jobs.map((job) => (
          <div key={job.jdUid} className="job-card">
            <div className="job-header">
              {job.logoUrl && <img src={job.logoUrl} alt={`${job.companyName} logo`} className="company-logo" />}
              <div className='job-content'>
                {job.jobRole && <h>{job.jobRole}</h>}
                {job.companyName && <h3>{job.companyName}</h3>}
                {job.location && <p>{job.location}</p>}
                
              </div>
            </div>
            {job.minJdSalary && job.maxJdSalary && (
              <div className="job-salary">
                <p>Estimated Salary: ${job.minJdSalary} - ${job.maxJdSalary} ✅</p>
              </div>
            )}
            {job.jobDetailsFromCompany && (
              <div className="job-description">
                <p>{job.jobDetailsFromCompany}</p>
              </div>
            )}

<p>Exp: {job.minExp || 'N/A'}-{job.maxExp || 'N/A'} years</p>
            {job.jdLink && (
              <a href={job.jdLink} target="_blank" rel="noopener noreferrer" className="apply-button">⚡Easy Apply</a>
            )}
          </div>
        ))}
      </div>
    );
  };
  

export default Cards;
