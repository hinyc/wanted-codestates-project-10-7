import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ProgressBar from '../common/ProgressBar';
import { render } from '@testing-library/react';

export default function AttachmentFile({ data }) {
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);
  const [previewImg, setPreviewImg] = useState(null);
  const [newUrl, setNewUrl] = useState('');
  const setOnChange = async (e) => {
    const file = e.target.files[0];
    const newurl = URL.createObjectURL(file);
    setNewUrl(newurl);
    console.log('??', newurl);
    setFile(file);
    const img = await (() => {
      return new Promise((res, rej) => {
        try {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.addEventListener('load', (e) => {
            res({ imgUrl: e.target.result, fileName: file.name });
          });

          fileReader.addEventListener('progress', (event) => {
            console.log(event);
            if (event.loaded && event.total) {
              const percent = (event.loaded / event.total) * 100;
              setPercent(Math.round(percent));
            }
          });
        } catch (err) {
          rej(err);
        }
      });
    })();
    setPreviewImg(img);
  };
  const fileName = previewImg ? '눌러서 파일 변경' : '눌러서 파일 등록';

  /* imgUrl 받는 곳 */
  console.log(previewImg);
  return (
    <>
      <form>
        <label>{data.required ? data.label : `${data.label}(선택)`}</label>
        <FileDropper onChange={setOnChange}>
          <FileInput />
          <P previewImg={previewImg}>{fileName}</P>
          {previewImg && (
            <>
              <GrayBackGround />
              <Image src={newUrl} alt={previewImg.fileName} />
            </>
          )}
        </FileDropper>
        <ProgressBar percent={percent} />
      </form>
    </>
  );
}
const FileDropper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 200px;
  border: 1px solid #6c6c6c;
  border-radius: 5px;
  transition: all 0.5s ease;
  &:hover {
    background-color: rgb(188, 188, 188);
    color: white;
    font-weight: bold;
    transition: all 0.5s ease;
  }
`;
const FileInput = styled.input.attrs({ type: 'file', accept: 'image/*' })`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
`;
const P = styled.p`
  font-size: 20px;
  z-index: 10;
  pointer-events: none;
`;
const GrayBackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 8;
  background-color: #56565690;
`;
const Image = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
