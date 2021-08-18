import React, {useEffect, useState} from 'react';
import './AdminPersonalAccount.scss';
import { useTranslation } from "react-i18next";
import CreateUserDialog from "./components/CreateUserDialog/CreateUserDialog";
import {inject, observer} from "mobx-react";
import UserList from "@pages/AdminPersonalAccount/components/UserList/UserList";

const AdminPersonalAccount: React.FC<{services: any}> = (props) => {
  const { t } = useTranslation();

  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <>
      <div className="admin-pa">
        <div className="d-flex ">
          <h4>{t('adminPersonalAccount.users')}</h4>
          <button
            className="btn ml-3 btn-link"
            onClick={() => setShowCreateDialog(true)}
          >
            {t('common.create')}
          </button>
        </div>
        <UserList />
      </div>
      <CreateUserDialog
        closeDialog={() => {
          setShowCreateDialog(false);
        }}
        show={showCreateDialog}
      />
    </>
  );
};
export default inject('services')(observer(AdminPersonalAccount));
