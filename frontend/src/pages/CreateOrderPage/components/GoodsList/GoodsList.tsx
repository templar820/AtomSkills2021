import React, {useEffect} from 'react';
import './GoodsList.scss';
import {inject, observer} from "mobx-react";
import {StoresNames} from "@/stores/StoresNames";
import ContentLoader from "@/components/System/ContentLoader/ContentLoader";
import {list} from "postcss";
import {useTranslation} from "react-i18next";

const UserList: React.FC<{ goods: any[]}> = (props) => {
  const {t} = useTranslation();

  return (
    <div className="user-list">
      <ul className="user-list__wrapper">
        <li className="user-list__item user-list__item_header">
          <div className="email">{t('createOrderPage.goodsName')}</div>
          <div className="name">{t('createOrderPage.count')}</div>
          <div className="patronymic">{t('createOrderPage.weight')}</div>
          <div className="phone">{t('createOrderPage.volume')}</div>
        </li>
        {
          props.goods.map(good => (
            <li className="user-list__item">
              <div className="email">{good.name}</div>
              <div className="name">{good.count}</div>
              <div className="patronymic">{good.weight}</div>
              <div className="phone">{good.volume}</div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default inject('services', StoresNames.UserListStore)(observer(UserList));
