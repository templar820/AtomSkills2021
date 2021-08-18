import React, {useEffect, useState} from 'react';
import {makeStyles, TextField} from "@material-ui/core";
import ModalBox from "@/components/System/ModalBox";
import {useTranslation} from "react-i18next";
import {inject, observer} from "mobx-react";

interface ICreateOrganizationDialog {
  closeDialog: () => void;
  show: boolean;
  services?: any;
}

interface IOrganization {
  name: string;
  inn: string;
}

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: '14px',
  }
}));

const CreateOrganizationDialog: React.FC<ICreateOrganizationDialog> = ({closeDialog, show, services}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const initOrganization: IOrganization = {
    name: '',
    inn: '',
  };
  const [organization, setOrganization] = useState(initOrganization);

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(organization);
    await services.organizationService.createOrganization(organization);
    closeDialog();
  };

  const changeResponsible = (field: keyof IOrganization, value: any) => {
    setOrganization({
      ...organization,
      [field]: value
    });
  };

  useEffect(() => {
    if (!show) {
      setOrganization(initOrganization);
    }
  }, [show]);

  return (
    <div>
      <ModalBox
        title={t('createOrganizationDialog.createOrganization')}
        show={show}
        closeDialog={closeDialog}
      >
        <form
          onSubmit={(e) => create(e)}
        >
          <TextField
            className={`${classes.input} product-name`}
            label={t('createOrganizationDialog.name')}
            variant="outlined"
            size="small"
            value={organization.name}
            onChange={(e) => changeResponsible('name', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={`${classes.input} product-substanceId`}
            label={t('createOrganizationDialog.inn')}
            variant="outlined"
            size="small"
            value={organization.inn}
            onChange={(e) => changeResponsible('inn', e.target.value)}
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

export default inject('services')(observer(CreateOrganizationDialog));
