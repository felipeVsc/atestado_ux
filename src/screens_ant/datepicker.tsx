import React from 'react';
import { DatePicker, Space } from 'antd';
import { DatePickerProps } from 'antd/es/date-picker';
import locale from 'antd/es/date-picker/locale/pt_BR';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs'

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return  current > dayjs().endOf('day');
};


const DatePickerComponent: React.FC<DatePickerProps> = ({ onChange, style, defaultValue, defaultPickerValue }) => (
  <Space direction="vertical">
    <DatePicker  locale={locale} style={style} disabledDate={disabledDate} onChange={onChange} showToday={true} defaultValue={defaultValue} defaultPickerValue={defaultPickerValue}/>
  </Space>
);

export default DatePickerComponent;
