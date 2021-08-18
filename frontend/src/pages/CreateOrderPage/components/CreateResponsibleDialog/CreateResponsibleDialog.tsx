import React, {useEffect, useState} from 'react';
import {makeStyles, TextField} from "@material-ui/core";
import ModalBox from "@/components/System/ModalBox";
import {useTranslation} from "react-i18next";
import {inject, observer} from "mobx-react";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface ICreateResponsibleDialog {
  closeDialog: () => void;
  show: boolean;
  services?: any;
  orgId: string;
  field: 'senders' | 'recipients';
}

interface IResponsible {
  email: string;
  phone: string;
  FIO: string;
}

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: '14px',
  }
}));

const CreateResponsibleDialog: React.FC<ICreateResponsibleDialog> = ({closeDialog, show, services, orgId, field}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  console.log(orgId);
  const initResponsible: IResponsible = {
    FIO: '',
    phone: '',
    email: ''
  };
  const [responsible, setResponsible] = useState(initResponsible);

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(responsible);
    await services.responsibleService.createResponsible({...responsible, organisations_id: String(orgId)}, field);
    closeDialog();
  };

  const changeResponsible = (field: keyof IResponsible, value: any) => {
    setResponsible({
      ...responsible,
      [field]: value
    });
  };

  useEffect(() => {
    if (!show) {
      setResponsible(initResponsible);
    }
  }, [show]);

  return (
    <div>
      <ModalBox
        title={t('createResponsibleDialog.createResponsible')}
        show={show}
        closeDialog={closeDialog}
      >
        <form
          onSubmit={(e) => create(e)}
        >
          <TextField
            className={`${classes.input}`}
            label={t('createUserDialog.email')}
            variant="outlined"
            size="small"
            type="email"
            value={responsible.email}
            onChange={(e) => changeResponsible('email', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={`${classes.input}`}
            label={t('createUserDialog.phone')}
            variant="outlined"
            size="small"
            value={responsible.phone}
            onChange={(e) => changeResponsible('phone', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={`${classes.input}`}
            label={t('createResponsibleDialog.FIO')}
            variant="outlined"
            size="small"
            value={responsible.FIO}
            onChange={(e) => changeResponsible('FIO', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
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
  )
};

export default inject('services')(observer(CreateResponsibleDialog));
