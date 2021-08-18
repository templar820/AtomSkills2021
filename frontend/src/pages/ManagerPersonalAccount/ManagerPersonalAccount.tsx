import React, { useEffect, useRef, useState } from 'react';
import './ManagerPersonalAccount.scss';
import { inject, observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StoresNames } from '@/stores/StoresNames';
import OrderList from "@pages/ManagerPersonalAccount/components/IssuanceOrderList/IssuanceOrderList";
import RouteList from "@pages/ManagerPersonalAccount/components/RouteList/RouteList";
import Stats from './components/Stats/Stats';
import SimpleOrderList from "@pages/ManagerPersonalAccount/components/SimpleOrderList/SimpleOrderList";

type navStateType = 'Orders' | 'Routes' | 'IssuanceOrders' | 'Stats' | 'Orders';

const ManagerPersonalAccount: React.FC<{ services: any }> = (props) => {
  const { t } = useTranslation();
  const [navState, setNavState] = useState<navStateType>('Orders');
  const productStore = props[StoresNames.ProductStore];


  const { products } = productStore;
  return (
    <div className="home-page">
      <div className="home-page__navigation">
        <ul>
          <li>
            <button className={`btn btn-link ${navState === 'Orders' ? 'btn_active' : ''}`} onClick={() => setNavState('Orders')}>
              Заявки
            </button>
          </li>
          <li>
            <button className={`btn btn-link ${navState === 'IssuanceOrders' ? 'btn_active' : ''}`} onClick={() => setNavState('IssuanceOrders')}>
              {t('managerPersonalAccount.issuanceOrders')}
            </button>
          </li>
          <li>
            <button className={`btn btn-link ${navState === 'Routes' ? 'btn_active' : ''}`} onClick={() => setNavState('Routes')}>
              {t('managerPersonalAccount.routes')}
            </button>
          </li>
          <li>
            <button className={`btn btn-link ${navState === 'Stats' ? 'btn_active' : ''}`} onClick={() => setNavState('Stats')}>
              Статистика
            </button>
          </li>
        </ul>
      </div>
      <div className="home-page__content">
        {
          navState === 'IssuanceOrders'
          && <OrderList />
        }
        {
          navState === 'Orders'
          && <SimpleOrderList />
        }
        {
          navState === 'Routes'
          && <RouteList />
        }
        {
          navState === 'Stats'
          && <Stats />
        }
      </div>
    </div>
  );
};

export default withRouter(inject(StoresNames.ProductStore, 'services')(observer(ManagerPersonalAccount)));
