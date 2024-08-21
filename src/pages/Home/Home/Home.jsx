
import Banner from "../Banner/Banner";
import FeaturesSection from "../FeaturesSection/FeaturesSection";
import StatisticsSection from "../StatisticsSection/StatisticsSection";

const Home = () => {
    return (
        <div className="animate__heartBeat">
           <Banner></Banner>
           <FeaturesSection></FeaturesSection>
           <StatisticsSection></StatisticsSection>

        </div>
    );
};

export default Home;