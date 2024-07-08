import services1 from '../../../assets/main/services1.png';
import services2 from '../../../assets/main/services2.png';
import services3 from '../../../assets/main/services3.png';
import services4 from '../../../assets/main/services4.png';

const Services = () => {
    return (
        <div className='bg-white'>
            <h2 className="text-center text-4xl py-8 font-semibold">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-8 pb-8">
                <div className="flex flex-col items-center">
                    <img src={services1} alt="Fertilizers" className="h-60" />
                    <p className="text-center font-medium text-lg">Fertilizers</p>
                </div>
                <div className="flex flex-col items-center">
                    <img src={services2} alt="Pesticides" className="h-60" />
                    <p className="text-center font-medium text-lg">Pesticides</p>
                </div>
                <div className="flex flex-col items-center">
                    <img src={services3} alt="Seeds" className="h-60" />
                    <p className="text-center font-medium text-lg">Seeds</p>
                </div>
                <div className="flex flex-col items-center">
                    <img src={services4} alt="Tools" className="h-60" />
                    <p className="text-center font-medium text-lg">Tools</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 px-8 py-12">
                <div className="flex flex-col justify-center">
                    <h1 className='text-xl font-semibold text-center'>Empowering Farmers with the Latest Techniques</h1>
                    <p className='px-8 py-4 font-normal text-lg text-justify'>
                        Our mission is to provide farmers with access to the latest agricultural techniques and innovations. The homepage greets you with a vibrant and dynamic carousel, showcasing the wide range of products and services available on our platform. The first slide introduces you to our extensive catalog of agricultural products. Whether you are looking for fertilizers, high-quality seeds, pesticides, or modern farming tools, AgriSolutions has you covered. Our products are sourced from trusted suppliers to ensure you get the best quality at competitive prices. By clicking on the Explore Products button, you can browse through our detailed product listings, read reviews, and make informed purchasing decisions to boost your farm{"'"}s productivity.
                    </p>
                    <div className='flex justify-center m-auto'>
                        <button className='text-gray-900  bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Explore Products</button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img src="https://img.freepik.com/premium-photo/drone-with-word-drone-nose_124185-6021.jpg" alt="Drone" className='rounded-sm' />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 px-8 py-12">
                <div className="flex justify-center">
                    <img src="https://img.freepik.com/premium-photo/female-worker-checking-fresh-green-leaves-conveyor-belt-factory_449849-18126.jpg" alt="Drone" className='rounded-sm' />
                </div>
                <div className="flex flex-col justify-center"> 
                    <h1 className='text-xl font-semibold text-center'>Sustainable Farming for a Better Tomorrow</h1>
                    <p className='px-8 py-4 font-normal text-lg text-justify'>Sustainability is at the heart of our approach. We believe in promoting farming practices that not only enhance productivity but also protect the environment. The second slide on our carousel focuses on providing farmers with accurate and timely weather forecasts. Understanding weather patterns is crucial for planning farming activities, from sowing and irrigation to harvesting. With our state-of-the-art weather forecasting tools, you can stay updated with the latest weather conditions in your area and across the globe. The Check Weather button takes you to a detailed weather page where you can view forecasts, historical weather data, and receive alerts for adverse weather conditions. This information helps you make informed decisions, reducing risks and optimizing your farming practices for better yields.</p>
                    <div className='flex justify-center m-auto'>
                        <button className='text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Check Weather</button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 px-8 py-12">
                <div className="flex flex-col justify-center"> 
                    <h1 className='text-xl font-semibold text-center'>Innovative Solutions for Modern Agriculture</h1>
                    <p className='px-8 py-4 font-normal text-lg text-justify'>Our platform also offers innovative solutions to modern agricultural challenges. The third slide highlights our service for locating nearby marketplaces and cold storage facilities. One of the major challenges for farmers is ensuring their produce reaches the market in the best condition. With AgriSolutions, you can easily find the nearest marketplaces and cold storages, ensuring your produce is stored and transported efficiently. Clicking on the Find Nearby Facilities button will guide you to a comprehensive map and directory of facilities, complete with reviews, ratings, and contact information. This feature helps you minimize post-harvest losses and get the best value for your produce.</p>
                    <div className='flex justify-center m-auto'>
                        <button className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Locate Cold Storage</button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img src="https://img.freepik.com/premium-photo/smart-farming-scene-with-drones-data-analysis-digital-agriculture_818261-48286.jpg" alt="Drone" className='rounded-sm' />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 px-8 py-12">
                <div className="flex justify-center">
                    <img src="https://img.freepik.com/premium-photo/indian-agronomist-with-farmer-field_75648-64.jpg" alt="Drone" className='rounded-sm' />
                </div>
                <div className="flex flex-col justify-center"> 
                    <h1 className='text-xl font-semibold text-center'>Comprehensive Support for Farmers</h1>
                    <p className='px-8 py-4 font-normal text-lg text-justify'>Sustainability is at the heart of our approach. We believe in promoting farming practices that not only enhance productivity but also protect the environment. The second slide on our carousel focuses on providing farmers with accurate and timely weather forecasts. Understanding weather patterns is crucial for planning farming activities, from sowing and irrigation to harvesting. With our state-of-the-art weather forecasting tools, you can stay updated with the latest weather conditions in your area and across the globe. The Check Weather button takes you to a detailed weather page where you can view forecasts, historical weather data, and receive alerts for adverse weather conditions. This information helps you make informed decisions, reducing risks and optimizing your farming practices for better yields.</p>
                </div>
            </div>
        </div>
    );
};

export default Services;
