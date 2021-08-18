import React, {useEffect, useState} from 'react';
import './PrintSheet.scss';
import {useHistory, useParams} from "react-router-dom";
import {inject, observer} from "mobx-react";

const PrintSheet = (props) => {
  let {id} = useParams();
  const history = useHistory();
  const [sheet, setSheet] = useState(null);

  const getSheet = async () => {
    const newSheet = await props.services.routeService.getRoute(id);
    if (!newSheet) history.push('/404');
    setSheet(newSheet);
  };

  useEffect(() => {
    getSheet();
  }, []);

  console.log(sheet);
  if (!sheet) return null;

  const getDate = (d: string) => {
    if (!d) return '';
    return d.slice(0, 10);
  };

  return (
    <div className="print-sheet">
      <h5 className="title">МАРШРУТНЫЙ ЛИСТ № {sheet.id}</h5>
      <div className="d-flex justify-content-end">
        <div className="table table1">
          <div className="raw">
            <div className="cell cell11">ОРГАНИЗАЦИЯ</div>
          </div>
          <div className="raw">
            <div className="cell cell1 cell-title">Наименование</div>
            <div className="cell cell2">ЗАО «Росатом – логистика»</div>
          </div>
          <div className="raw">
            <div className="cell cell1 cell-title">Адрес</div>
            <div className="cell cell2">г. Москва, ул. Заречная, д.31</div>
          </div>
          <div className="raw">
            <div className="cell cell1 cell-title">Телефон</div>
            <div className="cell cell2">+74596585424</div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <div className="table table2">
          <div className="raw">
            <div className="cell cell1"></div>
            <div className="cell cell2">ДАТА, ВРЕМЯ</div>
          </div>
          <div className="raw">
            <div className="cell cell1 cell-title">Выезд</div>
            <div className="cell cell2">{getDate(sheet.routes[0]?.fact_date_from)}</div>
          </div>
          <div className="raw">
            <div className="cell cell1 cell-title">Возврат</div>
            <div className="cell cell2">{getDate(sheet.routes[sheet.routes.length - 1]?.fact_date_to)}</div>
          </div>
        </div>
      </div>
      <div className="table table3">
        <div className="raw">
          <div className="cell cell11">МАРШРУТ</div>
        </div>
        <div className="raw">
          <div className="cell cell1 cell-title">Откуда</div>
          <div className="cell cell2 cell-title">Дата, время отправления</div>
          <div className="cell cell1 cell-title">Куда</div>
          <div className="cell cell2 cell-title">Дата, время прибытия</div>
        </div>
        {
          sheet.routes.map((route) => (
            <div className="raw">
              <div className="cell cell1">{route.relation_point_from_id.address}</div>
              <div className="cell cell2">{getDate(route.fact_date_from)}</div>
              <div className="cell cell1">{route.relation_point_to_id.address}</div>
              <div className="cell cell2">{getDate(route.fact_date_to)}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default inject('services')(observer(PrintSheet));