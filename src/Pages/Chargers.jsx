import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import AddEditChargerModal from "../Component/AddEditpage";
import { apiConnector } from "../ApiConnector/Axios";
import { GETCAHRGER,DELETECHARGER } from "../ApiConnector/apis";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const ChargerListPage = () => {
  const [chargers, setChargers] = useState([]);
  const [filters, setFilters] = useState({ status: "", connector: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editCharger, setEditCharger] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [locationsMap, setLocationsMap] = useState({});

  const mapRef = useRef(null);

  const fetchChargers = async () => {
    try {
      const res = await apiConnector("GET", GETCAHRGER);
      setChargers(res.data);
    } catch (error) {
      console.error("Failed to fetch chargers:", error);
    }
  };
  

const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        lat,
        lon: lng,
        format: "json",
      },
    });
    return res.data.display_name;
  } catch (err) {
    console.error("Reverse geocoding failed", err);
    return "Unknown location";
  }
};


  useEffect(() => {
    fetchChargers();
  }, []);

  useEffect(() => {
  const fetchLocations = async () => {
    const newMap = {};
    for (let c of chargers) {
      const key = `${c.lat},${c.lng}`;
      if (!locationsMap[key]) {
        const locationName = await reverseGeocode(c.lat, c.lng);
        newMap[key] = locationName;
      }
    }
    setLocationsMap((prev) => ({ ...prev, ...newMap }));
  };

  if (chargers.length) {
    fetchLocations();
  }
}, [chargers]);

  const filteredChargers = chargers.filter(
    (c) =>
      (filters.status === "" || c.status === filters.status) &&
      (filters.connector === "" || c.connector === filters.connector)
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this charger?")) {
      try {
        await apiConnector("DELETE", DELETECHARGER + `/${id}`);
        fetchChargers();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const locateCharger = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], 15, { duration: 1.5 });
    } else {
      alert("Map not ready yet.");
    }
  };

  return (
    <div className="p-4 md:p-6 text-white min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold font-serif">⚡ Charger Listing</h2>
        <button
          className="btn btn-accent w-full sm:w-auto"
          onClick={() => {
            setEditCharger(null);
            setModalOpen(true);
          }}
        >
          + Add Charger
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <select
          className="select select-bordered bg-white/10 text-white"
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          className="select select-bordered bg-white/10 text-white"
          onChange={(e) => setFilters((f) => ({ ...f, connector: e.target.value }))}
        >
          <option value="">All Connectors</option>
          <option value="Type 2">Type 2</option>
          <option value="CCS">CCS</option>
          <option value="CHAdeMO">CHAdeMO</option>
        </select>
      </div>

      {/* Charger List */}
      <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-8 space-y-4">
        {filteredChargers.map((c) => (
          <div key={c._id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border-b border-white/20">
            <div className="mb-2 sm:mb-0">
              <h4 className="font-semibold">{c.name}</h4>
              <p className="text-sm">
                Power: {c.power}kW | Connector: {c.connector} | Status:{" "}
                <span className={`font-bold ${c.status === "active" ? "text-green-400" : "text-red-400"}`}>
                  {c.status}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => {
                  setEditCharger(c);
                  setModalOpen(true);
                }}
              >
                Edit
              </button>
              <button className="btn btn-sm btn-error" onClick={() => handleDelete(c._id)}>
                Delete
              </button>
             
            </div>
          </div>
        ))}
        {filteredChargers.length === 0 && (
          <div className="text-center text-gray-300 py-4">No chargers found.</div>
        )}
      </div>

      {/* Map */}
      <div className="h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
        <MapContainer
            center={[20, 0]} 
            zoom={2} 
            scrollWheelZoom
            className="h-full w-full z-0"
            whenCreated={(mapInstance) => {
              mapRef.current = mapInstance;
              setMapReady(true);
            }}
          >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredChargers.map((c) => (
            <Marker key={c._id} position={[c.lat, c.lng]}>
              <Tooltip className="text-center flex flex-col items-center">
              <strong>{c.name}</strong>
              <br />
              Power: {c.power}kW
              <br />
              Connector: {c.connector}
              <br />
              <span className="text-sm text-gray-500 text-center flex flex-col items-center">
              📍 {
                locationsMap[`${c.lat},${c.lng}`]
                  ? locationsMap[`${c.lat},${c.lng}`].split(' ').slice(0, 5).join(' ') + '...'
                  : "Fetching location..."
              }
            </span>
            </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Add/Edit Modal */}
      <AddEditChargerModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          fetchChargers();
        }}
        existingData={editCharger}
        onSave={fetchChargers}
      />
    </div>
  );
};

export default ChargerListPage;
