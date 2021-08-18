import React, {useEffect, useState} from 'react';
import {makeStyles, TextField, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import ModalBox from "@/components/System/ModalBox";
import {useTranslation} from "react-i18next";
import ProductModel from "@/model/ProductModel";
import {inject, observer} from "mobx-react";
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: '14px',
  }
}));

interface ICreateUserDialog {
  closeDialog: () => void;
  show: boolean;
  services?: any;
}
interface IUser {
  email: string;
  password: string;
  phone: string;
  name: string;
  first_name: string;
  patronymic: string;
  role: 'MANAGER' | 'ADMIN' | 'CARRIER'
  pointId?: number;
}

const CreateUserDialog: React.FC<ICreateUserDialog> = ({closeDialog, show, services}) => {
  const classes = useStyles();
  const initUser: IUser = {
    email: '',
    password: '',
    phone: '',
    name: '',
    first_name: '',
    patronymic: '',
    role: 'MANAGER',
    pointId: undefined
  };

  const [user, setUser] = useState(initUser);
  const { t } = useTranslation();

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await services.userService.createUser(user);
    closeDialog();
  };

  useEffect(() => {
    if (!show) {
      setUser(initUser);
    }
  }, [show]);

  const changeUser = (field: keyof IUser, value: any) => {
    setUser({
      ...user,
      [field]: value
    });
  };

  return (
    <div>
      <ModalBox
        title={t('createUserDialog.createUser')}
        show={show}
        closeDialog={closeDialog}
      >
        <form
          onSubmit={(e) => create(e)}
        >
          <TextField
            className={`${classes.input} product-name`}
            label={t('createUserDialog.email')}
            variant="outlined"
            size="small"
            type="email"
            value={user.email}
            onChange={(e) => changeUser('email', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={`${classes.input} product-substanceId`}
            label={t('createUserDialog.password')}
            variant="outlined"
            size="small"
            value={user.password}
            onChange={(e) => changeUser('password', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={`${classes.input} product-substanceId`}
            label={t('createUserDialog.phone')}
            variant="outlined"
            size="small"
            value={user.phone}
            onChange={(e) => changeUser('phone', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={`${classes.input} product-substanceId`}
            label={t('createUserDialog.first_name')}
            variant="outlined"
            size="small"
            value={user.first_name}
            onChange={(e) => changeUser('first_name', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={`${classes.input} product-substanceId`}
            label={t('createUserDialog.name')}
            variant="outlined"
            size="small"
            value={user.name}
            onChange={(e) => changeUser('name', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={`${classes.input} product-substanceId`}
            label={t('createUserDialog.patronymic')}
            variant="outlined"
            size="small"
            value={user.patronymic}
            onChange={(e) => changeUser('patronymic', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <FormControl className={classes.input} variant="outlined">
            <InputLabel id="demo-controlled-open-select-label">{t('createUserDialog.role')}</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={user.role}
              onChange={(e) => changeUser('role', e.target.value)}
            >
              <MenuItem value={'ADMIN'}>Администратор</MenuItem>
              <MenuItem value={'MANAGER'}>Менеджер</MenuItem>
              <MenuItem value={'CARRIER'}>Курьер</MenuItem>
            </Select>
          </FormControl>
          {
            user.role === 'MANAGER'
            && <TextField
              className={`${classes.input} product-substanceId`}
              label={t('createUserDialog.pointId')}
              variant="outlined"
              size="small"
              value={user.pointId}
              onChange={(e) => changeUser('pointId', e.target.value)}
              required
              InputLabelProps={{ required: false }}
            />
          }
          {/*<Autocomplete*/}
          {/*  className={classes.auth}*/}
          {/*  open={this.state.openUsers}*/}
          {/*  onOpen={() => {*/}
          {/*    this.setState({openUsers: true});*/}
          {/*  }}*/}
          {/*  onClose={() => {*/}
          {/*    this.setState({openUsers: false})*/}
          {/*  }}*/}
          {/*  value={user}*/}
          {/*  getOptionSelected={(option, value) => option === value}*/}
          {/*  getOptionLabel={(option) => String(option.id)}*/}
          {/*  options={this.userStore.users}*/}
          {/*  renderOption={(option) => (*/}
          {/*    <React.Fragment>*/}
          {/*      ID: {option.id}*/}
          {/*    </React.Fragment>*/}
          {/*  )*/}
          {/*  }*/}
          {/*  onChange={(e, obj) => {*/}
          {/*    this.userStore.setUser(obj)*/}
          {/*  }}*/}
          {/*  renderInput={(params) => (*/}
          {/*    <TextField*/}
          {/*      {...params}*/}
          {/*      label={t('createUserDialog.pointId')}*/}
          {/*      key="Asynchronous"*/}
          {/*      InputProps={{*/}
          {/*        ...params.InputProps,*/}
          {/*        endAdornment: (*/}
          {/*          <React.Fragment>*/}
          {/*            {params.InputProps.endAdornment}*/}
          {/*          </React.Fragment>*/}
          {/*        ),*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*/>*/}
          <div className="d-flex justify-content-end">
            <button className="btn btn-info mr-4" onClick={(e) => {
              e.preventDefault();
              closeDialog();
            }}>
              {t('common.cancel')}
            </button>
            <button className="btn btn-primary" type="submit">
              {t('common.create')}
            </button>
          </div>
        </form>
      </ModalBox>
    </div>
  );
};

export default inject('services')(observer(CreateUserDialog));
