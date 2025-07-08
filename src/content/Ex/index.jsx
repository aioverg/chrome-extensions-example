import React, { useState, useImperativeHandle } from "react";
import { Button, Input, Modal } from "antd";
import { apiRequest } from "@/api";
import "./index.scss";

const Component = (props, ref) => {
  const [value, setValue] = useState(null);

  const change = (e) => {
    setValue(e.target.value);
  };

  const [open, setOpen] = useState(false);

  // 提交
  const submit = async () => {
    const res = await apiRequest({
      data: {
        text,
      },
    });

    console.log("返回信息", res);
  };

  // 組件公開屬性
  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  return (
    <Modal
      className="c-ex"
      open={open}
      title={"表单"}
      footer={null}
      maskClosable={false}
      onCancel={() => setOpen(false)}
      width={600}
    >
      <div>
        <div className="c-ex-input">
          <Input placeholder="请输入" value={value} onChange={change} />
        </div>
        <div>
          <Button type="primary" block onClick={submit}>
            确认
          </Button>
        </div>
      </div>
    </Modal>
  );
};

Component.displayName = "EX";
export default React.memo(React.forwardRef(Component));
