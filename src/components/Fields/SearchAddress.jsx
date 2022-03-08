import React, { useState } from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import DetailAddress from './DetailAddress';

const SearchAddress = ({ props, setIsOpen, id }) => {
  const [userSelectAddress, setUserSelectAddress] = useState();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setUserSelectAddress(fullAddress);
  };

  const postCodeStyle = {
    width: '100%',
    minWidth: '420px',
    height: '470px',
    overflow: 'scroll',
    borderRadius: '0 0 12px 12px',
  };

  const isClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <SearchAddressBox>
        <Container
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Title>
            <Text>배송 주소 검색</Text>
            <Icon onClick={isClose}>&times;</Icon>
          </Title>
          {userSelectAddress ? (
            <DetailAddress
              userSelectAddress={userSelectAddress}
              setIsOpen={setIsOpen}
              id={id}
            />
          ) : (
            <DaumPostcode
              className="post_code"
              style={postCodeStyle}
              onComplete={handleComplete}
              {...props}
            />
          )}
        </Container>
      </SearchAddressBox>
    </>
  );
};

const SearchAddressBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  animation: boxFade 0.35s ease;
  /* 여기 */
  z-index: 99;
  @keyframes boxFade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Container = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  animation: containerFade 0.35s ease;
  @keyframes containerFade {
    0% {
      top: 42.5%;
    }
    100% {
      top: 50%;
    }
  }
  .post_code {
    @media (max-width: 400px) {
      width: 100% !important;
      height: 92vh !important;
      padding: 0 10px;
    }
  }
`;

const Title = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00b9ff;
  border-radius: 12px 12px 0 0;
  @media (max-width: 400px) {
    height: 8vh;
    padding: 0 20px;
  }
`;

const Text = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  @media (max-width: 400px) {
    top: 7px;
    right: 15px;
  }
`;

export default SearchAddress;
