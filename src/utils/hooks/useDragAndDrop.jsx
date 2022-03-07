// import { useState } from 'react';

// export const useDragAndDrop = (id, callback) => {
//   const [isDragging, SetIsDragging] = useState(false);
//   const [isDragOver, setIsDragOver] = useState(false);
//   const handleDragStart = (e) => {
//     SetIsDragging(true);
//     e.dataTransfer.effectAllowd = 'move';
//     e.dataTransfer.setData('text/plain', id);
//     console.log('드레그 시작합니다');
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault(); // 1
//     setIsDragOver(true); // 2
//     console.log('아아아아아 위에있음');
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     SetIsDragging(false);
//     setIsDragOver(false);
//     const movingTarget = e.dataTransfer.getData('text/plain'); // 1
//     console.log('아아아아아 떨어트려');
//     callback(movingTarget, id);
//   };

//   const handleDragEnter = () => {
//     setIsDragOver(true);
//     console.log('아아아아아 들어가요~');
//   };

//   const handleDragLeave = () => {
//     setIsDragOver(false);
//     console.log('아아아아아 떠나요~');
//   };
// };
