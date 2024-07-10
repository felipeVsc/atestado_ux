import React from "react";
import { Button, Form, Input, Select, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { WarningOutlined, KeyboardArrowDownOutlined } from "@mui/icons-material";
import MessageError from "./error_msg";

const { Option } = Select;

interface SelectDropdownProps {
  options: string[]; 
  values: string[]; 
  tooltipTitle: string;
  onChange: (newValue: string) => void;
  hasError: boolean;
  errorMsg: string;
  defaultValue?: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  values,
  tooltipTitle,
  onChange,
  hasError,
  errorMsg,
  defaultValue
}) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="gender">
            <Tooltip title={tooltipTitle} placement="right">
              <Select
                style={{ width: "300px" }}
                suffixIcon={hasError ? <WarningOutlined /> : <KeyboardArrowDownOutlined />}
                status={hasError ? 'error' : ''}
                onChange={(value) => {
                  onChange(value);
                }}
                defaultValue={defaultValue || undefined}
              >
                {options.map((option, index) => (
                  <Option key={values[index]} value={values[index]}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Tooltip>
          </Form.Item>
        </Form>
      </div>
      {hasError ? <MessageError error_msg={errorMsg} /> : null}
    </div>
  );
};

export default SelectDropdown;
