import React, {useState, useEffect} from 'react';
import './CarrierPersonalAccount.scss';
import ContentLoader from "@/components/System/ContentLoader/ContentLoader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {StoresNames} from "@/stores/StoresNames";
import {Link, useHistory, withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";

const CarrierPersonalAccount = (props) => {
  const history = useHistory();

  useEffect(() => {
    const userId = props[StoresNames.UserStore].user.id;
    console.log(userId);
    props.services.routeService.getCourierRoutes(userId);
  }, []);

  const routes = props[StoresNames.RouteStore].routes;

  return (
    <div className="carrier-pa">
      <div className="mb-3">
        <h4>Маршрутные листы</h4>
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
                    <div
                      key={route.id}
                      className="product-card col-12 col-sm-6 col-lg-4 mb-3"
                      onClick={() => history.push(`/route/${route.id}`)}
                      style={{cursor: 'pointer'}}
                    >
                      <div className="product-card__wrapper card-body">
                        <div className="d-flex justify-content-between">
                          <h5 className="card-title">Маршрут № {route.id}</h5>
                        </div>
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

export default withRouter(inject(StoresNames.RouteStore, StoresNames.UserStore, 'services')(observer(CarrierPersonalAccount)));
