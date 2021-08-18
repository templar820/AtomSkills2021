import React, {useEffect, useState} from 'react';
import {makeStyles, TextField} from "@material-ui/core";
import ModalBox from "@/components/System/ModalBox";
import {useTranslation} from "react-i18next";
import {inject, observer} from "mobx-react";

interface ICreateOrganizationDialog {
  closeDialog: () => void;
  show: boolean;
  addGoods: (goods) => void;
  services?: any;
}

interface IGoods {
  name: string;
  requirements: string;
  count: number;
  weight: number;
  volume: number;
}

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: '14px',
  }
}));

const CreateGoodsDialog: React.FC<ICreateOrganizationDialog> = ({closeDialog, show, services, addGood}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const initGoods: IGoods = {
    name: '',
    requirements: '',
    count: 0,
    weight: 0,
    volume: 0,
  };
  const [goods, setGoods] = useState(initGoods);

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(goods);
    addGood(goods);
    // await services.organizationService.createOrganization(organization);
    closeDialog();
  };

  const changeGoods = (field: keyof IGoods, value: any) => {
    setGoods({
      ...goods,
      [field]: value
    });
  };

  useEffect(() => {
    if (!show) {
      setGoods(initGoods);
    }
  }, [show]);

  return (
    <div>
      <ModalBox
        title={t('createOrderPage.goodsCreating')}
        show={show}
        closeDialog={closeDialog}
      >
        <form
          onSubmit={(e) => create(e)}
        >
          <TextField
            className={`${classes.input} product-name`}
            label={t('createOrderPage.goodsName')}
            variant="outlined"
            size="small"
            value={goods.name}
            onChange={(e) => changeGoods('name', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={`${classes.input} product-substanceId`}
            label={t('createOrderPage.requirements')}
            variant="outlined"
            size="small"
            value={goods.requirements}
            onChange={(e) => changeGoods('requirements', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={`${classes.input} product-substanceId`}
            label={t('createOrderPage.count')}
            variant="outlined"
            size="small"
            value={goods.count}
            onChange={(e) => changeGoods('count', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={`${classes.input} product-substanceId`}
            label={t('createOrderPage.weight')}
            variant="outlined"
            size="small"
            value={goods.weight}
            onChange={(e) => changeGoods('weight', e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={`${classes.input} product-substanceId`}
            label={t('createOrderPage.volume')}
            variant="outlined"
            size="small"
            value={goods.volume}
            onChange={(e) => changeGoods('volume', e.target.value)}
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

export default inject('services')(observer(CreateGoodsDialog));