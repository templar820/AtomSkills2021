import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useTranslation } from 'react-i18next';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { toJS } from 'mobx';
import { Card } from 'react-bootstrap';
import ContentLoader from '@/components/System/ContentLoader/ContentLoader';
import { StoresNames } from '@/stores/StoresNames';

type statusSearchType = 'NEW' | 'READY' | 'INTRANSIT' | 'CANCELLED' | 'DONE';

const SimpleOrderList: React.FC<{services: any}> = (props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);

  const [statusSearch, setStatusSearch] = useState<statusSearchType>('NEW');

  const point = props[StoresNames.UserStore].user.point_id;
  const points = toJS(props[StoresNames.PointStore].points) || [];
  const [pointSearch, setPointSearch] = useState<statusSearchType>(point);

  useEffect(() => {
    props.services.orderService.getOrdersFrom(pointSearch, statusSearch);
    props.services.pointService.getPoints();
  }, []);

  const handleOpenSettingsMenu = (e: MouseEvent) => {
    e.stopPropagation();

    if (e.currentTarget) setAnchorEl(e.currentTarget as Element);
  };

  const handleCloseSettingsMenu = (e: MouseEvent) => {
    e.stopPropagation();

    setAnchorEl(null);
  };

  const { orders } = props[StoresNames.OrderStore];

  if (!point) return null;
  console.log(points.find(el => el.id === point));
  return (
    <div>
      <div className="mb-3 d-flex justify-content-between align-items-end">
        <div className="d-flex align-items-center">
          <h4>Заявки</h4>
          <Link
            className="ml-3 "
            to="/create-order"
          >
            Создать новую заявку
          </Link>
        </div>
        <FormControl style={{ width: '150px' }}>
          <InputLabel id="demo-controlled-open-select-label">Статус</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={statusSearch}
            onChange={(e) => {
              setStatusSearch(e.target.value);
              props.services.orderService.getOrdersFrom(pointSearch, e.target.value);
            }}
          >
            <MenuItem value="NEW">NEW</MenuItem>
            <MenuItem value="READY">READY</MenuItem>
            <MenuItem value="INTRANSIT">INTRANSIT</MenuItem>
            <MenuItem value="CANCELLED">CANCELLED</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: '150px' }}>
          <InputLabel id="demo-controlled-open-select-label">Точка отправки</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={pointSearch}
            onChange={(e) => {
              setPointSearch(e.target.value);
              props.services.orderService.getOrdersFrom(e.target.value, statusSearch);
            }}
          >
            {points.map(el => (
              <MenuItem value={el.id}>{el.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

      </div>
      <div className="d-flex flex-row flex-grow-1">
        {
          !orders
            ? [...Array(12).keys()].map((value) => (
              <div key={value} className="product-card col-12 col-sm-6 col-lg-4 mb-3">
                <ContentLoader />
              </div>
            ))
            : (
              <>
                {
                  orders.map((order) => (
                    <div onClick={() => { props.history.push(`/order/${order.id}`); }} key={order.id} className="product-card d-flex btn">
                      <div className="product-card__wrapper card-body d-flex flex-column">
                        <div className="d-flex justify-content-between">
                          <h5 className="card-title align-self-start">
                            Заявка №
                            {' '}
                            {order.id}
                          </h5>
                          <div className="d-flex justify-content-end flex-row">
                            {statusSearch === 'INDESTINATION' && (
                              <MoreVertIcon onClick={handleOpenSettingsMenu} style={{ cursor: 'pointer' }} />)}
                          </div>
                        </div>
                        <p className="card-text mb-1">{order.point_to.address}</p>
                        <p className="card-text mb-1">{order.point_to.name}</p>
                        <p className="card-text mb-1 font-weight-bold">
                          Cтоимость:
                          {' '}
                          {' '}
                          {order.price}
                        </p>
                      </div>

                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted={false}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseSettingsMenu}
                      >
                        <MenuItem onClick={e => {
                          e.stopPropagation();
                          props.services.routeService.changeStatus(order, 'DONE');
                          handleCloseSettingsMenu(e);
                        }}
                        >
                          Выдача груза
                        </MenuItem>
                        <MenuItem onClick={e => {
                          e.stopPropagation();
                          props.services.routeService.changeStatus(order, 'CANCELLED');
                          handleCloseSettingsMenu(e);
                        }}
                        >
                          Возврат груза
                        </MenuItem>
                      </Menu>
                    </div>
                  ))
                }
              </>
            )
        }
      </div>
    </div>
  );
};

export default withRouter(inject(StoresNames.OrderStore, StoresNames.PointStore, StoresNames.UserStore, 'services')(observer(SimpleOrderList)));
