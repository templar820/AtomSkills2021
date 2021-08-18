import React, {useEffect, useState} from 'react';
import './RoutePage.scss';
import {useHistory, useParams, withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {StoresNames} from "@/stores/StoresNames";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import RouteLine from "@/components/common/RouteLine";
import Table from "@material-ui/core/Table";
import {makeStyles} from "@material-ui/core/styles";
import NewSheet from "@pages/RoutePage/components/NewSheet/NewSheet";
import ReadySheet from "@pages/RoutePage/components/ReadySheet/ReadySheet";

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
    background: '#FFF',
  },
});

const RoutePage:React.FC<{services: any;}> = (props) => {
  let { id } = useParams();
  const history = useHistory();
  const [sheet, setSheet] = useState(null);

  const getSheet = async () => {
    const newSheet = await props.services.routeService.getRoute(id);
    console.log(newSheet);
    if (!newSheet) history.push('/404');
    setSheet(newSheet);
  };

  useEffect(() => {
    getSheet();
  }, []);


  if (!sheet) return null;
  return (
    <div>
      <div className="mb-3">
        <h4>Маршрутный лист № {sheet.id}</h4>
      </div>
      {
        (sheet.status === 'NEW' || sheet.status === 'READY')
        && <NewSheet sheet={sheet}/>
      }
      {
        (sheet.status === 'DONE')
        && <ReadySheet sheet={sheet}/>
      }
      {
        sheet.status === 'INTRANSIT'
        && <ReadySheet sheet={sheet} setSheet={setSheet}/>
      }
    </div>
  );
};

export default withRouter(inject('services')(observer(RoutePage)));