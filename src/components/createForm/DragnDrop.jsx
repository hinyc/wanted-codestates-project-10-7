import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function DragnDrop() {
  const socialNetworks = [
    { title: 'Twitter' },
    { title: 'Facebook' },
    { title: 'Line' },
    { title: 'Instagram' },
    { title: 'Telegram' },
    { title: 'KaKao' },
    { title: 'LinkedIn' },
  ];
  const [snsList, setSnsList] = useState(socialNetworks);
  const [grab, setGrab] = useState();
  const onDragStart = (e) => {
    setGrab(e.target.innerText);
  };
  const onDragOver = (e, title) => {
    e.preventDefault();
    if (title === grab) return;
    // console.log(e.target);
  };
  const onDragEnd = (e) => {
    // e.preventDefault();
    // console.log('pageY', e.pageY);
  };
  const onDrop = (e) => {
    e.preventDefault();
    const target = e.target.innerText;
    const endPoint = e.target.offsetTop + e.target.offsetHeight / 2;
    let targetIndex;
    const filteredSns = snsList.filter((sns) => sns.title !== grab);
    snsList.forEach((sns, i) => {
      if (sns.title === target) {
        targetIndex = i;
      }
    });
    if (e.pageY < endPoint) {
      filteredSns.splice(targetIndex, 0, { title: grab });
      setSnsList(filteredSns);
      return;
    }
    if (targetIndex !== snsList.length - 2) {
      filteredSns.splice(targetIndex + 1, 0, { title: grab });
      setSnsList(filteredSns);
      return;
    }
  };

  return (
    <Container>
      <ul className="List">
        {snsList.map((sns, index) => (
          <List
            draggable
            key={index}
            onDragOver={(e) => onDragOver(e, sns.title)}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
          >
            {sns.title}
          </List>
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  ul {
    display: flex;
    flex-direction: column;
    transition: all 0.2s ease-in-out;
  }
`;

const List = styled.li`
  width: 100px;
  height: 50px;
  border: 1px solid red;
  cursor: grab;
`;

export default DragnDrop;
