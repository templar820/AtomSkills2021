import React, {useState} from 'react';
import {inject, observer} from "mobx-react";
// import MyError from "../../services/MyError";
import {useTranslation} from "react-i18next";
import {TextField, Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: '12px',
  }
}));

interface IAuthorizationCardProps {
  services?: any;
}

const AuthorizationCard = (props: IAuthorizationCardProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {t} = useTranslation();
  const classes = useStyles();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await props.services.authService.login(email, password);
    await props.services.authService.authentication();
  }

  return (
    <>
      <h4 className="text-center mb-4">{t('authorizationCard.authorization')}</h4>
      <form
        onSubmit={(e) => login(e)}
      >
        <TextField
          className={classes.input}
          label={t('authorizationCard.login')}
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputLabelProps={{ required: false }}
        />
        <TextField
          className={classes.input}
          label={t('authorizationCard.password')}
          variant="outlined"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputLabelProps={{ required: false }}
          type="password"
        />
        <button className="btn btn-primary btn-block text-uppercase" type="submit">
          {t('common.login')}
        </button>
      </form>
    </>
  );
};

export default inject('services')(AuthorizationCard);
