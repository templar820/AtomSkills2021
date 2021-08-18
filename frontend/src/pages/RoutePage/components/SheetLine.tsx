import TableCell from '@material-ui/core/TableCell';
import { Autocomplete } from '@material-ui/lab';
import { Chip, TextField } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles({
  chip: {
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
  },
});

function SheetLine(props) {
  const classes = useStyles();

  const getTime = (time) => {
    if (!time) return null;
    const mom = moment(time, 'YYYY-MM-DD hh:mm');
    const date = mom.format('YYYY-MM-DD hh:mm');
    return date;
  };

  return (
    <>
      <TableCell component="th" scope="row">
        {props.route.status}
      </TableCell>
      <TableCell>{props.route.relation_point_from_id.address}</TableCell>
      <TableCell>{props.route.relation_point_from_id.name}</TableCell>
      <TableCell>{props.route.relation_point_to_id.name}</TableCell>
      <TableCell>
        {getTime(props.route.plan_date_from)}
        {' '}
        -
        {' '}
        {getTime(props.route.plan_date_to)}
        {' '}
      </TableCell>
      <TableCell>
        {getTime(props.route.fact_date_from)}
        {' '}
        -
        {' '}
        {getTime(props.route.fact_date_to)}
      </TableCell>
      <TableCell>
        <Autocomplete
          multiple
          style={{ width: 300 }}
          value={props.route.applications}
          getOptionLabel={(option) => String(option.id)}
          options={props.route.applications}
          renderTags={(value, getTagProps) => value.map((option, index) => (
            (props.chipDelete ? (
              <Chip
                className={classes.chip}
                onClick={() => {
                  props.history.push(`/application/${option.id}`);
                }}
                {...getTagProps({ index })}
                variant="outlined"
                label={option.id}
              />
            ) : (
              <Chip
                className={classes.chip}
                onClick={() => {
                  props.history.push(`/order/${option.id}`);
                }}
                variant="outlined"
                label={option.id}
              />
            )
            )

          ))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Заявки"
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
    </>

  );
}

export default withRouter(SheetLine);
