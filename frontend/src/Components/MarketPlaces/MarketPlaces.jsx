import { useEffect, useState } from "react";
import { Data } from "./dummyData";

const MarketPlaces = () => {
    const [marketData, setMarketData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const statesPerPage = 5;

    useEffect(() => {
        setMarketData(Data);
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setCurrentPage(1); 
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredData.length / statesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const filteredData = marketData.filter((stateData) => {
        const matchesState = selectedState ? stateData.stateName === selectedState : true;
        const matchesQuery = searchQuery
            ? stateData.markets.some((marketPlace) =>
                marketPlace.location.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : true;
        return matchesState && matchesQuery;
    });

    const indexOfLastState = currentPage * statesPerPage;
    const indexOfFirstState = indexOfLastState - statesPerPage;
    const currentStates = filteredData.slice(indexOfFirstState, indexOfLastState);

    if (marketData.length === 0) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className="items container mx-auto p-4 bg-gradient-to-b from-sky-400 to-sky-200 bg-market">
            <h1 className="pt-16 text-center font-semibold text-3xl">Market Places</h1>
            <div className="search-bar flex flex-col justify-center items-center my-4 md:flex-row">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by location"
                    className="p-2 border rounded w-full md:w-1/3 mb-2 md:mb-0"
                />
                <select
                    value={selectedState}
                    onChange={handleStateChange}
                    className="p-2 border rounded w-full md:w-1/3 md:ml-2"
                >
                    <option value="">All States</option>
                    {marketData.map((stateData, index) => (
                        <option key={index} value={stateData.stateName}>
                            {stateData.stateName}
                        </option>
                    ))}
                </select>
            </div>
            {currentStates.length === 0 ? (
                <div className="text-center text-red-500 font-semibold">No market places found.</div>
            ) : (
                currentStates.map((stateData, index) => (
                    <div key={index} className="border p-4 my-2 shadow-md rounded-lg bg-white">
                        <h2 className="text-xl font-semibold mb-2">State: {stateData.stateName}</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {stateData.markets.map((marketPlace, subIndex) => (
                                <div key={subIndex} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <h3 className="text-lg font-medium">Location: {marketPlace.location}</h3>
                                    <p className="text-gray-600">Category: {marketPlace.category}</p>
                                    <p className="text-gray-600">Price Range: ₹ {marketPlace.prices.minimum} - ₹ {marketPlace.prices.maximum}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
            <div className="flex justify-center mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="p-2 mx-2 border rounded disabled:opacity-50"
                >
                    &larr; Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(filteredData.length / statesPerPage)}
                    className="p-2 mx-2 border rounded disabled:opacity-50"
                >
                    Next &rarr;
                </button>
            </div>
        </div>
    );
};

export default MarketPlaces;
