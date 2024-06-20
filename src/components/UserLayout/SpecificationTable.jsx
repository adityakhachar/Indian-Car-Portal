import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/CompareCars.css';
// import AlternativeCarRow from './AlternativeCarRow'; // Make sure to adjust the import path

const SpecificationTable = () => {
  const { id } = useParams();
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alternativeCars, setAlternativeCars] = useState([]);
  const staticCategoryId = '6668257973cd6403d5f164ac'; // Define the static category ID here

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/${id}`);
        if (response.data) {
          setVehicleData(response.data);
          setLoading(false);
          fetchAlternativeCars(response.data.category_id, id);
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [id]);

  const fetchAlternativeCars = async (categoryId, currentVehicleId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/vehicles/byCategory/${categoryId}?limit=4`);
      if (response.data) {
        const filteredCars = response.data.filter(car => car._id !== currentVehicleId);
        setAlternativeCars(filteredCars);
      }
    } catch (error) {
      console.error('Error fetching alternative cars:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!vehicleData) {
    return <p>Failed to fetch vehicle data.</p>;
  }

  const renderTransmissionTypes = () => {
    if (!vehicleData.variants || vehicleData.variants.length === 0) return null;

    const transmissionTypeMap = {
      A: 'Automatic',
      M: 'Manual',
      AMT: 'Automated Manual Transmission',
      CVT: 'Continuously Variable Transmission',
      DCT: 'Dual-Clutch Transmission'
    };

    const transmissionTypes = [...new Set(vehicleData.variants.flatMap(variant => variant.transmission_type))];
    const transmissionNames = transmissionTypes.map(type => transmissionTypeMap[type] || 'Unknown').join(' / ');

    return transmissionNames;
  };

  const renderEngineSize = () => {
    if (!vehicleData || !vehicleData.variants || vehicleData.variants.length === 0) return null;

    const engineSizes = vehicleData.variants.map(variant => variant.engine_size);
    const minEngineSize = Math.min(...engineSizes);
    const maxEngineSize = Math.max(...engineSizes);

    return minEngineSize === maxEngineSize ? `${minEngineSize} cc` : `${minEngineSize} - ${maxEngineSize} cc`;
  };

  const vehicleTypeMap = {
    P: 'Petrol',
    D: 'Diesel',
    E: 'Electric'
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Crore`;
    } else {
      return `${(price / 100000).toFixed(1)} Lakh`;
    }
  };

  const VehicleInfoTable = ({ vehicleData }) => {
    const prices = vehicleData.variants.map(variant => variant.price);
    const priceRange = prices[0] === prices[prices.length - 1]
      ? `${formatPrice(prices[0])}`
      : `${formatPrice(prices[0])} - ${formatPrice(prices[prices.length - 1])}`;

    return (
      <TableRow title="Ex-Showroom Price (Delhi)" data={priceRange} />
    );
  };

  return (
    <section className="table-section" id="specs">
      <table>
        <caption>{vehicleData.name} Specification</caption>
        <tbody>
          <VehicleInfoTable vehicleData={vehicleData} />
          <TableRow title="Fuel Type" data={vehicleTypeMap[vehicleData.vehicle_type]} />
          <TableRow title="Transmission Type" data={renderTransmissionTypes()} />
          <TableRow title="Engine Size" data={renderEngineSize()} />
          <TableRow title="Power" data="83 bhp @ 6000 RPM - 74 bhp @ 4000 RPM" />
          <TableRow title="Torque" data="115 Nm @ 4000 RPM - 190 Nm @ 2000 RPM" />
          <TableRow title="Mileage (ARAI)" data="20.4 kmpl - 25.2 kmpl" />
          <TableRow title="Alternate Fuel" data="Not Applicable" />
          <TableRow title="No of gears" data="5 Gears" />
          <TableRow title="Engine Type" data="K Series VVT Engine - DDiS Diesel Engine" />
          <TableRow
            title="Engine Description"
            data="1.2-litre 83.11bhp 16V K Series VVT Engine <br />1.3-litre 74bhp 16V DDiS Diesel Engine"
          />
          <TableRow title="No. of Cylinders" data="4" />
          <TableRow title="Top Speed" data="155 kmph -165 kmph" />
          <TableRow title="Length" data="3850 mm" />
          <TableRow title="Width" data="1695 mm" />
          <TableRow title="Height" data="1530 mm" />
          <TableRow title="Ground Clearance" data="170 mm" />
          <TableRow title="Wheel Size" data="14 Inch" />
          <TableRow title="Acceleration (0-100 kmph)" data="12.6 Seconds" />
          <TableRow title="Seating Capacity" data="5" />
          <TableRow title="Fuel Tank Capacity" data="42 litres" />
          <TableRow title="Central Locking" data="Yes" />
          <TableRow title="Child Safety Lock" data="Yes" />
          <TableRow title="Anti-Lock Braking System (ABS)" data="No" />
          <TableRow title="Airbags" data="1 (Driver Only) <br />2 (Driver &amp; Co-Driver)" />
        </tbody>
      </table>

      {alternativeCars.length > 0 && (
        <table className="alternative-cars">
          <caption>Alternatives to {vehicleData.name}</caption>
          <tbody>
            {alternativeCars.map((car, index) => (
              <AlternativeCarRow
                key={index}
                imgSrc={car.images[0]}
                carName={car.name}
                price={`${formatPrice(car.variants[0].price)}*`}
              />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

const TableRow = ({ title, data }) => (
  <tr>
    <td className="title">{title}</td>
    <td className="data" dangerouslySetInnerHTML={{ __html: data }} />
  </tr>
);

const AlternativeCarRow = ({ imgSrc, carName, price }) => (
  <tr>
    <td className="alternative-car-image"><img src={imgSrc} width="120px" alt={carName} /></td>
    <td className="alternative-car-details">
      <div className="car-name">{carName}</div>
      <div className="car-price">
        <span><i className="fa fa-inr" aria-hidden="true"></i> {price}</span>
      </div>
    </td>
  </tr>
);

export default SpecificationTable;
