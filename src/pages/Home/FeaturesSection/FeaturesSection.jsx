import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import { MdAccessTimeFilled } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";



import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FaMagnifyingGlassLocation } from "react-icons/fa6";

const FeaturesSection = () => {
    return (
        <div className=" bg-secondary-green animate__backInUp">
            <SectionTitle
            heading="Features Section"
            ></SectionTitle>
            <div className="grid grid-cols-3 animate__animated animate__bounce">
            <Card>
                <CardHeader>
                    <p className="text-6xl"><FaMagnifyingGlassLocation /></p>

                    <CardTitle>Real-Time Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                    <p> Always know where your parcels are with our precise tracking system.</p>
                </CardContent>
                <CardFooter>
                    <Button>Book Now</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <p className="text-6xl"><MdAccessTimeFilled />
</p>

                    <CardTitle>Scheduled Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                    <p> Plan ahead and schedule your parcel deliveries according to your convenience with our scheduled delivery feature.</p>
                </CardContent>
                <CardFooter>
                    <Button>Book Now</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <p className="text-6xl"><RiSecurePaymentFill />
</p>

                    <CardTitle>Secure Parcel Handling</CardTitle>
                </CardHeader>
                <CardContent>
                    <p> Our platform ensures the safe and secure handling of parcels at every stage of the delivery process, protecting your shipments from damage or loss.</p>
                </CardContent>
                <CardFooter>
                    <Button>Book Now</Button>
                </CardFooter>
            </Card>
        </div>
        </div>
    );
};

export default FeaturesSection;