import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import "./LoginPage.scss";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  errorMassage,
  isLoggedSelector,
  loginThunk,
} from "../../redux/Slices/UserSlice";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 0 },
};

export default function LoginPage() {
  let history = useHistory();

  const dispatch = useDispatch();
  const isLogged = useSelector(isLoggedSelector);
  const loginErrorMassage = useSelector(errorMassage);
  useEffect(() => {

    if (isLogged) {
      history.push("/");
    }
  }, [isLogged, history]);

  const onFinish = (values: any) => {

    dispatch(loginThunk(values.username, values.password));
  };

  return (

    <div className="login-page">
      <div className="login-container">
        <header className="login-page-header">
          <img src={require("../../images/dubioLogo.png")} alt="" />
        </header>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {loginErrorMassage && (
            <div className="ant-form-item-explain, error-massage">
              <div role="alert">{loginErrorMassage}</div>
            </div>
          )}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-btn"
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <Button size="large">
          <Link to="/"> Enter without a user</Link>
        </Button>
      </div>
    </div>
  );
}
