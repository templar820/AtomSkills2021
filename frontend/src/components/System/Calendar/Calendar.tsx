import React from 'react';
import moment from 'moment';
import ReactCalendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import enUS from 'rc-calendar/lib/locale/en_US';
import ruRU from 'rc-calendar/lib/locale/ru_RU';
import 'rc-calendar/assets/index.css';
import {TextField} from "@material-ui/core";

// import getIcon from '../../static/Icon/Icon';

let placeholder;
let locale;
let format;

switch ("ru-RU") {
  case 'ru-RU':
    import('moment/locale/ru')
      .then(() => {
        placeholder = 'гггг-мм-дд';
        locale = ruRU;
        format = 'YYYY-MM-DD';
      });
    break;
  default: case 'en-US':
    import('moment/locale/en-gb')
      .then(() => {
        placeholder = 'mm/dd/yyyy';
        locale = enUS;
        format = 'MM/DD/YYYY';
      });
    break;
}

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: null
    }
    this.calendarContainerRef = React.createRef();
  }

  getCalendarContainer = () => this.calendarContainerRef.current;

  onChange = value => {
    //   console.log(value);
    //   if (typeof value === 'undefined' || value === null) {
    //   value = '';
    // } else if (this.props.format?.toLowerCase() === 'utc') {
    //   if (Array.isArray(value)) {
    //     value = value.map(el => moment(el).toISOString());
    //   } else {
    //     value = moment(value).toISOString();
    //   }
    // } else if (Array.isArray(value)) {
    //   value = value.filter(el => el).map(el => moment(el).format(this.props.format));
    // } else {
    //     console.log(format);
    //     value = moment(value).format(this.props.format);
    // }
    this.props.onChange(value.format("YYYY-MM-DD"));
  }


  getFormat(value) {
    let res;

    if (this.props.format?.toLowerCase() === 'utc') {
      res = moment.utc(value);
    } else {
      res = moment(value, this.props.format);
    }

    if (res.isValid() !== true) res = null;

    return res;
  }

  render() {
    let date;
    const value = this.props.value;

    if (value) {
      if (Array.isArray(value)) {
        date = value?.map(el => this.getFormat(el)) || [];
      } else {
        date = this.getFormat(value);
      }
    }

    const disabled = this.props.disabled;
    const hasClearBtn = true;

    const min = this.props.min && this.getFormat(this.props.min);
    const max = this.props.max && this.getFormat(this.props.max);

    const children = [
      (
        // eslint-disable-next-line jsx-a11y/interactive-supports-focus
        <button
          onClick={() => {
            if (!disabled) this.setState(prevState => ({ open: !prevState.open }));
          }}
          role="button"
          onKeyDown={() => {}}
        >
          {/*{getIcon('calendar_icon')}*/}
        </button>
      )
    ];

    if (hasClearBtn && !disabled) {
      children.unshift(
        // eslint-disable-next-line jsx-a11y/interactive-supports-focus
        <span onClick={this.reset} role="button" onKeyDown={() => {}}>
          {/*{getIcon('close')}*/}
        </span>
      );
    }
    const calendar = (this.props.mode === 'range')
      ? (
        <RangeCalendar
          disabledDate={current => {
            if (min && current.isBefore(min)) return true;
            if (max && (current.isAfter(max) || current.isSame(max))) return true;
          }}
          showWeekNumber={false}
          showToday={false}
          dateInputPlaceholder={['От', 'До']}
          locale={locale}
          onSelect={this.onChange}
          format={format}
          onChange={this.onChange}
        />
      )
      : (
        <ReactCalendar
          disabledDate={current => {
            if (min && current.isBefore(min)) return true;
            if (max && (current.isAfter(max) || current.isSame(max))) return true;
          }}
          onSelect={this.onChange}
          dateInputPlaceholder={placeholder}
          format={format}
          locale={locale}
          showToday={false}
          showClear={false}
          clearIcon={
            (
              <span className="input-controls">
                <span onClick={this.reset} role="button" onKeyDown={() => {}}>
                  {/*{getIcon('close')}*/}
                </span>
              </span>
            )
          }
        />
      );

    return (
      <DatePicker
        getCalendarContainer={this.getCalendarContainer}
        value={value ? date : this.props.mode === 'range' ? [null, null] : null}
        disabled={disabled}
        open={this.state.open}
        onOpenChange={() => {
          this.setState(prevState => ({ open: !prevState.open }));
        }}
        calendar={calendar}

      >
        {
          () => (
            <div className="wrapper">
              <TextField
                variant="outlined"
                placeholder={placeholder}
                label={this.props.label}
                readOnly
                value={
                  date
                    ?
                    (
                      (Array.isArray(date)) ? date.map(el => el.format(format)).join().replace(',', ' - ') : date.format(format)
                    )
                    :
                    ''
                }
              />
              <div ref={this.calendarContainerRef} />
            </div>
          )
        }
      </DatePicker>
    );
  }
}