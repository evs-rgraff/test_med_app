import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  // Fetch doctors from local JSON or API
  const getDoctorsDetails = async () => {
    try {
      const res = await fetch('/data/doctors.json'); // place doctors.json in public/data/
      const data = await res.json();
      setDoctors(data);

      // TEMP: show all doctors immediately (no filtering required to see cards)
      setFilteredDoctors(data);
      setIsSearched(true);
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
      setDoctors([]);
      setFilteredDoctors([]);
      setIsSearched(false);
    }
  };

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  const handleSearch = (searchText) => {
    // If search box is empty, show all doctors
    if (!searchText) {
      setFilteredDoctors(doctors);
      setIsSearched(true);
      return;
    }

    const filtered = doctors.filter((doctor) =>
      doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredDoctors(filtered);
    setIsSearched(true);
  };

  return (
    <div className="searchpage-container">
      <FindDoctorSearchIC onSearch={handleSearch} />

      <div className="search-results-container">
        {isSearched && (
          <>
            <h2>
              {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
            </h2>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorCardIC key={doctor.name} {...doctor} />
              ))
            ) : (
              <p>No doctors found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InstantConsultation;
