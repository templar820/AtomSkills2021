import React, { useEffect, useState } from 'react';
import './CreateOrderPage.scss';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {
  FormControl, InputLabel, MenuItem, Select
} from '@material-ui/core';
import CreateOrganizationDialog
  from '@pages/CreateOrderPage/components/CreateOrganizationDialog/CreateOrganizationDialog';
import CreateGoodsDialog from '@pages/CreateOrderPage/components/CreateGoodsDialog/CreateGoodsDialog';
import GoodsList from '@pages/CreateOrderPage/components/GoodsList/GoodsList';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import CreateResponsibleDialog from './components/CreateResponsibleDialog/CreateResponsibleDialog';
import { StoresNames } from '@/stores/StoresNames';
import Calendar from '@/components/System/Calendar/Calendar';
import ModalBox from '@/components/System/ModalBox';
import Notification from '../../components/System/Notification';

interface IOrder {
  sender_id: string;
  senderResponsibleId: string;
  recipient_id: string;
  recipientResponsibleId: string;
  goods: any[];
  point_to_id: string;
  date: string;
  price: string;
}

const CreateOrderPage: React.FC<{ services: any; }> = (props) => {
  const { t } = useTranslation();
  const [openSenderOrganization, setOpenSenderOrganization] = useState(false);
  const [openRecipientOrganization, setOpenRecipientOrganization] = useState(false);
  const [openPoints, setOpenPoints] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  // const [openResponsibleDialog, setOpenResponsibleDialog] = useState({
  //   open: false,
  //   field: '',
  //   orgId: '',
  // });
  const [openOrganizationDialog, setOpenOrganizationDialog] = useState(false);
  const [openGoodsDialog, setOpenGoodsDialog] = useState(false);

  const [order, setOrder] = useState<IOrder>(null);
  const history = useHistory();

  useEffect(async () => {
    await props.services.organizationService.getOrganizations();
    await props.services.pointService.getPoints();
    // await props.services.organizationService
    const url = new URL(window.location.href);
    const arr = url.pathname.split('/');
    const id = +arr[arr.length - 1];
    if (!isNaN(id)) {
      const newOrder = await props.services.orderService.getById(id);
      await props.services.responsibleService.getResponsiblesByOrgId(newOrder.sender_id, 'senders');
      await props.services.responsibleService.getResponsiblesByOrgId(newOrder.recipient_id, 'recipients');
      if (newOrder) setOrder(newOrder);
    } else {
      setOrder({
        sender_id: '',
        senderResponsibleId: '',
        recipient_id: '',
        recipientResponsibleId: '',
        goods: [],
        point_to_id: '',
        date: moment().format('YYYY-MM-DD'),
        price: '',
      });
    }
  }, []);

  if (!order) return null;

  const changeOrder = (value: any, field: keyof IOrder) => {
    setOrder({
      ...order,
      [field]: value,
    });
  };

  const { organizations } = props[StoresNames.OrganizationStore];
  const senderResponsibles = props[StoresNames.ResponsibleStore].senders;
  const recipientResponsibles = props[StoresNames.ResponsibleStore].recipients;
  const { points } = props[StoresNames.PointStore];

  const changeSenderOrganization = (obj: any) => {
    setOrder({
      ...order,
      sender_id: obj.id,
      senderResponsibleId: '',
    });
    props.services.responsibleService.getResponsiblesByOrgId(obj.id, 'senders');
  };

  const changeRecipientOrganization = (obj: any) => {
    setOrder({
      ...order,
      recipient_id: obj.id,
      recipientResponsibleId: '',
    });
    props.services.responsibleService.getResponsiblesByOrgId(obj.id, 'recipients');
  };

  const createOrder = async () => {
    await props.services.orderService.createOrder({
      ...order,
      point_from_id: props[StoresNames.UserStore].user.point_id,
    });
    setOpenNotification(true);
  };

  const current = points?.find(org => {
    return org.id === order.point_to_id;
  });

  console.log(senderResponsibles, recipientResponsibles);
  return (
    <div className="create-order-page mb-3">
      <h4 className="mb-3">{order.id ? `Заявка № ${order.id}` : t('createOrderPage.createOrder')}</h4>
      {/* <h5>{t('createOrderPage.sender')}</h5> */}
      <div className="organization create-order-page__item">
        <div className="create-order-page__autocomplete-wrapper">
          <Autocomplete
            value={current}
            getOptionSelected={(option, value) => option?.id === value?.id}
            getOptionLabel={(option) => String(option.name)}
            defaultValue={points?.find(org => org.id === order.point_to_id)}
            options={points || []}
            renderOption={(option) => option.name}
            onChange={(e, obj) => obj && changeOrder(obj.id, 'point_to_id')}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('Адрес точки получения')}
                key="Asynchronous"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: params.InputProps.endAdornment
                }}
              />
            )}
          />
        </div>
      </div>
      <div style={{ marginBottom: '30px' }}>
        <TextField
          // className={`${classes.input} product-substanceId`}
          label={t('createOrderPage.price')}
          size="small"
          type="number"
          value={order.price}
          onChange={(e) => changeOrder(e.target.value, 'price')}
        />
      </div>
      <div style={{ marginBottom: '40px' }}>
        <Calendar
          label="Дата создания заявки"
          value={order.date}
          onChange={(date) => {
            changeOrder(date, 'date');
          }}
        />
      </div>
      <h5>{t('createOrderPage.sender')}</h5>
      <div className="organization create-order-page__item">
        <div className="create-order-page__autocomplete-wrapper">
          <Autocomplete
            open={openSenderOrganization}
            onOpen={() => setOpenSenderOrganization(true)}
            onClose={() => setOpenSenderOrganization(false)}
            value={organizations?.find(org => org.id === order.sender_id)}
            getOptionSelected={(option, value) => option === value}
            getOptionLabel={(option) => String(option.name)}
            options={organizations || []}
            renderOption={(option) => option.name}
            onChange={(e, obj) => obj && changeSenderOrganization(obj)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('createOrderPage.organization')}
                key="Asynchronous"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: params.InputProps.endAdornment
                }}
              />
            )}
          />
        </div>
        <button
          className="btn btn-link"
          onClick={() => setOpenOrganizationDialog(true)}
        >
          {t('createOrderPage.createOrganization')}
        </button>
      </div>
      {
        order.sender_id
        && (
          <div className="create-order-page__item">
            <div className="create-order-page__autocomplete-wrapper">
              <FormControl style={{ width: '100%' }}>
                <InputLabel id="demo-controlled-open-select-label">{t('createOrderPage.responsible')}</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={senderResponsibles?.find(res => res.id === order.senderResponsibleId)}
                  onChange={(e) => changeOrder(e.target.value, 'senderResponsibleId')}
                >
                  {
                    senderResponsibles?.map(r => <MenuItem value={r.id}>{r.FIO}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </div>
            {/* <button */}
            {/*  className="btn btn-link" */}
            {/*  onClick={() => setOpenResponsibleDialog({ */}
            {/*    open: true, */}
            {/*    field: 'sender', */}
            {/*    orgId: order.sender_id */}
            {/*  })} */}
            {/* >{t('createOrderPage.createResponsible')}</button> */}
          </div>
        )
      }
      <h5>{t('createOrderPage.recipient')}</h5>
      <div className="organization create-order-page__item">
        <div className="create-order-page__autocomplete-wrapper">
          <Autocomplete
            open={openRecipientOrganization}
            onOpen={() => setOpenRecipientOrganization(true)}
            onClose={() => setOpenRecipientOrganization(false)}
            value={organizations?.find(org => org.id === order.recipient_id)}
            getOptionSelected={(option, value) => option === value}
            getOptionLabel={(option) => String(option.name)}
            options={organizations || []}
            renderOption={(option) => option.name}
            onChange={(e, obj) => obj && changeRecipientOrganization(obj)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('createOrderPage.organization')}
                key="Asynchronous"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: params.InputProps.endAdornment
                }}
              />
            )}
          />
        </div>
        <button
          className="btn btn-link"
          onClick={() => setOpenOrganizationDialog(true)}
        >
          {t('createOrderPage.createOrganization')}
        </button>
      </div>
      {
        order.recipient_id
        && (
          <div className="create-order-page__item">
            <div className="create-order-page__autocomplete-wrapper">
              <FormControl style={{ width: '100%' }}>
                <InputLabel id="demo-controlled-open-select-label">{t('createOrderPage.responsible')}</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={recipientResponsibles?.find(res => res.id === order.recipientResponsibleId)}
                  onChange={(e) => changeOrder(e.target.value, 'recipientResponsibleId')}
                >
                  {
                    recipientResponsibles?.map(r => <MenuItem value={r.id}>{r.FIO}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </div>
            {/* <button */}
            {/*    className="btn btn-link" */}
            {/*    onClick={() => setOpenResponsibleDialog({ */}
            {/*      open: true, */}
            {/*      field: 'recipient', */}
            {/*      orgId: order.recipient_id */}
            {/*    })} */}
            {/* >{t('createOrderPage.createResponsible')}</button> */}
          </div>
        )
      }
      <div className="d-flex align-items-center mt-5">
        <h5 style={{ margin: 0 }}>{t('createOrderPage.goods')}</h5>
        <button
          className="btn btn-link"
          onClick={() => setOpenGoodsDialog(true)}
        >
          {t('createOrderPage.createGoods')}
        </button>
      </div>
      <GoodsList
        goods={order.goods}
      />
      {!order.id && (
        <div className="d-flex justify-content-end mt-5 pb-4">
          <button
            className="btn btn-primary"
            onClick={createOrder}
          >
            Оформить заявку
          </button>
        </div>
      )}
      {
        order.id && (
          <div className="d-flex justify-content-end mt-5 pb-4">
            <button
              className="btn btn-link"
              onClick={() => window.open(
                `/print-order/${order.id}`,
                "Print version",
                "resizable,scrollbars,status"
              )}
            >Версия для печати</button>
          </div>
        )
      }

      {/* <CreateResponsibleDialog */}
      {/*  show={openResponsibleDialog.open} */}
      {/*  closeDialog={() => setOpenResponsibleDialog({ */}
      {/*    open: false, */}
      {/*    field: '', */}
      {/*    orgId: '', */}
      {/*  })} */}
      {/*  orgId={openResponsibleDialog.orgId} */}
      {/*  field={openResponsibleDialog.field} */}
      {/* /> */}
      <CreateGoodsDialog
        show={openGoodsDialog}
        closeDialog={() => setOpenGoodsDialog(false)}
        addGood={(good) => {
          setOrder({
            ...order,
            goods: [
              good,
              ...order.goods,
            ],
          });
        }}
      />
      <CreateOrganizationDialog
        show={openOrganizationDialog}
        closeDialog={() => setOpenOrganizationDialog(false)}
      />
      <Notification
        title={t('Заявка успешно создана')}
        show={openNotification}
        close={() => {
          setOpenNotification(false);
          history.push('/');
        }}
      />
      {/* <ModalBox */}
      {/*  title={t('Заявка успешно создана')} */}
      {/*  show={openNotification} */}
      {/*  closeDialog={() => setOpenNotification(false)} */}
      {/* > */}
      {/*  <div className="d-flex justify-content-end"> */}
      {/*    <button className="btn btn-secondary" style={{width: '100%'}} onClick={() => setOpenNotification(false)}> */}
      {/*      ОК */}
      {/*    </button> */}
      {/*  </div> */}
      {/* </ModalBox> */}
    </div>
  );
};

export default inject('services', StoresNames.OrganizationStore, StoresNames.ResponsibleStore, StoresNames.PointStore, StoresNames.UserStore)(observer(CreateOrderPage));
