import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";
import ContentLoader from "@/components/System/ContentLoader/ContentLoader";

const CourierRoutePage = (props) => {
  let { id } = useParams();
  const history = useHistory();
  const [sheet, setSheet] = useState(null);

  const getSheet = async () => {
    const newSheet = await props.services.routeService.getRoute(id);
    console.log(newSheet);
    if (!newSheet) history.push('/404');
    setSheet(newSheet);
  };

  useEffect(() => {
    getSheet();
  }, []);

  if (!sheet) return null;
  return (
    <div>
      <div className="mb-3">
        <h4>Маршрутный лист № {sheet.id}</h4>
      </div>
      <div className="user-list">
        <ul className="user-list__wrapper">
          <li className="user-list__item user-list__item_header">
            <div className="email">Статус</div>
            <div className="name">Откуда</div>
            <div className="patronymic">Куда</div>
            <div className="patronymic">Дата отправления</div>
            <div className="patronymic">Дата прибытия</div>
          </li>
          {
            !sheet
              ? [...Array(9).keys()].map((value) => (
                <div key={value} className="user-list__preload">
                  <ContentLoader />
                </div>
              ))
              : (
                sheet.routes.map(route => (
                  <li className="user-list__item">
                    <div className="email">{route.status}</div>
                    <div className="first-name">{route.relation_point_from_id.address}</div>
                    <div className="name">{route.relation_point_to_id.address}</div>
                    <div className="name">{route.fact_date_from}</div>
                    <div className="name">{route.fact_date_to}</div>
                  </li>
                ))
              )
          }
        </ul>
      </div>
      <div className="d-flex justify-content-end mt-5 pb-4">
        <button
          className="btn btn-link"
          onClick={() => window.open(
            `/print-sheet/${sheet.id}`,
            "Print version",
            "resizable,scrollbars,status"
          )}
        >Версия для печати</button>
      </div>
    </div>
  );
};

export default inject('services')(observer(CourierRoutePage));
