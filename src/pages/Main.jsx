import React from 'react';
import styled from 'styled-components';
import RecentSurvey from '../components/RecentSurvey/RecentSurvey';
import AddressInput from '../components/Field/TestAddressInput';

export default function Main() {
  return (
    <>
      <MainBox>
        <RecentSurvey />
        <AddressInput />
      </MainBox>
    </>
  );
}

const MainBox = styled.div`
  width: 100%;
  max-width: 500px;
  height: auto;
`;
