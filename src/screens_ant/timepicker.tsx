import React, { useState } from 'react';
import { Space, TimePicker } from 'antd';
import { TimePickerProps } from 'antd/es';
import locale from 'antd/es/date-picker/locale/pt_BR';
import dayjs from 'dayjs';

// interface TimePickerComponentProps {
//   onChange: (novaHora: dayjs.Dayjs | null) => void;
//   defaultValue: dayjs.Dayjs | undefined;
//   defaultPickerValue: dayjs.Dayjs | undefined;
// }

const TimePickerComponent: React.FC<TimePickerProps> = ({ onChange, defaultValue, defaultPickerValue }) => {

  return (
    <Space>
      <TimePicker locale={locale} onChange={onChange} style={{ width: '200px' }} format="HH:mm" defaultValue={defaultValue} defaultPickerValue={defaultPickerValue} />
    </Space>
  );
};

export default TimePickerComponent;
