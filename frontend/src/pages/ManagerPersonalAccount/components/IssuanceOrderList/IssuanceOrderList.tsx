import React, {useEffect, useState} from 'react';
import './OrderList.scss';
import {Link, withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {StoresNames} from "@/stores/StoresNames";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ContentLoader from "@/components/System/ContentLoader/ContentLoader";
import {useTranslation} from "react-i18next";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Notification from "@/components/System/Notification";

const IssuanceOrderList: React.FC<{services: any}> = (props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const orders = props[StoresNames.OrderStore].orders

  useEffect(() => {
    const point = props[StoresNames.UserStore].user.point_id;
    props.services.orderService.getOrdersTo(point, 'INDESTINATION');
  }, []);

  const handleOpenSettingsMenu = (e: MouseEvent) => {
    e.stopPropagation();

    if (e.currentTarget) setAnchorEl(e.currentTarget as Element);
  };

  const handleCloseSettingsMenu = (e: MouseEvent) => {
    e.stopPropagation();

    setAnchorEl(null);
  };
  
  return (
    <div>
      <div className="mb-3 d-flex justify-content-between align-items-end">
        <div className="d-flex align-items-center">
          <h4>{t('managerPersonalAccount.issuanceOrders')}</h4>
          <Link
            className="ml-3 "
            to="/create-order"
          >
            Создать новую заявку
          </Link>
        </div>
        {/*<div className="home-page__search">*/}
        {/*  <form*/}
        {/*    onSubmit={(e) => {*/}
        {/*      e.preventDefault();*/}
        {/*      props.services.productService.searchProduct(searchProduct);*/}
        {/*    }}*/}
        {/*    className="d-flex align-items-center"*/}
        {/*  >*/}
        {/*    <TextField*/}
        {/*      label={t('managerPersonalAccount.searchOrder')}*/}
        {/*      variant="standard"*/}
        {/*      size="small"*/}
        {/*      value={searchProduct}*/}
        {/*      onChange={(e) => setSearchProduct(e.target.value)}*/}
        {/*      InputLabelProps={{required: false}}*/}
        {/*    />*/}
        {/*    <IconButton*/}
        {/*      type="submit"*/}
        {/*    >*/}
        {/*      <SearchIcon/>*/}
        {/*    </IconButton>*/}
        {/*  </form>*/}
        {/*</div>*/}
      </div>
      <div className="d-flex flex-row flex-wrap">
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
                              <MoreVertIcon onClick={handleOpenSettingsMenu} style={{ cursor: 'pointer' }} />
                          </div>
                        </div>
                        <p className="card-text mb-1">{order.point_to?.address}</p>
                        <p className="card-text mb-1">{order.point_to?.name}</p>
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
                        <MenuItem onClick={async (e) => {
                          e.stopPropagation();
                          await props.services.orderService.changeStatus(order, 'DONE');
                          handleCloseSettingsMenu(e);
                        }}
                        >
                          Выдача груза
                        </MenuItem>
                        <MenuItem onClick={async (e) => {
                          e.stopPropagation();
                          await props.services.orderService.changeStatus(order, 'CANCELLED');
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

export default withRouter(inject(StoresNames.OrderStore, StoresNames.UserStore, 'services')(observer(IssuanceOrderList)));
