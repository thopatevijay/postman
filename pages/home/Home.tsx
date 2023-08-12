import React from 'react';
import * as Styled from './Home.styled';
import type { TabsProps } from 'antd';
import GenerationForm from '../../modules/generationForm';


const Home = () => {

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Generate a letter`,
      children: <GenerationForm />,
    },
    {
      key: '2',
      label: `See sent Letter`,
      children: `Content of Tab Pane 2`,
    },
  ];
  
  return (
    <Styled.MainContainer>
      <Styled.Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Styled.MainContainer>
  )
}

export default Home;