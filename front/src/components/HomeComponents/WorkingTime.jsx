import { React, useState, useContext, useEffect } from 'react';
import { Bar, Doughnut, Line, Pie, PolarArea } from 'react-chartjs-2';
import { UserNameContext } from '../../context/UserNameProvider';
import { UserIdContext } from '../../context/UserIdProvider';
import { ChartManagerRound } from '../../context/ChartManagerRound';
import { ChartManagerLine } from '../../context/ChartManagerLine'
import useSWR from 'swr';
import { ChartManagerScore } from '../../context/ChartManagerScore';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale,
);

const fetcher = (url) => fetch(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } }).then((res) => res.json());

const WorkingTime = () => {

    const { selectedUserName } = useContext(UserNameContext);
    const { selectedUserId } = useContext(UserIdContext);
    const { selectedRound, selectedType } = useContext(ChartManagerRound);
    const { selectedLine, selectedTypeLine } = useContext(ChartManagerLine);
    const { selectedScore, selectedTypeScore } = useContext(ChartManagerScore);

    const { data, error, mutate } = useSWR(`http://localhost:4000/api/workingtimes/${selectedUserId}`, fetcher, {
        refreshInterval: 2000,
    });

    const [selectedColorForChart1, setSelectedColorForChart1] = useState([]);
    const [selectedColorForChart2, setSelectedColorForChart2] = useState([]);
    const [selectedColorForChart3, setSelectedColorForChart3] = useState([]);

    let arrayJanuary = []
    let arrayFeb = []
    let arrayMarch = []
    let arrayApril = []
    let arrayMay = []
    let arrayJune = []
    let arrayJuly = []
    let arrayAug = []
    let arraySetp = []
    let arrayOcto = []
    let arrayNov = []
    let arrayDec = []

    let array1 = []
    let array2 = []
    let array3 = []
    let array4 = []
    let array5 = []
    let array6 = []
    let array7 = []

    let arrayMond = []
    let arrayTues = []
    let arrayWed = []
    let arrayThur = []
    let arrayFrid = []
    let arraySatur = []
    let arraySund = []

    useEffect(() => {
        if (data) {
            dataProcessingv2();
            dataProcessingv3();
            dataProcessingv4();
        }
    }, [selectedUserId, data])

    useEffect(() => {

        switch (selectedRound) {
            case 'defaultv2':
                const colors = [
                    'rgba(123, 143, 227, 0.8)',
                    'rgba(91, 120, 240, 0.8)',
                    'rgba(49, 75, 181, 0.8)',
                    'rgba(0, 44, 222, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(119, 51, 169, 0.8)',
                    'rgba(0, 22, 109, 0.8)',
                ];
                setSelectedColorForChart1(colors);
                break;
            case 'redv2':
                const colorsv2 = [
                    'rgba(255, 118, 158, 0.8)',
                    'rgba( 244, 63, 115, 0.8)',
                    'rgba(205, 4, 62, 0.8)',
                    'rgba(219, 3, 3, 0.8)',
                    'rgba(255, 73, 73, 0.8)',
                    'rgba(255, 112, 112, 0.8)',
                    'rgba(255, 175, 175, 0.8)',
                ];
                setSelectedColorForChart1(colorsv2);
                break;
            case 'greenv2':
                const colorsv3 = [
                    'rgba(175, 255, 192, 0.8)',
                    'rgba(143, 221, 159, 0.8)',
                    'rgba(73, 218, 104 , 0.8)',
                    'rgba(26, 178, 58, 0.8)',
                    'rgba(8, 199, 138 , 0.8)',
                    'rgba(0, 146, 100, 0.8)',
                    'rgba(0, 93, 63, 0.8)',
                ];
                setSelectedColorForChart1(colorsv3);
                break;
            default:
                setSelectedColorForChart1([]);
        }
    }, [selectedRound]);

    useEffect(() => {

        switch (selectedLine) {
            case 'defaultv4':
                const colors = [
                    'rgba(123, 143, 227, 0.8)',
                ];
                setSelectedColorForChart2(colors);
                break;
            case 'redv4':
                const colorsv2 = [
                    'rgba(255, 118, 158, 0.8)',
                ];
                setSelectedColorForChart2(colorsv2);
                break;
            case 'greenv4':
                const colorsv3 = [
                    'rgba(175, 255, 192, 0.8)',
                ];
                setSelectedColorForChart2(colorsv3);
                break;
            default:
                setSelectedColorForChart2([]);
        }
    }, [selectedLine]);

    useEffect(() => {

        switch (selectedScore) {
            case 'defaultv10':
                const colors = [
                    'rgba(123, 143, 227, 0.8)',
                    'rgba(91, 120, 240, 0.8)',
                    'rgba(49, 75, 181, 0.8)',
                    'rgba(0, 44, 222, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(119, 51, 169, 0.8)',
                    'rgba(0, 22, 109, 0.8)',
                ];
                setSelectedColorForChart3(colors);
                break;
            case 'redv10':
                const colorsv2 = [
                    'rgba(255, 118, 158, 0.8)',
                    'rgba( 244, 63, 115, 0.8)',
                    'rgba(205, 4, 62, 0.8)',
                    'rgba(219, 3, 3, 0.8)',
                    'rgba(255, 73, 73, 0.8)',
                    'rgba(255, 112, 112, 0.8)',
                    'rgba(255, 175, 175, 0.8)',
                ];
                setSelectedColorForChart3(colorsv2);
                break;
            case 'greenv10':
                const colorsv3 = [
                    'rgba(175, 255, 192, 0.8)',
                    'rgba(143, 221, 159, 0.8)',
                    'rgba(73, 218, 104 , 0.8)',
                    'rgba(26, 178, 58, 0.8)',
                    'rgba(8, 199, 138 , 0.8)',
                    'rgba(0, 146, 100, 0.8)',
                    'rgba(0, 93, 63, 0.8)',
                ];
                setSelectedColorForChart3(colorsv3);
                break;
            default:
                setSelectedColorForChart3([]);
        }
    }, [selectedScore]);

    const [chartType, setChartType] = useState(1);

    const [workingTimes, setWorkingTimes] = useState({
        monday: { Hours: 0, date: "" },
        tuesday: { Hours: 0, date: "" },
        wednesday: { Hours: 0, date: "" },
        thursday: { Hours: 0, date: "" },
        friday: { Hours: 0, date: "" },
        saturday: { Hours: 0, date: "" },
        sunday: { Hours: 0, date: "" },
        notwork: { Hours: 40 },
        totalHours: { Hours: 0 },
        pourcent: { cent: "" }
    });

    const [workingTimesv2, setWorkingTimesv2] = useState({
        monday: { Hours: 0 },
        tuesday: { Hours: 0 },
        wednesday: { Hours: 0 },
        thursday: { Hours: 0 },
        friday: { Hours: 0 },
        saturday: { Hours: 0 },
        sunday: { Hours: 0 },
    });

    const [workingTimesMonths, setWorkingTimesMonths] = useState({
        january: { Hours: 0, year: "" },
        february: { Hours: 0, year: "" },
        march: { Hours: 0, year: "" },
        april: { Hours: 0, year: "" },
        may: { Hours: 0, year: "" },
        june: { Hours: 0, year: "" },
        july: { Hours: 0, year: "" },
        august: { Hours: 0, year: "" },
        september: { Hours: 0, year: "" },
        october: { Hours: 0, year: "" },
        november: { Hours: 0, year: "" },
        december: { Hours: 0, year: "" },
    })

    const dataProcessingv2 = () => {

        setWorkingTimes((prevWorkingTimes) => {
            const updatedWorkingTimes = { ...prevWorkingTimes };

            updatedWorkingTimes.monday.Hours = 0
            updatedWorkingTimes.monday.date = ""

            updatedWorkingTimes.tuesday.Hours = 0
            updatedWorkingTimes.tuesday.date = ""

            updatedWorkingTimes.wednesday.Hours = 0
            updatedWorkingTimes.wednesday.date = ""

            updatedWorkingTimes.thursday.Hours = 0
            updatedWorkingTimes.thursday.date = ""

            updatedWorkingTimes.friday.Hours = 0
            updatedWorkingTimes.friday.date = ""

            updatedWorkingTimes.saturday.Hours = 0
            updatedWorkingTimes.saturday.date = ""

            updatedWorkingTimes.sunday.Hours = 0
            updatedWorkingTimes.sunday.date = ""

            updatedWorkingTimes.notwork.Hours = 40
            updatedWorkingTimes.totalHours.Hours = 0
            updatedWorkingTimes.pourcent.cent = ""

            if (data.error) {
                return updatedWorkingTimes
            }

            else if (data.data.length > 0) {

                const currentDate = new Date();

                const startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - 7);
                startDate.setHours(0, 0, 0, 0);

                const filteredData = data.data.filter((item) => {
                    const startTime = new Date(Date.parse(item.start_time));
                    startTime.setHours(0, 0, 0, 0);

                    return startTime >= startDate && startTime <= currentDate;
                });

                for (let i = 0; i < filteredData.length; i++) {

                    //  const updatedWorkingTimes = { ...workingTimes };

                    const startTime = new Date(Date.parse(filteredData[i].start_time));
                    const endTime = new Date(Date.parse(filteredData[i].end_time));

                    const day = new Date(startTime).getDay();

                    // const newDay = new Date(startTime).getDate();
                    // const newMonth = new Date(startTime).getMonth();
                    // const newYear = new Date(startTime).getFullYear();

                    // const fullDay = `${newDay}.${newMonth}.${newYear}`

                    // console.log(fullDay)

                    const valueEnd = `${endTime.getHours()}.${endTime.getMinutes()}`
                    const valueStart = `${startTime.getHours()}.${startTime.getMinutes()}`

                    const calculHours = parseFloat(valueEnd) - parseFloat(valueStart);

                    // if la date du jour est la meme pour certains working times, alors push dans l'array le working times du jours puis calculer tout l'array 

                    switch (day) {
                        case 1:
                            arrayMond.push(calculHours)
                            break;
                        case 2:
                            arrayTues.push(calculHours)
                            break;
                        case 3:
                            arrayWed.push(calculHours)
                            break;
                        case 4:
                            arrayThur.push(calculHours)
                            break;
                        case 5:
                            arrayFrid.push(calculHours)
                            break;
                        case 6:
                            arraySatur.push(calculHours)
                            break;
                        case 0:
                            arraySund.push(calculHours)
                            break;

                    }

                    const somme1 = arrayMond.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme2 = arrayTues.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme3 = arrayWed.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme4 = arrayThur.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme5 = arrayFrid.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme6 = arraySatur.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme7 = arraySund.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    switch (day) {
                        case 1:
                            updatedWorkingTimes.monday.Hours = somme1 / 2;
                            updatedWorkingTimes.monday.date = `${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`
                            break;
                        case 2:
                            updatedWorkingTimes.tuesday.Hours = somme2 / 2;
                            updatedWorkingTimes.tuesday.date = `${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`
                            break;
                        case 3:
                            updatedWorkingTimes.wednesday.Hours = somme3 / 2;
                            updatedWorkingTimes.wednesday.date = `${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`
                            break;
                        case 4:
                            updatedWorkingTimes.thursday.Hours = somme4 / 2;
                            updatedWorkingTimes.thursday.date = `${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`
                            break;
                        case 5:
                            updatedWorkingTimes.friday.Hours = somme5 / 2;
                            updatedWorkingTimes.friday.date = `${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`
                            break;
                        case 6:
                            updatedWorkingTimes.saturday.Hours = somme6 / 2;
                            updatedWorkingTimes.saturday.date = `${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`
                            break;
                        case 0:
                            updatedWorkingTimes.sunday.Hours = somme7 / 2;
                            updatedWorkingTimes.sunday.date = `${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`
                            break;
                    }


                    const calculTotalHours = workingTimes.monday.Hours + workingTimes.tuesday.Hours + workingTimes.wednesday.Hours + workingTimes.thursday.Hours + workingTimes.friday.Hours + workingTimes.saturday.Hours + workingTimes.sunday.Hours
                    const calculNotwork = 40 - calculTotalHours;
                    let calculPourcent = ((calculTotalHours / (40)) * 100).toFixed(2)

                    switch (true) {
                        case calculPourcent >= 0 && calculPourcent < 20:
                            calculPourcent = `${calculPourcent}% 🥶`;
                            break;
                        case calculPourcent >= 20 && calculPourcent < 40:
                            calculPourcent = `${calculPourcent}% 😸`;
                            break;
                        case calculPourcent >= 40 && calculPourcent < 60:
                            calculPourcent = `${calculPourcent}% 🔥`;
                            break;
                        case calculPourcent >= 60:
                            calculPourcent = `${calculPourcent}% 🤑`;
                            break;
                    }

                    updatedWorkingTimes.pourcent.cent = calculPourcent;

                    updatedWorkingTimes.totalHours.Hours = calculTotalHours;
                    updatedWorkingTimes.notwork.Hours = calculNotwork;

                    //  setWorkingTimes(updatedWorkingTimes);
                }
                return updatedWorkingTimes;
            }

            else {
                return updatedWorkingTimes
            }

        });

    }

    const dataProcessingv3 = () => {

        setWorkingTimesMonths((prevWorkingTimesLine) => {
            const updatedWorkingTimesLine = { ...prevWorkingTimesLine };

            updatedWorkingTimesLine.january.Hours = 0
            updatedWorkingTimesLine.january.year = ""

            updatedWorkingTimesLine.february.Hours = 0
            updatedWorkingTimesLine.february.year = ""

            updatedWorkingTimesLine.march.Hours = 0
            updatedWorkingTimesLine.march.year = ""

            updatedWorkingTimesLine.april.Hours = 0
            updatedWorkingTimesLine.april.year = ""

            updatedWorkingTimesLine.may.Hours = 0
            updatedWorkingTimesLine.may.year = ""

            updatedWorkingTimesLine.june.Hours = 0
            updatedWorkingTimesLine.june.year = ""

            updatedWorkingTimesLine.july.Hours = 0
            updatedWorkingTimesLine.july.year = ""

            updatedWorkingTimesLine.august.Hours = 0
            updatedWorkingTimesLine.august.year = ""

            updatedWorkingTimesLine.september.Hours = 0
            updatedWorkingTimesLine.september.year = ""

            updatedWorkingTimesLine.october.Hours = 0
            updatedWorkingTimesLine.october.year = ""

            updatedWorkingTimesLine.november.Hours = 0
            updatedWorkingTimesLine.november.year = ""

            updatedWorkingTimesLine.december.Hours = 0
            updatedWorkingTimesLine.december.year = ""

            if (data.error) {
                return updatedWorkingTimesLine
            }

            else if (data.data.length > 0) {

                for (let i = 0; i < data.data.length; i++) {

                    const startTime = new Date(Date.parse(data.data[i].start_time));
                    const endTime = new Date(Date.parse(data.data[i].end_time));

                    const month = new Date(startTime).getMonth();

                    const valueEnd = `${endTime.getHours()}.${endTime.getMinutes()}`
                    const valueStart = `${startTime.getHours()}.${startTime.getMinutes()}`

                    const calculHours = parseFloat(valueEnd) - parseFloat(valueStart);

                    switch (month) {
                        case 0:
                            arrayJanuary.push(calculHours)
                            break;
                        case 1:
                            arrayFeb.push(calculHours)
                            break;
                        case 2:
                            arrayMarch.push(calculHours)
                            break;
                        case 3:
                            arrayApril.push(calculHours)
                            break;
                        case 4:
                            arrayMay.push(calculHours)
                            break;
                        case 5:
                            arrayJune.push(calculHours)
                            break;
                        case 6:
                            arrayJuly.push(calculHours)
                            break;
                        case 7:
                            arrayAug.push(calculHours)
                            break;
                        case 8:
                            arraySetp.push(calculHours)
                            break;
                        case 9:
                            arrayOcto.push(calculHours)
                            break;
                        case 10:
                            arrayNov.push(calculHours)
                            break;
                        case 11:
                            arrayDec.push(calculHours)
                            break;
                    }

                    const somme1 = arrayJanuary.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme2 = arrayFeb.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme3 = arrayMarch.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme4 = arrayApril.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme5 = arrayMay.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme6 = arrayJune.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme7 = arrayJuly.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme8 = arrayAug.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme9 = arraySetp.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme10 = arrayOcto.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme11 = arrayNov.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme12 = arrayDec.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    switch (month) {
                        case 0:
                            updatedWorkingTimesLine.january.Hours = somme1 / 2
                            updatedWorkingTimesLine.january.year = startTime.getFullYear();
                            break;
                        case 1:
                            updatedWorkingTimesLine.february.Hours = somme2 / 2
                            updatedWorkingTimesLine.february.year = startTime.getFullYear()
                            break;
                        case 2:
                            updatedWorkingTimesLine.march.Hours = somme3 / 2
                            updatedWorkingTimesLine.march.year = startTime.getFullYear()
                            break;
                        case 3:
                            updatedWorkingTimesLine.april.Hours = somme4 / 2
                            updatedWorkingTimesLine.april.year = startTime.getFullYear()
                            break;
                        case 4:
                            updatedWorkingTimesLine.may.Hours = somme5 / 2
                            updatedWorkingTimesLine.may.year = startTime.getFullYear()
                            break;
                        case 5:
                            updatedWorkingTimesLine.june.Hours = somme6 / 2
                            updatedWorkingTimesLine.june.year = startTime.getFullYear()
                            break;
                        case 6:
                            updatedWorkingTimesLine.july.Hours = somme7 / 2
                            updatedWorkingTimesLine.july.year = startTime.getFullYear()
                            break;
                        case 7:
                            updatedWorkingTimesLine.august.Hours = somme8 / 2
                            updatedWorkingTimesLine.august.year = startTime.getFullYear()
                            break;
                        case 8:
                            updatedWorkingTimesLine.september.Hours = somme9 / 2
                            updatedWorkingTimesLine.september.year = startTime.getFullYear()
                            break;
                        case 9:
                            updatedWorkingTimesLine.october.Hours = somme10 / 2
                            updatedWorkingTimesLine.october.year = startTime.getFullYear()
                            break;
                        case 10:
                            updatedWorkingTimesLine.november.Hours = somme11 / 2
                            updatedWorkingTimesLine.november.year = startTime.getFullYear()
                            break;
                        case 11:
                            updatedWorkingTimesLine.december.Hours = somme12 / 2
                            updatedWorkingTimesLine.december.year = startTime.getFullYear()
                            break;
                    }
                }

                return updatedWorkingTimesLine;
            }

            else {
                return updatedWorkingTimesLine
            }
        })

    }

    const dataProcessingv4 = () => {
        setWorkingTimesv2((prevWorkingTimes) => {
            const updatedWorkingTimes = { ...prevWorkingTimes };

            updatedWorkingTimes.monday.Hours = 0

            updatedWorkingTimes.tuesday.Hours = 0

            updatedWorkingTimes.wednesday.Hours = 0

            updatedWorkingTimes.thursday.Hours = 0

            updatedWorkingTimes.friday.Hours = 0

            updatedWorkingTimes.saturday.Hours = 0

            updatedWorkingTimes.sunday.Hours = 0

            if (data.error) {
                return updatedWorkingTimes
            }

            else if (data.data.length > 0) {

                for (let i = 0; i < data.data.length; i++) {

                    const startTime = new Date(Date.parse(data.data[i].start_time));
                    const endTime = new Date(Date.parse(data.data[i].end_time));

                    const day = new Date(startTime).getDay();

                    const valueEnd = `${endTime.getHours()}.${endTime.getMinutes()}`
                    const valueStart = `${startTime.getHours()}.${startTime.getMinutes()}`

                    const calculHours = parseFloat(valueEnd) - parseFloat(valueStart);

                    switch (day) {
                        case 0:
                            array1.push(calculHours)
                            break;
                        case 1:
                            array2.push(calculHours)
                            break;
                        case 2:
                            array3.push(calculHours)
                            break;
                        case 3:
                            array4.push(calculHours)
                            break;
                        case 4:
                            array5.push(calculHours)
                            break;
                        case 5:
                            array6.push(calculHours)
                            break;
                        case 6:
                            array7.push(calculHours)
                            break;
                    }

                    const somme1 = array1.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme2 = array2.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme3 = array3.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme4 = array4.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme5 = array5.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme6 = array6.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    const somme7 = array7.reduce((x, i) => {
                        return x + i;
                    }, 0);

                    switch (day) {
                        case 0:
                            updatedWorkingTimes.monday.Hours = somme1 / 2;
                            break;
                        case 1:
                            updatedWorkingTimes.tuesday.Hours = somme2 / 2;
                            break;
                        case 2:
                            updatedWorkingTimes.wednesday.Hours = somme3 / 2;
                            break;
                        case 3:
                            updatedWorkingTimes.thursday.Hours = somme4 / 2;
                            break;
                        case 4:
                            updatedWorkingTimes.friday.Hours = somme5 / 2;
                            break;
                        case 5:
                            updatedWorkingTimes.saturday.Hours = somme6 / 2;
                            break;
                        case 6:
                            updatedWorkingTimes.sunday.Hours = somme7 / 2;
                            break;
                    }
                }
                return updatedWorkingTimes;
            }

            else {
                return updatedWorkingTimes;
            }

        });

    }

    const changeChart = (number) => {
        setChartType(number);
    }

    const dataDoug = {
        labels: [`Monday ${workingTimes.monday.date}`, `Tuesday ${workingTimes.tuesday.date}`, `Wednesday ${workingTimes.wednesday.date}`, `Thursday ${workingTimes.thursday.date}`, `Friday ${workingTimes.friday.date}`, `Saturday ${workingTimes.saturday.date}`, ` Sunday ${workingTimes.sunday.date}`],
        datasets: [
            {
                label: '% Work/Day',
                data: [workingTimes.monday.Hours, workingTimes.tuesday.Hours, workingTimes.wednesday.Hours, workingTimes.thursday.Hours, workingTimes.friday.Hours, workingTimes.saturday.Hours, workingTimes.sunday.Hours, workingTimes.notwork.Hours],
                backgroundColor: [
                    selectedColorForChart1[0], //lundi
                    selectedColorForChart1[1], // mardi
                    selectedColorForChart1[2], // mercredi
                    selectedColorForChart1[3], // jeudi
                    selectedColorForChart1[4], // vendredi
                    selectedColorForChart1[5], // samedi
                    selectedColorForChart1[6], // dimanche
                    'rgba(239, 239, 239 , 0.8)', // not work yet
                ],
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderWidth: 0,
            },
        ],
    };

    const dataDougv2 = {
        labels: [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, ` Sunday`],
        datasets: [
            {
                label: '% Work/Day',
                data: [workingTimesv2.monday.Hours, workingTimesv2.tuesday.Hours, workingTimesv2.wednesday.Hours, workingTimesv2.thursday.Hours, workingTimesv2.friday.Hours, workingTimesv2.saturday.Hours, workingTimesv2.sunday.Hours],
                backgroundColor: [
                    selectedColorForChart3[0], //lundi
                    selectedColorForChart3[1], // mardi
                    selectedColorForChart3[2], // mercredi
                    selectedColorForChart3[3], // jeudi
                    selectedColorForChart3[4], // vendredi
                    selectedColorForChart3[5], // samedi
                    selectedColorForChart3[6], // dimanche
                    'rgba(239, 239, 239 , 0.8)', // not work yet
                ],
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderWidth: 0,
            },
        ],
    };

    const dataLine = {
        labels: [`January ${workingTimesMonths.january.year}`, `February ${workingTimesMonths.february.year}`, `March ${workingTimesMonths.march.year}`, `April ${workingTimesMonths.april.year}`, `May ${workingTimesMonths.may.year}`, `June ${workingTimesMonths.june.year}`, `July ${workingTimesMonths.july.year}`, `August ${workingTimesMonths.august.year}`, `September ${workingTimesMonths.september.year}`, `October ${workingTimesMonths.october.year} `, `November ${workingTimesMonths.november.year}`, `December ${workingTimesMonths.december.year}`],
        datasets: [
            {
                fill: true,
                label: 'Hours/Month',
                data: [
                    workingTimesMonths.january.Hours,
                    workingTimesMonths.february.Hours,
                    workingTimesMonths.march.Hours,
                    workingTimesMonths.april.Hours,
                    workingTimesMonths.may.Hours,
                    workingTimesMonths.june.Hours,
                    workingTimesMonths.july.Hours,
                    workingTimesMonths.august.Hours,
                    workingTimesMonths.september.Hours,
                    workingTimesMonths.october.Hours,
                    workingTimesMonths.november.Hours,
                    workingTimesMonths.december.Hours,
                ],
                borderWidth: 4,
                fill: true,
                borderColor: selectedColorForChart2[0],
                backgroundColor: selectedColorForChart2[0],
            },
            {
                fill: true,
                label: 'Extra Hours',
                data: [
                    160,
                    160,
                    160,
                    160,
                    160,
                    160,
                    160,
                    160,
                    160,
                    160,
                    160,
                    160,
                ],
                borderWidth: 4,
                fill: true,
                borderColor: 'rgba(255, 23, 97, 0.8)',
                backgroundColor: 'rgba(255, 23, 97, 0.8)',
            }
        ],

    };

    const optionsLine = {
        scales: {
            y: {
                reverse: false,
                min: 0,
                max: 200
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <>
            <div className="container_main_component wti">
                <div className="contain_title_component">
                    <h1>Charts</h1>
                    <hr />
                </div>
                <div className="container_buttons_charts_wktime">
                    <button onClick={() => changeChart(1)}>My Works</button>
                    <button onClick={() => changeChart(2)}>Monthly Hours</button>
                    <button onClick={() => changeChart(3)}>Best Score</button>
                </div>
                <div className="container_charts_wktime">
                    {
                        chartType === 1 ? (
                            <>
                                <div className="wrapper_dog">

                                    <div className="wrapper_dougchart">
                                        {
                                            selectedType === 'defaultv3' ? (
                                                <Doughnut data={dataDoug} />
                                            ) : selectedType === 'barv3' ? (
                                                <Bar data={dataDoug} />
                                            ) : selectedType === 'piev3' ? (
                                                <Pie data={dataDoug} />
                                            ) : (
                                                <PolarArea data={dataDoug} />
                                            )
                                        }

                                    </div>

                                    <div className="wrapper_content_data_user">
                                        <h4>Over the last 7 days worked : </h4>
                                        <p>
                                            Username : <span>{selectedUserName ? selectedUserName : <>No user selected</>}</span><br /><br />
                                            Hours/Week : <span>{(workingTimes.totalHours.Hours).toFixed(2)}/40</span><br /><br />
                                            Poucentage : <span>{workingTimes.pourcent.cent ? workingTimes.pourcent.cent : <>No data</>}</span>
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : chartType === 2 ? (
                            <>
                                <div className="wrapper_line">
                                    {
                                        selectedTypeLine === 'defaultv5' ? (
                                            <Line data={dataLine} options={optionsLine} />
                                        ) : (
                                            <Bar data={dataLine} options={optionsLine} />
                                        )
                                    }
                                </div>
                            </>
                        ) : chartType === 3 ? (
                            <>
                                <div>
                                    {
                                        selectedTypeScore === 'defaultv11' ? (
                                            <div className='container_polar_charts'>
                                                <PolarArea data={dataDougv2} />
                                            </div>
                                        ) : (
                                            <div className='container_polar_charts'>
                                                <Bar data={dataDougv2} />
                                            </div>
                                        )
                                    }

                                </div>
                            </>
                        ) : null

                    }
                </div>

            </div>
        </>
    );
};

export default WorkingTime;