import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import './LoginPage.scss';
import { useHistory } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedSelector, loginThunk } from '../../redux/Slices/UserSlice';

export default function LoginPage() {
  let history = useHistory();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isLogged = useSelector(isLoggedSelector);
  // useEffect(() => {
  //   console.log('isLogged:', isLogged);

  //   if (isLogged) {
  //     history.push('/');
  //   }
  // }, [isLogged, history]);

  const handleLogin = () => {
    dispatch(loginThunk(name, password));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <header className="login-page-header">
          <img src={require('../../images/dubioLogo.png')} alt="" />
        </header>
        <Input
          size="large"
          placeholder="User Name"
          className="login-input"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <Input.Password
          className="login-input"
          placeholder="input password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          autoComplete="off"
        />

        <Button onClick={handleLogin} type="primary" block size="large">
          Log in
        </Button>
      </div>
    </div>
  );
}
