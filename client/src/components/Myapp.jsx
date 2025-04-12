import React, { useState } from 'react';
import { FaCloudSun, FaSearch } from 'react-icons/fa';

function Myapp() {
    const [search, setsearch] = useState("");
    const [data, setdata] = useState(null);


    const city = (e) => {
        setsearch(e.target.value);
    };

    const mycity = async () => {
        if (search.trim() === "") {
            alert("Please enter a valid city name.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/weather?city=${search}`);
            const jdata = await response.json();
            console.log(jdata);
            setdata(jdata);
        } catch (error) {
            alert("Failed to fetch data.");
        }
    };



    return (
        <div className={`min-h-screen p-6 flex items-center justify-center transition-all duration-500 ease-in-out ${theme === "light" ? "bg-gradient-to-br from-blue-200 to-blue-400 text-gray-800" : "bg-gray-900 text-white"}`}>
            <div className={`w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
                <div className={`p-6 text-center font-semibold text-xl flex items-center justify-center ${theme === "light" ? "bg-blue-600 text-white" : "bg-gray-700"}`}>
                    <FaCloudSun className="mr-2 text-2xl" />
                    Weather Forecast
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex rounded-lg overflow-hidden shadow-sm">
                        <input
                            type="text"
                            placeholder="Enter city name"
                            value={search}
                            onChange={city}
                            className={`w-full px-4 py-3 outline-none text-lg ${theme === "light" ? "bg-gray-100 text-black" : "bg-gray-700 text-white"}`}
                        />
                        <button
                            onClick={mycity}
                            className={`px-4 py-3 text-white text-xl transition-colors duration-300 ${theme === "light" ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-600 hover:bg-gray-500"}`}
                        >
                            <FaSearch />
                        </button>
                    </div>



                    {data && (
                        <div className={`p-6 rounded-xl shadow-lg space-y-4 ${theme === "light" ? "bg-blue-50" : "bg-gray-700"}`}>
                            <div className="flex flex-col items-center space-y-2">
                                <img src={data.icon} alt="weather icon" className="w-20 h-20" />
                                <h2 className="text-2xl font-bold">{data.city}</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Humidity", value: `${data.humidity}%` },
                                    { label: "Wind Speed", value: data.windSpeed },
                                    { label: "Feels Like", value: data.weatherCondition },
                                    { label: "Temperature", value: `${Math.trunc(data.temperature)}°C` },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-xl shadow-md text-center transition-all duration-300 ${theme === "light" ? "bg-white" : "bg-gray-600"}`}
                                    >
                                        <p className="text-gray-500 text-sm">{item.label}</p>
                                        <p className="text-lg font-semibold mt-1">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Myapp;
