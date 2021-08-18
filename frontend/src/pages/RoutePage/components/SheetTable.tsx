import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import SheetLine from '@pages/RoutePage/components/SheetLine';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
    background: '#FFF',
  },
});

const ReadySheet = (props) => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [sheet, setSheet] = useState(props.sheet);
  let condition = true;

  const getLast = () => {
    return props.sheet.status === 'INTRANSIT' || props.sheet.status === 'DONE' ? true : null;
  };

  const getButton = (route) => {
    console.log(route, data);
    if (route.status === 'DONE') return <button className="btn btn-success"> Принято</button>;

    if (!condition) return null;
    condition = false;

    return (
      <button
        onClick={async () => {
          await props.services.routeService.routeDone(route.id);
          setSheet(await props.services.routeService.getRoute(sheet.id))
        }}
        className="btn btn-primary"
      >
        {' '}
        Принять грузы
      </button>
    );
  };
  sheet.routes = sheet.routes.sort((a,b) => a.order - b.order);
  return (
    <div className="my-4">
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Статус</TableCell>
            <TableCell>адресс</TableCell>
            <TableCell>Откуда</TableCell>
            <TableCell>Куда</TableCell>
            <TableCell>Плановые</TableCell>
            <TableCell>Фактические</TableCell>
            <TableCell>Заявки</TableCell>
            {getLast() && <TableCell align="right">Кнопки</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {sheet.routes.map((route, index) => (
            <TableRow>
              <SheetLine route={route} chipDelete={props.chipDelete} />
              {getLast() && (
                <TableCell align="right">
                  {getButton(route)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default withRouter(inject('services')(observer(ReadySheet)));
