import React, { useState, useEffect } from "react";

import { apiConnector } from "../ApiConnector/Axios";
import { ADDCHARGER,UPDATECHARGER } from "../ApiConnector/apis";

const AddEditChargerModal = ({ isOpen, onClose, onSave, existingData = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
    power: "",
    connector: "Type 2",
    lat: "",
    lng: "",
  });

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
    } else {
      setFormData({
        name: "",
        status: "active",
        power: "",
        connector: "Type 2",
        lat: "",
        lng: "",
      });
    }
  }, [existingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const data ={
        name: formData.name,
        status: formData.status,
        power: formData.power,
        connector: formData.connector,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),

    }
      let response;
      if (existingData && existingData._id) {
        // Edit charger
        response = await apiConnector('PUT',UPDATECHARGER + `/${existingData._id}`, data);
        console.log(response);
      } else {
        // Add new charger
        response = await apiConnector("POST",ADDCHARGER, formData);
        console.log(response);
      }

      onSave(response.data); // Update UI
      onClose(); // Close modal
    } catch (error) {
      console.error("Error submitting charger data:", error.response?.data || error.message);
      alert("Failed to save charger. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass text-black p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white font-serif text-center">
          {existingData ? "Edit Charger" : "Add Charger"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Charger Name"
            className="input input-bordered text-white w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="power"
            placeholder="Power Output (kW)"
            className="input input-bordered text-white w-full"
            value={formData.power}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            className="select select-bordered text-white w-full"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            name="connector"
            className="select select-bordered text-white w-full"
            value={formData.connector}
            onChange={handleChange}
          >
            <option value="Type 2">Type 2</option>
            <option value="CCS">CCS</option>
            <option value="CHAdeMO">CHAdeMO</option>
          </select>
          <input
            type="number"
            step="any"
            name="lat"
            placeholder="Latitude"
            className="input input-bordered text-white w-full"
            value={formData.lat}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="any"
            name="lng"
            placeholder="Longitude"
            className="input input-bordered text-white w-full"
            value={formData.lng}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary text-white">
              {existingData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditChargerModal;
