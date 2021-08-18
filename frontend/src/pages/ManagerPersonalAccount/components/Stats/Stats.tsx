import React, {useEffect, useRef, useState} from 'react';
import './Stats.scss';
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {StoresNames} from "@/stores/StoresNames";
import {Chart, registerables} from "chart.js";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
Chart.register(...registerables);

type periodType = 'year' | 'month' | 'day';
const Stats: React.FC<{services: any}> = ({services}) => {
  const [priceStat, setPriceStat] = useState(null);
  const [pricePeriod, setPricePeriod] = useState<periodType>('day');
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [periodChart, setPeriodChart] = useState(null);
  const [organizationsState, setOrganizationsState] = useState([]);

  const [volumeStat, setVolumeStat] = useState(null);
  const [volumePeriod, setVolumePeriod] = useState<periodType>('day');
  const [volumeFilter, setVolumeFilter] = useState<string>("");
  const [volumeChart, setVolumeChart] = useState(null);
  const [pointState, setPointState] = useState([]);

  const priceChartRef = useRef<HTMLCanvasElement>(null);
  const volumeChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    getPriceStat();
    getVolumeStat();
  }, []);

  useEffect(() => {
    if (!priceStat || !periodChart) return;
    periodChart.destroy();
    priceChartRef.current && createChart(priceChartRef.current, getDataset(priceStat, priceFilter, pricePeriod), priceFilter, setPeriodChart);
  }, [pricePeriod, priceFilter]);

  useEffect(() => {
    console.log(volumeFilter, volumeStat, volumeChart);
    if (!volumeStat || !volumeChart) return;
    volumeChart.destroy();
    volumeChartRef.current && createChart(volumeChartRef.current, getDataset(volumeStat, volumeFilter, volumePeriod), volumeFilter, setVolumeChart);
  }, [volumePeriod, volumeFilter]);

  const getDataset = (stat: any[], name: string, period: string) => {

    const targetData = stat.filter((data) => data.name === name).sort((a, b) => new Date(a.date) - new Date(b.date));
    return targetData.map((d) => {
      const dateT = new Date(d.date);
      let stringDate;

      switch (period) {
        case 'day':
          stringDate = d.date;
          break;
        case 'month':
          stringDate = dateT.getFullYear() + '-' + ("0" + (dateT.getMonth() + 1)).slice(-2);
          break;
        case 'year':
          stringDate = String(dateT.getFullYear());
          break;
      }
      return {
        x: stringDate,
        y: d.value,
      };
    });
  };

  const createChart = (canvasElement: HTMLCanvasElement, dataSet: any[], label, setChart) => {
    const config = {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          data: dataSet,
          label: label,
          backgroundColor: 'rgb(54, 162, 235)',
        }]
      },
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
            }
          }],
          xAxes: [{
            type: 'time',
            distribution: 'linear',
          }],
          title: {
            display: false,
          }
        }
      }
    };
    const chart = new Chart(canvasElement, config);
    setChart(chart);
  }

  const getPriceStat = async () => {
    const stat = await services.statsService.getPriceStats(pricePeriod);
    setPriceStat(stat);
    let organizations = [];
    stat.forEach((s) => {
      if (!organizations.includes(s.name)) {
        organizations.push(s.name);
      }
    });
    setOrganizationsState(organizations);
    setPriceFilter(organizations[0]);
    // setPriceDataset(getDataset());
    const dataSet = getDataset(stat, organizations[0], pricePeriod)
    console.log(11, stat);
    priceChartRef.current && createChart(priceChartRef.current, dataSet, organizations[0], setPeriodChart);
  };

  const getVolumeStat = async () => {
    const stat = await services.statsService.getVolumeStats(pricePeriod);
    setVolumeStat(stat);
    let points = [];
    stat.forEach((s) => {
      if (!points.includes(s.name)) {
        points.push(s.name);
      }
    });
    setPointState(points);
    setVolumeFilter(points[0]);
    const dataSet = getDataset(stat, points[0], volumePeriod)
    volumeChartRef.current && createChart(volumeChartRef.current, dataSet, points[0], setVolumeChart);
  };

  if (!priceStat) return null;

  return (
    <div>
      <div className="mb-5">
        <h4>Статистика</h4>
      </div>
      <div className="charts mb-4">
        <div style={{display: "flex", alignItems: "center", marginBottom: '10px'}}>
          <h5>Полученная прибыль</h5>
          <FormControl style={{width: '130px', marginLeft: '30px'}}>
            <InputLabel id="demo-controlled-open-select-label">Организации</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              {
                organizationsState?.map(org => <MenuItem value={org}>{org}</MenuItem>)
              }
            </Select>
          </FormControl>
          <FormControl style={{width: '130px', marginLeft: '30px'}}>
            <InputLabel id="demo-controlled-open-select-label">Период</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={pricePeriod}
              onChange={(e) => setPricePeriod(e.target.value)}
            >
              <MenuItem value={'year'}>year</MenuItem>
              <MenuItem value={'month'}>month</MenuItem>
              <MenuItem value={'day'}>day</MenuItem>
            </Select>
          </FormControl>
        </div>
        <canvas ref={priceChartRef} />
      </div>

      <div className="charts mb-4">
        <div style={{display: "flex", alignItems: "center", marginBottom: '30px', marginTop: '30px'}}>
          <h5>Объем</h5>
          <FormControl style={{width: '130px', marginLeft: '30px'}}>
            <InputLabel id="demo-controlled-open-select-label">Организации</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={volumeFilter}
              onChange={(e) => setVolumeFilter(e.target.value)}
            >
              {
                pointState?.map(point => <MenuItem value={point}>{point}</MenuItem>)
              }
            </Select>
          </FormControl>
          <FormControl style={{width: '130px', marginLeft: '30px'}}>
            <InputLabel id="demo-controlled-open-select-label">Период</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={volumePeriod}
              onChange={(e) => setVolumePeriod(e.target.value)}
            >
              <MenuItem value={'year'}>year</MenuItem>
              <MenuItem value={'month'}>month</MenuItem>
              <MenuItem value={'day'}>day</MenuItem>
            </Select>
          </FormControl>
        </div>
        <canvas ref={volumeChartRef} />
      </div>

    </div>
  );
};

export default withRouter(inject('services')(observer(Stats)));