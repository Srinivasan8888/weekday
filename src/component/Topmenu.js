import React from 'react';
import Multiselect from 'multiselect-react-dropdown';
import "./css/topmenu.css"

const Topmenu = ({ salaryOptions, experienceOptions, roleOptions, locationOptions }) => {
  // Filter out undefined options
  const filteredSalaryOptions = salaryOptions.filter(option => option !== undefined);
  const filteredExperienceOptions = experienceOptions.filter(option => option !== undefined);
  const filteredRoleOptions = roleOptions.filter(option => option !== undefined);
  const filteredLocationOptions = locationOptions.filter(option => option !== undefined);

  return (
    <div>
        <div className="filter-bar">
            <div className="filter-item">
                <Multiselect options={filteredRoleOptions} displayValue="Role" placeholder="Select Role" />
            </div>
            <div className="filter-item">
                <Multiselect options={filteredExperienceOptions} displayValue="Experience" placeholder="Select Experience" />
            </div>
            <div className="filter-item">
                <Multiselect options={filteredSalaryOptions} displayValue="Salary" placeholder="Select Salary" />
            </div>
            <div className="filter-item">
                <Multiselect options={filteredLocationOptions} displayValue="Location" placeholder="Select Location" />
            </div>
        </div>
    </div>
  );
}

export default Topmenu;
