import React, {useEffect, useState} from 'react';
import './PrintOrder.scss';
import {useHistory, useParams} from "react-router-dom";
import {inject, observer} from "mobx-react";

const PrintOrder = (props) => {
  let {id} = useParams();
  const history = useHistory();
  const [order, setOrder] = useState(null);

  const getOrder = async () => {
    const newOrder = await props.services.orderService.getById(id);
    if (!newOrder) history.push('/404');
    setOrder(newOrder);
  };

  useEffect(() => {
    getOrder();
  }, []);

  console.log(order);
  if (!order) return null;

  const getDate = (d: string) => {
    if (!d) return '';
    return d.slice(0, 10);
  };

  return (
    <div className="print-order">
      <h5 className="title">ЗАЯВКА НА ПЕРЕВОЗКУ ГРУЗА № {order.id} от {getDate(order.date)}</h5>
      <div className="table table1">
        <div className="raw">
          <div className="cell">ЗАКАЗЧИК</div>
          <div className="cell">ПОЛУЧАТЕЛЬ</div>
        </div>
        <div className="raw">
          <div className="cell"><span className="cell-title">Наименование:</span> {order.sender.name}</div>
          <div className="cell"><span className="cell-title">Наименование:</span> {order.recipient.name}</div>
        </div>
        <div className="raw">
          <div className="cell"><span className="cell-title">ИНН:</span> {order.sender.inn}</div>
          <div className="cell"><span className="cell-title">Ответственный:</span> {order.recipient_responsible.FIO}</div>
        </div>
        <div className="raw">
          <div className="cell"><span className="cell-title">Ответственный:</span> {order.sender_responsible.FIO}</div>
          <div className="cell"><span className="cell-title">Телефон:</span> {order.recipient_responsible.phone}</div>
        </div>
        <div className="raw">
          <div className="cell"><span className="cell-title">Телефон:</span> {order.sender_responsible.phone}</div>
          <div className="cell"></div>
        </div>
        <div className="raw">
          <div className="cell"><span className="cell-title">E-mail:</span> {order.sender_responsible.email}</div>
          <div className="cell"></div>
        </div>
        <div className="raw">
          <div className="cell"><span className="cell-title">Дата отправления:</span> {order.dispatch_date}</div>
          <div className="cell"><span className="cell-title">Дата прибытия:</span> {order.arrival_date}</div>
        </div>
        <div className="raw">
          <div className="cell w-100 cell-spec text-align">СПЕЦИФИКАЦИЯ ЗАЯВКИ</div>
        </div>

        <div className="raw">
          <div className="cell cell-spec1 background cell-title text-align">Наименование</div>
          <div className="cell cell-spec2 background cell-title text-align">Кол-во</div>
          <div className="cell cell-spec3 background cell-title text-align">Вес, кг</div>
          <div className="cell cell-spec4 background cell-title text-align">Объем, м3</div>
          <div className="cell cell-spec5 background cell-title text-align">Особые требования</div>
        </div>
        {
          order.goods.map((good) => (
            <div className="raw">
              <div className="cell cell-spec1 text-align">{good.name}</div>
              <div className="cell cell-spec2 text-align">{good.count}</div>
              <div className="cell cell-spec3 text-align">{good.weight}</div>
              <div className="cell cell-spec4 text-align">{good.volume}</div>
              <div className="cell cell-spec5 text-align">{good.requirements}</div>
            </div>
          ))
        }
        <div className="raw w-100">
          <div className="cell cell-description w-100"><span className="cell-title">Описание:</span></div>
        </div>
        <div className="raw cost">
          <div className="cell cell1 cell-title background">Стоимость перевозки</div>
          <div className="cell cell2">{order.price}</div>
        </div>
      </div>
    </div>
  );
};

export default inject('services')(observer(PrintOrder));
