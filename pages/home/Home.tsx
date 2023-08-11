import React from 'react';
import { Button } from 'antd';
import * as Styled from './Home.styled';

const Home = () => (
  <div className="App">
    <Button type="primary">Button</Button>
    <Styled.Button type='primary'>Styled Button</Styled.Button>
  </div>
);

export default Home;