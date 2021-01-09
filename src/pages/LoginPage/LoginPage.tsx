import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import "./LoginPage.scss";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  errorMassage,
  isLoggedSelector,
  loginThunk,
  registerUserThunk,
  registrationSuccesses,
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
  const [isLogin, setIsLogin] = useState(true)
  const dispatch = useDispatch();
  const isLogged = useSelector(isLoggedSelector);
  const isRegistrationSuccesses = useSelector(registrationSuccesses);
  const loginErrorMassage = useSelector(errorMassage);
  useEffect(() => {

    if (isLogged) {
      history.push("/");
    }
  }, [isLogged, history]);

  useEffect(() => {

    if (isRegistrationSuccesses) {
      setIsLogin(true);
    }
  }, [isRegistrationSuccesses]);

  const onFinish = (values: any) => {
    if(isLogin){
      dispatch(loginThunk(values.username, values.password));
    }else{
      dispatch(registerUserThunk(values.username, values.password, values.email));
    }
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
          {
            !isLogin && (
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: !isLogin, message: "Please input your email!" }]}
                    >
                      <Input.Password />
                    </Form.Item>
            )
          }

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-btn"
              size="large"
            >
              {isLogin? 'Log in': 'Sign in'}
              
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button 
              htmlType="button" 
              type="link"
              size="large"  
              className="login-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {`Go To ${!isLogin? 'Log in': 'Sign in'}`}

            </Button>
        </Form.Item>
        </Form>
  
      </div>
    </div>
  );
}
