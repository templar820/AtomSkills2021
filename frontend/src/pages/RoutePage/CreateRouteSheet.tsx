import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { inject, observer } from 'mobx-react';
import YandexMap from '@/components/common/YandexMap';
import { StoresNames } from '@/stores/StoresNames';
import RouteLine from '@/components/common/RouteLine';
import Calendar from '@/components/System/Calendar/Calendar';
import {withRouter} from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
    background: '#FFF',
  },
});

const CreateRouteSheet = (props) => {
  const classes = useStyles();

  const routeStore = props[StoresNames.RouteStore];

  const addPoint = (point) => {
    const points = routeStore.routeSheet.points.filter(el => el.id !== point.id);
    points.push(point);
    routeStore.setPoints(points);
  };

  const deletePoint = (point) => {
    const points = routeStore.routeSheet.points.filter(el => el.id !== point.id);
    routeStore.setPoints(points);
  };

  const pointStore = props[StoresNames.PointStore];

  console.log(routeStore.selectedRoutes.length);

  return (
    <div className="carrier-pa w-100 pb-4">
      <YandexMap
        onClick={(point) => {
          addPoint(point);
        }}
        width={1000}
        height={800}
      />
      <div className="my-4 d-flex flex-column align-items-start">
        <span>Планируемое время отправки</span>
        <Calendar value={routeStore.startTime} onChange={routeStore.setTime} />
      </div>
      <div className="my-4">
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Начальная точка</TableCell>
              <TableCell align="right">адресс</TableCell>
              <TableCell>Конечная точка</TableCell>
              <TableCell align="right">адресс</TableCell>
              <TableCell align="right">Расстояние</TableCell>
              <TableCell align="right">Ожидаемое время доставки</TableCell>
              <TableCell align="right">Прикрепленные заявки</TableCell>
              <TableCell align="right">Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routeStore.selectedRoutes.length < 1 ? null : routeStore.selectedRoutes.map((route, index) => (
              <RouteLine
                time={route.plainTime}
                value={routeStore.getPair(route.startId, route.endId)?.applications || null}
                pair={[pointStore.points.find(el => el.id === route.startId), pointStore.points.find(el => el.id === route.endId)]}
                index={index}
                model={routeStore.routeSheet}
                onDelete={(point) => {
                  deletePoint(point);
                }}
                onChange={(selectedData) => {
                  routeStore.addRoute({
                    startId: route.startId,
                    endId: route.endId,
                    applications: selectedData.applications,
                  });
                }}
              />
            ))}
          </TableBody>
        </Table>

        <div className="d-flex justify-content-end mt-5 mb-5">
          <button
            className={`btn btn-primary ${(!routeStore.startTime || !routeStore.selectedRoutes.length) ? 'disabled' : ''}`}
            onClick={async () => {
              if(!routeStore.startTime || !routeStore.selectedRoutes.length) return;
              const data = await props.services.routeService.createRoutSheet();
              props.history.push(`/route/${data.id}`);
            }}
          >
            Создать маршрутный лист
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(inject('services', StoresNames.PointStore, StoresNames.RouteStore)(observer(CreateRouteSheet)));
