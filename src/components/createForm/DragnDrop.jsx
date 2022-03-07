import React, { useRef, useState } from 'react';
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
  const [lists, setLists] = useState(socialNetworks);
  const [grab, setGrab] = useState(null);
  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragStart = (e) => {
    setGrab(e.target);
    e.target.classList.add('grabbing');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
  };

  const onDragEnd = (e) => {
    e.target.classList.remove('grabbing');

    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e) => {
    let grabPosition = Number(grab.dataset.position);
    let targetPosition = Number(e.target.dataset.position);

    let list = [...lists];
    list[grabPosition] = list.splice(targetPosition, 1, list[grabPosition])[0];

    setLists(list);
  };
  return (
    <Container>
      <ul className="List">
        {lists.map((sns, index) => (
          <li
            draggable
            key={index}
            data-position={index}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
          >
            {sns.title}
          </li>
        ))}
      </ul>
    </Container>
  );
}
// const FormList = styled.div`
//   width: 400px;
//   height: 40px;
//   border: 1px solid black;
//   & button {
//     width: 400px;
//     height: 40px;
//   }
// `;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

// const buttonList = styled.div`
//   width: 400px;
//   height: 30px;
//   border: 1px solid black;
// `;

export default DragnDrop;
