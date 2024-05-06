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
            <div className="time-ago">
            <span>⌛</span>
            Posted 11 days ago
        </div>
            <div className="job-header">
              {job.logoUrl && <img src={job.logoUrl} alt={`${job.companyName} logo`} className="company-logo" />}
              <div className='job-content'>
    
                <div className='company-name'>{job.companyName && <p>{job.companyName}</p>}</div>
                <div className='job-role'>{job.jobRole && <p>{job.jobRole}</p>}</div>
                <div className='job-location'>{job.location && <p>{job.location}</p>}</div>
                
              </div>
            </div>
            {job.minJdSalary && job.maxJdSalary && (
              <div className="job-salary">
                <p>Estimated Salary: ${job.minJdSalary} - ${job.maxJdSalary} ✅</p>
              </div>
            )}
            <div className='About-dec'>
                <p className='About-company'>About Company</p>
                <p className='About-us'>About us</p>
            {job.jobDetailsFromCompany && (
              <div className="job-description">
                <p>{job.jobDetailsFromCompany}</p>
              </div>
            )}
            </div>
           

            <div className='exp'>
                <p  className='job-salary'>Minimum Experience</p>
               <div className='job-years'> {job.minExp || 'N/A'}-{job.maxExp || 'N/A'} years</div>
            </div>

            <div>
            {job.jdLink && (
                <a href={job.jdLink} target="_blank" rel="noopener noreferrer" className="apply-button">⚡Easy Apply</a>
              )}
            <div> {job.jdLink && (
                <a href={job.jdLink} target="_blank" rel="noopener noreferrer" className="referral-button">
                <img style={{ borderRadius: '50%', filter: 'blur(3px)' }}  src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg" width="30" height="30" alt="Philip Harbach"/>
                    <img style={{ borderRadius: '50%', filter: 'blur(3px)' }} src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg" width="30" height="30" alt="Profile of Alex Shatov - Click to unlock referral asks" />
                  Unlock referral asks
                </a>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    );
  };
  

export default Cards;
