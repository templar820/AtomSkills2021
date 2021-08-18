import React, {useEffect} from 'react';
import './UserList.scss';
import {inject, observer} from "mobx-react";
import {StoresNames} from "@/stores/StoresNames";
import ContentLoader from "@/components/System/ContentLoader/ContentLoader";
import {list} from "postcss";
import {useTranslation} from "react-i18next";

const UserList: React.FC<{ services: any, userStore: any }> = (props) => {
  const users = props[StoresNames.UserListStore].users;
  const {t} = useTranslation();
  useEffect(() => {
    props.services.userService.getUsers();
  }, []);

  return (
    <div className="user-list">
      <ul className="user-list__wrapper">
        <li className="user-list__item user-list__item_header">
          <div className="email">{t('userList.email')}</div>
          <div className="first-name">{t('createUserDialog.first_name')}</div>
          <div className="name">{t('createUserDialog.name')}</div>
          <div className="patronymic">{t('createUserDialog.patronymic')}</div>
          <div className="phone">{t('createUserDialog.phone')}</div>
          <div className="role">{t('createUserDialog.role')}</div>
        </li>
        {
          !users
            ? [...Array(9).keys()].map((value) => (
              <div key={value} className="user-list__preload">
                <ContentLoader />
              </div>
            ))
            : (
              users.map(user => (
                <li className="user-list__item">
                  <div className="email">{user.email}</div>
                  <div className="first-name">{user.first_name}</div>
                  <div className="name">{user.name}</div>
                  <div className="patronymic">{user.patronymic}</div>
                  <div className="phone">{user.phone}</div>
                  <div className="role">{user.role}</div>
                </li>
              ))
            )
        }
      </ul>
    </div>
  );
};

export default inject('services', StoresNames.UserListStore)(observer(UserList));
