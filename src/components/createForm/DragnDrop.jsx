import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function DragnDrop() {
  const socialNetworks = [
    { title: 'Twitter' },
    { title: 'Facebook' },
    { title: 'Line' },
    { title: 'Instagram' },
    { title: 'Telegram' },
    // { title: 'KaKao' },
    // { title: 'LinkedIn' },
  ];
  const [snsList, setSnsList] = useState(socialNetworks);
  const [grab, setGrab] = useState();
  const [pickedIndex, setPickedIndex] = useState();
  // const [firstClicked, setFirstClicked] = useState();
  // const handleOnclick = (e) => {
  //   setFirstClicked(e.pageY);
  //   console.log(firstClicked);
  // };
  const onDragStart = (e) => {
    setGrab(e.target.innerText);
    setPickedIndex(e.target);
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
    let pickedPosition = Number(pickedIndex.dataset.position);
    let dropedPosition = Number(e.target.dataset.position);
    const target = e.target.innerText;
    const endPoint = e.target.offsetTop + e.target.offsetHeight / 2;
    console.log('엔드포인트입니다 ' + endPoint);
    let targetIndex;
    const filteredSns = snsList.filter((sns) => sns.title !== grab);
    snsList.forEach((sns, i) => {
      if (sns.title === target) {
        targetIndex = i;
      }
    });
    console.log('타겟인덱스 ' + targetIndex);
    console.log('마지막마우스위치 ' + e.pageY);

    // 엔드포인트 보다 작을때 endPoint - e.target.offsetHeight / 2 < e.pageY &&
    if (pickedPosition < dropedPosition) {
      if (e.pageY < endPoint) {
        // 자기 영역에서 실행되면 실행 안되게
        if (pickedPosition === dropedPosition) {
          return;
        }
        filteredSns.splice(Number(targetIndex) - 1, 0, { title: grab });
        setSnsList(filteredSns);
        return;
      }
      // 엔드포인트 보다 클때 e.pageY < endPoint + e.target.offsetHeight / 2 &&
      // if (e.pageY < endPoint) {
      //   // 자기 영역에서 실행되면 실행 안되게
      //   if (pickedPosition === dropedPosition) {
      //     return;
      //   }
      // 자기 인덱스보다 하나 작은애 한테 하면 안먹도록
      // if (pickedPosition - 1 === dropedPosition) {
      //   return;
      // }

      filteredSns.splice(Number(targetIndex), 0, { title: grab });
      setSnsList(filteredSns);
      return;
    }

    if (pickedPosition > dropedPosition) {
      if (e.pageY < endPoint) {
        if (pickedPosition === dropedPosition) {
          return;
        }
        filteredSns.splice(Number(targetIndex), 0, { title: grab });
        setSnsList(filteredSns);
        return;
      }
      filteredSns.splice(Number(targetIndex) + 1, 0, { title: grab });
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
            data-position={index}
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
