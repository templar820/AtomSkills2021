import TableCell from '@material-ui/core/TableCell';
import { Autocomplete } from '@material-ui/lab';
import {
  Chip, IconButton, TextField,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';

import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/stores/StoresNames';

function RouteLine(props) {
  const [open, setOpen] = useState(null);
  const [selectedOrderInRoute, setSelectedOrderInRoute] = useState([]);
  const { orders } = props[StoresNames.OrderStore];

  return (
    <TableRow key={props.index}>
      <TableCell component="th" scope="row">
        {props.pair[0].name}
      </TableCell>
      <TableCell align="right">{props.pair[0].address}</TableCell>
      <TableCell align="right">
        {props.pair[1].name}
      </TableCell>
      <TableCell align="right">{props.pair[1].address}</TableCell>
      <TableCell align="right">
        {props.model.getDistanceFromPoints(props.pair[0], props.pair[1])}
        {' '}
        км
      </TableCell>
      <TableCell align="right">
        {props.time}
        {' '}
        ч
      </TableCell>
      <TableCell align="right">
        <Autocomplete
          id="asynchronous-demo"
          style={{ width: 300 }}
          value={props.value || []}
          open={open}
          multiple
          onOpen={() => {
            props.services.orderService.getOrdersFull(props.pair[0].id, props.pair[1].id, 'NEW');
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={(event, data) => {
            props.onChange({ applications: data, plainTime: props.time });
          }}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => String(option.id)}
          options={orders || []}
          renderTags={(value, getTagProps) => value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.id}
              {...getTagProps({ index })}
            />
          ))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Привязать заявки"
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
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={() => {
          props.onDelete(props.pair[1]);
        }}
        >
          <Clear />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default inject('services', StoresNames.OrderStore)(observer(RouteLine));
