import React, {useEffect, useState} from 'react';
import './RouteList.scss';
import {Link, useHistory, withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {StoresNames} from "@/stores/StoresNames";
import {FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ContentLoader from "@/components/System/ContentLoader/ContentLoader";
import {useTranslation} from "react-i18next";

type statusSearchType = 'NEW' | 'READY' | 'INTRANSIT' | 'CANCELLED' | 'DONE';

const RouteList: React.FC<{services: any}> = (props) => {
  const { t } = useTranslation();
  const [statusSearch, setStatusSearch] = useState<statusSearchType>('NEW');
  const [searchId, setSearchId] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    props.services.routeService.getRoutes(statusSearch);
  }, []);

  useEffect(() => {
    props.services.routeService.getRoutes(statusSearch);
  }, [statusSearch])

  const routes = props[StoresNames.RouteStore].routes;

  console.log(routes);
  return (
    <div>
      <div className="mb-3 d-flex justify-content-between align-items-end">
        <div className="d-flex align-items-center">
          <h4>{t('managerPersonalAccount.routes')}</h4>
          <Link
            className="ml-3"
            to="/create-route-sheet"
          >
            Создать новый маршрут
          </Link>
        </div>
        <div className="d-flex align-items-end">
          <form style={{width: '140px', marginRight: '20px'}} onSubmit={(e) => {
            e.preventDefault();
            history.push(`/route/${searchId}`);
          }}>
            <TextField
              // className={`${classes.input} product-substanceId`}
              label="Номер маршрута"
              size="small"
              type="number"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </form>
          <FormControl style={{width: '150px'}}>
            <InputLabel id="demo-controlled-open-select-label">Статус</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={statusSearch}
              onChange={(e) => setStatusSearch(e.target.value)}
            >
              <MenuItem value="NEW">NEW</MenuItem>
              <MenuItem value="READY">READY</MenuItem>
              <MenuItem value="INTRANSIT">INTRANSIT</MenuItem>
              <MenuItem value="CANCELLED">CANCELLED</MenuItem>
              <MenuItem value="DONE">DONE</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="row">
        {
          !routes
            ? [...Array(12).keys()].map((value) => (
              <div key={value} className="product-card col-12 col-sm-6 col-lg-4 mb-3">
                <ContentLoader/>
              </div>
            ))
            : (
              <>
                {
                  routes.map((route) => (
                    <div key={route.id} className="product-card col-12 col-sm-6 col-lg-4 mb-3"
                      style={{cursor: 'pointer'}}
                      onClick={()=> history.push(`/route/${route.id}`)}
                    >
                      <div className="product-card__wrapper card-body">
                        <h5 className="card-title">Маршрутный лист №{route.id}</h5>
                        {/*<p className="card-text mb-1">{product.substanceName}</p>*/}
                        {/*<p className="card-text">{product.substanceCode}</p>*/}
                      </div>
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

export default withRouter(inject(StoresNames.RouteStore, StoresNames.UserStore, 'services')(observer(RouteList)));