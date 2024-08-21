import Autoplay from "embla-carousel-autoplay"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import banner1 from '../../../assets/banner-bg-1.jpg'
import banner2 from '../../../assets/banner-bg-2.jpg'
import banner3 from '../../../assets/banner-bg-3.jpg'


import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import React from "react";
const Banner = () => {

    const plugin = React.useRef(
        Autoplay({ delay: 2000, })
    )
    return (

        <div>
            <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-screen-xl"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >

                <CarouselContent>
                    <CarouselItem>
                        <div className="hero min-h-screen" style={{ backgroundImage: `url(${banner1})` }}>
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-center text-neutral-content">
                                <div className="">
                                    <h1 className="mb-5 text-5xl font-bold">Welcome to DeliverMatrix</h1>
                                    <p className="mb-5">Your Ultimate Solution for Seamless Parcel Management</p>
                                    <div className="flex w-full items-center space-x-2">
                                        <Input type="text" placeholder="Location" />
                                        <Button type="submit">Search</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="hero min-h-screen" style={{ backgroundImage: `url(${banner2})` }}>
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-center text-neutral-content">
                                <div className="">
                                    <h1 className="mb-5 text-5xl font-bold">Reliable</h1>
                                    <p className="mb-5">Secure and convenient parcel lockers for easy pickup and drop-off</p>
                                    <div className="flex w-full items-center space-x-2">
                                        <Input type="text" placeholder="Location" />
                                        <Button type="submit">Search</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="hero min-h-screen" style={{ backgroundImage: `url(${banner3})` }}>
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-center text-neutral-content">
                                <div className="">
                                    <h1 className="mb-5 text-5xl font-bold">User Friendly</h1>
                                    <p className="mb-5">Gain insights into your delivery operations with our comprehensive analytics tools.</p>
                                    <div className="flex w-full items-center space-x-2">
                                        <Input type="text" placeholder="Location" />
                                        <Button type="submit">Search</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                    
                   
                </CarouselContent>

                
                <CarouselPrevious />
                <CarouselNext />


            </Carousel>
        </div>


    );
};

export default Banner;