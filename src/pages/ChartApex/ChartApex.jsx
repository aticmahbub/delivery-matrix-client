import ReactApexChart from 'react-apexcharts'
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { useState } from 'react';
import useParcelLoader from '../../components/hooks/useParcelLoader';

const ChartApex = () => {


    const [parcels] =useParcelLoader()
    const statDate = parcels.map(item=> item?.bookingDate)
    // const parcelType = parcels.find(item=> item?.parcelType)
    // console.log(parcelType, 'ppp');
    console.log(statDate, 'sss');
    const [state, setState] =useState({
series: [{
              name: 'Servings',
              data: [3,6,7,7,7,9,2,6,1,5,3,8]
            }],
            options: {
              annotations: {
                points: [{
                  x: 'Bananas',
                  seriesIndex: 0,
                  label: {
                    borderColor: '#775DD0',
                    offsetY: 0,
                    style: {
                      color: '#fff',
                      background: '#775DD0',
                    },
                    text: 'Bananas are good',
                  }
                }]
              },
              chart: {
                height: 350,
                type: 'bar',
              },
              plotOptions: {
                bar: {
                  borderRadius: 10,
                  columnWidth: '50%',
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                width: 0
              },
              grid: {
                row: {
                  colors: ['#fff', '#f2f2f2']
                }
              },
              xaxis: {
                labels: {
                  rotate: -45
                },
                categories: statDate,
                tickPlacement: 'on'
              },
              yaxis: {
                title: {
                  text: 'Servings',
                },
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shade: 'light',
                  type: "horizontal",
                  shadeIntensity: 0.25,
                  gradientToColors: undefined,
                  inverseColors: true,
                  opacityFrom: 0.85,
                  opacityTo: 0.85,
                  stops: [50, 0, 100]
                },
              }
            },

    })


    return (
        <div>
            <SectionTitle heading='Charts'></SectionTitle>
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
        </div>
    );
};

export default ChartApex;
