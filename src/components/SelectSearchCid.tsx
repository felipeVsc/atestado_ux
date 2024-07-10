import React, { useState, useEffect } from 'react';
import { Select, Tooltip } from 'antd';
import data from '../utils/cid_encoded.json';
import { KeyboardArrowDownOutlined, WarningOutlined } from '@mui/icons-material';

interface SelectDropdownProps {
  tooltipTitle: string;
  onChange: (newValue: string) => void;
  hasError: boolean;
  errorMsg: string;
  defaultValue?: string;
}

const SelectWithSearchCid: React.FC<SelectDropdownProps> = ({
  tooltipTitle,
  onChange,
  hasError,
  errorMsg,
  defaultValue
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <Tooltip title={tooltipTitle} placement="right">
      <Select
        value={selectedValue}
        suffixIcon={hasError ? <WarningOutlined /> : <KeyboardArrowDownOutlined />}
        status={hasError ? 'error' : ''}
        showSearch
        style={{ width: 300 }}
        placeholder="Procure pela causa"
        optionFilterProp="children"
        onChange={(value) => {
          setSelectedValue(value);
          onChange(value); // Pass the selected value to the parent component
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

export default SelectWithSearchCid;
