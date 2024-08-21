
import useParcelLoader from "../../../components/hooks/useParcelLoader";
import CountUp from 'react-countup';
import useUsersLoader from "../../../components/hooks/useUsersLoader/useUsersLoader";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const StatisticsSection = () => {
  const parcels = useParcelLoader()
  const [users] = useUsersLoader()
  console.log(parcels, 'all parcels');
  const parcelCount= parcels[0].filter(item => item.status ==='delivered')
  console.log(users, 'count');
  return (
    <div>
      <SectionTitle className='animate__backInDown' heading='Site Statistics'></SectionTitle>
    <div className="mockup-window border bg-base-300">
    <div className="grid text-xl font-bold text-center	 justify-center px-4 py-16 bg-base-200">
        <CountUp
          start={0}
          end={parcels.length}
          duration={2.75}
          separator=" "
          prefix="Total Number of Parcels: "
        ></CountUp>


        <CountUp
          start={0}
          end={parcelCount.length}
          duration={2.75}
          separator=" "
          prefix="Total Number of Parcels Delivered: "
        ></CountUp>


        <CountUp
          start={0}
          end={users.length}
          duration={2.75}
          separator=" "
          prefix="Total Number User: "
        ></CountUp>

    </div>
    </div>

    </div>
  );
};

export default StatisticsSection;