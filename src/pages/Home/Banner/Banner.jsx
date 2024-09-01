

import banner1 from '../../../assets/banner-bg-1.jpg'
import { Button } from '../../../components/ui/button';


const Banner = () => {


    return (

        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${banner1})`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl text-new-green font-bold">Welcome</h1>
                    <p className="mb-5 text-secondary-green">
                    Discover the Best Deals on Delivery Matrix! <br />Shop Now for Exclusive Discounts and Unbeatable Prices
                    </p>
                    <Button className="">Shop Now</Button>
                    
                </div>
            </div>
        </div>


    );
};

export default Banner;