import React, { useState } from "react";
import { Button, Form, Input, Radio, Tooltip } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import MessageError from "./error_msg";

type LayoutType = Parameters<typeof Form>[0]["layout"];

interface FormsAntProps {
  title: string; // Prop to pass the tooltip title
  disabled_val?: boolean;
  onChange: (newValue: string) => void;
  defaultValue: string;
  hasError: boolean;
  errorMsg: string;
}

const FormsAnt: React.FC<FormsAntProps> = ({
  title,
  disabled_val,
  onChange,
  defaultValue,
  hasError,
  errorMsg
}) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("vertical");
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
      : null;

  const buttonItemLayout =
    formLayout === "horizontal"
      ? { wrapperCol: { span: 14, offset: 4 } }
      : null;

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
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
          disabled={disabled_val}
          style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
        >
          <Form.Item>
            <Input
              suffix={
                <Tooltip title={title}>
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              status={hasError ? 'error':''}
              prefix={hasError ? <WarningOutlined /> : null}
              onChange={(e) => onChange(e.target.value)}
              defaultValue={defaultValue}
              style={{ width: "300px" }}
            />
          </Form.Item>
        </Form>
      </div>
      {hasError ? <MessageError error_msg={errorMsg} /> : null}
    </div>
  );
};

export default FormsAnt;
