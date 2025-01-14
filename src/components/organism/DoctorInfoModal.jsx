/* eslint-disable react/prop-types */
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useState } from "react";

export const DoctorInfoModal = ({ doctor, onClose, onUpdate }) => {
  const [daysWork, setDaysWork] = useState(doctor.DaysWork || []);
  const [startTime, setStartTime] = useState(doctor.StartTime || "");
  const [endTime, setEndTime] = useState(doctor.EndTime || "");
  const daysOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleUpdate = () => {
    onUpdate(
      doctor._id,
      {
        DaysWork: daysWork,
        StartTime: startTime,
        EndTime: endTime,
      });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2">
        <h2 className="text-[#0E485E] text-3xl font-bold mb-6 text-center">Doctor Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
            <p><span className="font-medium">Last Name:</span> {doctor.last_Name}</p>
            <p><span className="font-medium">First Name:</span> {doctor.first_Name}</p>
            <p><span className="font-medium">Gender:</span> {doctor.gender}</p>
            <p><span className="font-medium">Birthdate:</span> {doctor.birthdate}</p>
            <p><span className="font-medium">Phone:</span> {doctor.phone}</p>
            <p><span className="font-medium">Email:</span> {doctor.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Professional Details</h3>
            <p><span className="font-medium">Qualification:</span> {doctor.qualification}</p>
            <p><span className="font-medium">Experience:</span> {doctor.experience}</p>
            <p><span className="font-medium">Specialization:</span> {doctor.specialization}</p>
            <p><span className="font-medium">Description:</span> {doctor.description}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Location Details</h3>
          <p><span className="font-medium">Country:</span> {doctor.country}</p>
          <p><span className="font-medium">City:</span> {doctor.city}</p>
        </div>

        <h2 className="text-[#0E485E] text-2xl font-bold mb-4">Edit Working Schedule</h2>

        <div className="mb-6">
          <label htmlFor="DaysWork" className="block text-sm font-medium text-gray-700 mb-2">
            Days of Work
          </label>
          <Autocomplete
            multiple
            id="DaysWork"
            options={daysOptions}
            value={daysWork}
            onChange={(event, newValue) => setDaysWork(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    key={key}
                    label={option}
                    className="bg-[#0E485E] text-white"
                    {...tagProps}
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Select working days"
                className="border-gray-300 focus:ring-[#0E485E] focus:border-[#0E485E]"
              />
            )}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0E485E] focus:border-[#0E485E]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0E485E] focus:border-[#0E485E]"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-[#0E485E] text-white py-2 px-4 rounded-lg hover:bg-[#0c3e52] focus:outline-none focus:ring-2 focus:ring-[#0c3e52]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
