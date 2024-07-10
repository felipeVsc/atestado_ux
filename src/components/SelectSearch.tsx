import React from 'react';
import { Select, Tooltip } from 'antd';
import data from '../utils/cbo_encoded.json';

import { KeyboardArrowDownOutlined, WarningOutlined } from '@mui/icons-material';

interface SelectDropdownProps {
  tooltipTitle: string;
  onChange: (newValue: string) => void;
  hasError: boolean;
  errorMsg: string;
  defaultValue?: string;
  type: number;
}


const SelectWithSearch: React.FC<SelectDropdownProps> = ({
  tooltipTitle,
  onChange,
  hasError,
  errorMsg,
  defaultValue,
  type
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(defaultValue);

  return (
    <Tooltip title={tooltipTitle} placement="right">
      <Select
        suffixIcon={hasError ? <WarningOutlined /> : <KeyboardArrowDownOutlined />}
        status={hasError ? 'error' : ''}
        showSearch
        style={{ width: 300 }}
        placeholder="Procure pela ocupação"
        optionFilterProp="children"
        value={selectedValue}
        onChange={(value) => {
          setSelectedValue(value);
          onChange(value);
        }}
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={data}
      />
    </Tooltip>
  );
};

export default SelectWithSearch;
