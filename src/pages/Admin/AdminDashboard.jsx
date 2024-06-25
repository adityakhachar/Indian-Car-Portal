import React, { useEffect, useState } from 'react';
import '../../assets/styles/AdminDashboardStyle.css'; // Ensure the path is correct
import Sidebar from '../../components/AdminLayout/SideBar'; // Adjust the path based on your project structure
import AdminHeader from '../../components/AdminLayout/AdminHeader';
import { getCustomers, getInventory, getOrders, getRevenue } from "../Admin/api";
import { Card, Tooltip, Table,Typography, Space, Row, Col } from 'antd';
import {
  ToolOutlined,
  CarOutlined,
  CarFilled,
} from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from 'react-router-dom';
// Custom DashboardCard component with number animation
const DashboardCard = ({ icon, title, value }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const animationDuration = 1000; // Animation duration in milliseconds
    let startValue = 0;
    const endValue = value;

    const increment = Math.ceil(endValue / (animationDuration / 15)); // Adjust increment speed here

    const animationInterval = setInterval(() => {
      startValue += increment;
      if (startValue >= endValue) {
        startValue = endValue;
        clearInterval(animationInterval);
      }
      setAnimatedValue(startValue);
    }, 15); // Adjust interval for smoother animation

    // Clean up interval on unmount or value change
    return () => clearInterval(animationInterval);
  }, [value]); // Re-run animation on value change

  return (
    <Card
      style={{
        textAlign: "center",
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        height: '100%', // Ensure all cards have equal height
      }}
      bodyStyle={{
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: 16 }}>{icon}</div>
      <div style={{ fontSize: 20, fontWeight: "bold" }}>{title}</div>
      <div style={{ fontSize: 24, marginTop: 8 }}>{animatedValue}</div>
    </Card>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  // localStorage.setItem('authToken', data.authToken);
  let token = localStorage.getItem('authToken');
  console.log(token);
  const [brands, setBrands] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [sedanCount, setSedanCount] = useState(0);
  const [suvCount, setSUVCount] = useState(0);
  const [hatchbackCount, setHatchbackCount] = useState(0);
  const [crossoverCount, setCrossoverCount] = useState(0);
  const [convertibleCount, setConvertibleCount] = useState(0);
  const [pickupCount, setPickupCount] = useState(0);

  const [categories, setCategories] = useState([]);
  const [vehicleCounts, setVehicleCounts] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Redirect user to login page if authToken is empty
      navigate('/admin/login');
    }
  }, []); 
  const fetchCategories = async () => {
    try {
      const categoriesResponse = await fetch("https://indian-car-portal.onrender.com/api/categories");
      if (!categoriesResponse.ok) {
        throw new Error(`HTTP error! Status: ${categoriesResponse.status}`);
      }
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      fetchVehicleCounts();
    }
  }, [categories]);

  const fetchVehicleCounts = async () => {
    try {
      const vehiclesResponse = await fetch("https://indian-car-portal.onrender.com/api/vehicles");
      if (!vehiclesResponse.ok) {
        throw new Error(`HTTP error! Status: ${vehiclesResponse.status}`);
      }
      const vehiclesData = await vehiclesResponse.json();

      // Initialize counts for each category
      const initialCounts = {};
      categories.forEach((category) => {
        initialCounts[category.name] = 0;
      });

      // Count vehicles in each category
      const categoryCounts = vehiclesData.reduce((counts, vehicle) => {
        const category = categories.find((cat) => cat._id === vehicle.category_id);
        if (category) {
          counts[category.name]++;
        }
        return counts;
      }, initialCounts);

      setVehicleCounts(categoryCounts);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const chartData = {
    labels: Object.keys(vehicleCounts), // Categories as labels
    datasets: [
      {
        label: 'Vehicle Count',
        backgroundColor: 'rgba(75,192,192,0.6)', // Adjust color as needed
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.8)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: Object.values(vehicleCounts), // Count values for each category
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend for cleaner appearance
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Vehicle Categories',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Vehicles',
        },
        ticks: {
          stepSize: 1,
          beginAtZero: true,
        },
      },
    },
  };


  useEffect(() => {
    fetch("https://indian-car-portal.onrender.com/api/brands")
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  useEffect(() => {
    fetch("https://indian-car-portal.onrender.com/api/vehicles")
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  useEffect(() => {
    fetch("https://indian-car-portal.onrender.com/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    if (categories.length > 0 && vehicles.length > 0) {
      let sc = 0, suc = 0, hc = 0, cc = 0, coc = 0, pc = 0;
      vehicles.forEach((v) => {
        const matchedCategory = categories.find((category) => category._id === v.category_id);
        if (matchedCategory) {
          switch (matchedCategory.name.toLowerCase()) {
            case "sedan":
              sc++;
              break;
            case "suv":
              suc++;
              break;
            case "hatchback":
              hc++;
              break;
            case "crossover":
              cc++;
              break;
            case "convertible":
              coc++;
              break;
            case "pickup":
              pc++;
              break;
            default:
              break;
          }
        }
      });
      setSedanCount(sc);
      setSUVCount(suc);
      setHatchbackCount(hc);
      setCrossoverCount(cc);
      setConvertibleCount(coc);
      setPickupCount(pc);
    }
  }, [categories, vehicles]);

  return (
    <div className="kaiadmin" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="kaiadmin__content" style={{ flex: 1 }}>
        <AdminHeader />
        <div className="kaiadmin__main">
          <Space size={20} direction="vertical" style={{ marginTop: "10px" }}>
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space direction="horizontal">
              <DashboardCard
                icon={
                  <ToolOutlined
                    style={{
                      color: "green",
                      backgroundColor: "rgba(0,255,0,0.25)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                  />
                }
                title={"Brands"}
                value={brands.length}
              />
              <DashboardCard
                icon={
                  <CarOutlined
                    style={{
                      color: "blue",
                      backgroundColor: "rgba(0,0,255,0.25)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                  />
                }
                title={"Vehicles"}
                value={vehicles.length}
              />
            </Space>
            <Typography.Title level={4}>Categories</Typography.Title>
            <Space direction="horizontal">
              <DashboardCard
                icon={
                  <CarFilled
                    style={{
                      color: "purple",
                      backgroundColor: "rgba(0,255,255,0.25)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                  />
                }
                title={"Sedan"}
                value={sedanCount}
              />
              <DashboardCard
                icon={
                  <CarFilled
                    style={{
                      color: "purple",
                      backgroundColor: "rgba(0,255,255,0.25)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                  />
                }
                title={"Suv"}
                value={suvCount}
              />
              <DashboardCard
                icon={
                  <CarFilled
                    style={{
                      color: "purple",
                      backgroundColor: "rgba(0,255,255,0.25)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                  />
                }
                title={"Hatchback"}
                value={hatchbackCount}
              />
              <DashboardCard
                icon={
                  <CarFilled
                    style={{
                      color: "purple",
                      backgroundColor: "rgba(0,255,255,0.25)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                  />
                }
                title={"Crossover"}
                value={crossoverCount}
              />
              <DashboardCard
                icon={
                  <CarFilled
                    style={{
                      color: "purple",
                      backgroundColor: "rgba(0,255,255,0.25)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                  />
                }
                title={"Convertible"}
                value={convertibleCount}
              />
              <DashboardCard
                icon={
                  <CarFilled
                    style={{
                      color: "purple",
                      backgroundColor: "rgba(0,255,255,0.25)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                  />
                }
                title={"Pickup"}
                value={pickupCount}
              />
            </Space>
            <RecentOrders />
            
        {/* <DashboardChart /> */}
          </Space>
        </div>
      </div>
    </div>
  );
};

function RecentOrders() {
  const [brandData, setBrandData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://indian-car-portal.onrender.com/api/brands")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(async data => {
        // Fetch car count for each brand
        const brandsWithCarCount = await Promise.all(
          data.map(async (brand) => {
            const carCountResponse = await fetch(`https://indian-car-portal.onrender.com/api/vehicles/brands/${brand._id}/cars`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json'
              }
            });

            if (!carCountResponse.ok) {
              throw new Error(`HTTP error! Status: ${carCountResponse.status}`);
            }

            const carCountData = await carCountResponse.json();
            return { ...brand, carCount: carCountData.vehicleCount };
          })
        );

        // Sort brands by car count in descending order
        brandsWithCarCount.sort((a, b) => b.carCount - a.carCount);

        // Take top 3 brands
        const topThreeBrands = brandsWithCarCount.slice(0, 3);

        setBrandData(topThreeBrands);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching brands:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
     <Typography.Title level={4}>Top 3 Brands by Car Count</Typography.Title>
     <Table
  columns={[
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 300,
      style: {
        fontWeight: "bold",
        fontSize: 16,
        backgroundColor: "#f0f0f0",
        padding: "12px",
        border: "1px solid #ddd",
      },
    },
    {
      title: "Car Count",
      dataIndex: "carCount",
      key: "carCount",
      align: "center",
      width: 300,
      style: {
        fontWeight: "bold",
        fontSize: 16,
        backgroundColor: "#f0f0f0",
        padding: "12px",
        border: "1px solid #ddd",
      
      },
    },
  ]}
  loading={loading}
  dataSource={brandData}
  pagination={false}
  style={{
    width: "600px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    
  }}
/>

    </>
  );
}

function DashboardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchBrandData();
  }, []);

  const fetchBrandData = async () => {
    try {
      const brandsResponse = await fetch("https://indian-car-portal.onrender.com/api/brands");
      if (!brandsResponse.ok) {
        throw new Error(`HTTP error! Status: ${brandsResponse.status}`);
      }
      const brandsData = await brandsResponse.json();
      const brandNames = brandsData.map((brand) => brand.name);
      const brandIds = brandsData.map((brand) => brand._id);

      const fetchCarCounts = brandIds.map((brandId) =>
        fetch(`https://indian-car-portal.onrender.com/api/vehicles/brands/${brandId}/cars`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((carCountData) => carCountData.vehicleCount)
      );

      const carCounts = await Promise.all(fetchCarCounts);

      const revenueResponse = await getRevenue();
      const labels = revenueResponse.carts.map((cart) => `User-${cart.userId}`);
      const data = revenueResponse.carts.map((cart) => cart.discountedTotal);

      const dataSource = {
        labels: brandNames, // Brand names on x-axis
        datasets: [
          {
            label: "Car Count",
            data: carCounts, // Car counts on y-axis
            backgroundColor: "rgba(255, 0, 0, 0.6)", // Adjust the color as needed
          },
        ],
      };

      setRevenueData(dataSource);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Brands Inventory",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Brands',
        },
      },
      y: {
        title: {
          display: true,
          text: "Cars",
        },
        ticks: {
          stepSize: 1, // Minimum distance between ticks is 1
          precision: 0, // Show whole numbers only
          callback: function(value, index, values) {
            return value <= 10 ? value : ''; // Show ticks up to 10, hide others
          },
        },
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar data={revenueData} options={options} />
    </Card>
  );
}
export default AdminDashboard;
