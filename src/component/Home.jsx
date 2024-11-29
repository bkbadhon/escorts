import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Home = () => {
    const [girls, setGirls] = useState([]); // Original data
    const [filteredGirls, setFilteredGirls] = useState([]); // Filtered data for search
    const [location, setLocation] = useState(""); // Location input state
    const [hoveredImageId, setHoveredImageId] = useState(null); // Hovered image state
    const [itemsToShow, setItemsToShow] = useState(20); // Number of items to display initially

    // Fetch items.json on component mount
    useEffect(() => {
        fetch("/items.json")
            .then((response) => response.json())
            .then((data) => {
                setGirls(data);
                setFilteredGirls(data);
            })
            .catch((error) => console.error("Error fetching items:", error));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const results = girls.filter(
            (girl) =>
                girl.location &&
                girl.location.toLowerCase().includes(location.toLowerCase())
        );
        setFilteredGirls(results); // Update only filteredGirls
        setLocation("");
    };

    // Randomly change status every hour
    useEffect(() => {
        const interval = setInterval(() => {
            setGirls((prevGirls) =>
                prevGirls.map((girl) => ({
                    ...girl,
                    status: Math.random() > 0.5 ? "Active" : "Booked",
                }))
            );
        }, 3600000);
        return () => clearInterval(interval);
    }, []);

    const handleShowMore = () => {
        setItemsToShow((prev) => prev + 20);
    };

    return (
        <div className="w-11/12 mx-auto min-h-screen">
            <Navbar />
            <Helmet>
                <title>Escorts</title>
                <meta
                    name="description"
                    content="Explore premium adult dating profiles and find your ideal companion. Discover detailed information on preferences, location, and services for a personalized experience."
                />
                
            </Helmet>

            <div className="md:w-10/12 mx-auto">
                <form
                    onSubmit={handleSearch}
                    className="flex items-center px-8 gap-4 my-4"
                >
                    <input
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border border-gray-300 w-48 rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                    >
                        Search
                    </button>
                </form>

                <div className="md:my-10 my-6 grid md:grid-cols-5 grid-cols-2 p-3 md:gap-6 gap-4 justify-items-center">
                    {filteredGirls.slice(0, itemsToShow).map((girl) => (
                        <div
                            className="mb-8 border-yellow-500 border-2 rounded-xl relative shadow-lg p-4 px-4 text-center"
                            key={girl._id}
                            onMouseEnter={() => setHoveredImageId(girl._id)}
                            onMouseLeave={() => setHoveredImageId(null)}
                        >
                            <div className="relative">
                                <img
                                    className="md:w-56 w-40 rounded-xl md:h-60 h-40 hover:scale-105"
                                    src={girl.images[1]}
                                    alt="Images"
                                />
                                {hoveredImageId === girl._id && (
                                    <div className="absolute md:top-4 top-2 duration-800 left-0 transform -translate-y-1/2 bg-orange-600 text-white md:px-2 px-1 py-1 rounded-md shadow-lg">
                                        <div className="text-sm">4.5 rating</div>
                                    </div>
                                )}
                            </div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent text-center md:my-2">
                                ID- {girl.escortId}
                            </h2>
                            <h2 className=" md:text-base text-sm">Name: {girl.name}</h2>
                            <h2 className=" md:text-base text-sm">Location: {girl.location}</h2>
                            <button className="absolute flex items-center top-2 right-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full md:gap-2 md:px-3 px-1 text-white py-1">
                                {girl.status === "Active" ? (
                                    <span className="text-green-500 font-bold -mt-8 text-5xl">
                                        .
                                    </span>
                                ) : (
                                    <span className="text-red-500 font-bold -mt-8 text-5xl">
                                        .
                                    </span>
                                )}
                                {girl.status}
                            </button>
                            <Link to={`girl/${girl._id}`}>
                                <button className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-full p-1 md:px-4 px-2 my-2 hover:bg-red-500 duration-300">
                                    View Profile
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

                {itemsToShow < filteredGirls.length && (
                    <div className="flex justify-center md:my-8">
                        <button
                            onClick={handleShowMore}
                            className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white md:px-6 px-2 md:py-3 py-2 rounded-md hover:bg-red-500 transition"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
