import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { Chip, TextField } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/stores/StoresNames';
import ReadySheet from '../ReadySheet/ReadySheet';
import SheetTable from "@pages/RoutePage/components/SheetTable";

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
    background: '#FFF',
  },
});

const NewSheet = (props) => {
  const { sheet } = props;
  const [courier, setCourier] = useState(null);
  const [open, setOpen] = useState(null);
  const { couriersList } = props[StoresNames.UserListStore];

  const classes = useStyles();

  const getLast = () => {
    return sheet.status === 'INTRANSIT' ? true : null;
  };

  return (
    <div className="carrier-pa w-100">
      <div className="d-flex flex-row">
        <Autocomplete
          id="asynchronous-demo"
          style={{ width: 300 }}
          value={courier}
          open={open}
          onOpen={() => {
            props.services.userService.getCouriers();
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={(event, data) => {
            setCourier(data);
          }}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => String(option.name)}
          options={couriersList}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Выбрать курьера"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <div className="d-flex justify-content-end ml-4">
          <button
            className="btn btn-success"
            onClick={() => props.services.routeService.setCourier({route_sheets_id: sheet.id, courier_id: courier.id })}
          >
            Назначить курьера
          </button>
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
      <div className="my-4">
        <SheetTable sheet={sheet} chipDelete />
      </div>
    </div>
  );
};

export default inject('services', StoresNames.UserListStore)(observer(NewSheet));
