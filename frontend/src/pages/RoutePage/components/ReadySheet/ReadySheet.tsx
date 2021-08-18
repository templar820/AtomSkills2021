import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import SheetTable from '@pages/RoutePage/components/SheetTable';

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
    background: '#FFF',
  },
});

const ReadySheet = ({ sheet, services }) => {
  const classes = useStyles();

  const getLast = () => {
    return sheet.status === 'INTRANSIT' ? true : null;
  };

  return (
    <div className="my-4">
      <SheetTable sheet={sheet} />
      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-link"
          onClick={() => window.open(
            `/print-sheet/${sheet.id}`,
            "Print version",
            "resizable,scrollbars,status"
          )}
        >Версия для печати</button>
      </div>
    </div>
  );
};

export default withRouter(inject('services')(observer(ReadySheet)));
