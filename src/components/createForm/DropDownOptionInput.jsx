import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
export default function DropDownOptionInput() {
  const [options, setOptions] = useState([{ text: null, id: uuidv4() }]);
  const [value, setValue] = useState('');

  const Parser = class {
    test() {
      throw new Error('must be overrided!');
    }
    convert() {
      throw new Error('must be overrided!');
    }
  };
  const CommaParser = class extends Parser {
    #reg = /([^,]*),/;
    test(value) {
      return this.#reg.test(value);
    }
    convert(value) {
      return this.#reg.exec(value);
    }
  };
  const reg = {
    parsers: [new CommaParser()],
    convert(value) {
      let result;
      if (
        this.parsers.some((f) => {
          if (f.test(value)) {
            result = f.convert(value);
            return true;
          } else {
            return false;
          }
        })
      )
        return result;
    },
  };
  const setOnValue = (e) => {
    const value = e.target.value.trim();
    const res = reg.convert(value);
    if (!res) setValue(e.target.value);
    else {
      const mathcedStr = res[1];
      setOptions((prevOption) => [
        ...prevOption,
        { text: mathcedStr, id: uuidv4() },
      ]);
      setValue('');
    }
  };
  const deleteBlock = (id) => {
    setOptions(options.filter((opt) => opt.id !== id));
  };
  return (
    <Container>
      {options.map(({ text, id }) => {
        return (
          <>
            {text && (
              <Block key={id}>
                <Text>{text}</Text>
                <CloseBtn onClick={() => deleteBlock(id)}>&times;</CloseBtn>
              </Block>
            )}
          </>
        );
      })}
      <Input
        type="text"
        placeholder=", 로 구분"
        value={value}
        onChange={setOnValue}
      />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: 36px;
  padding: 0 10px;
  border-top: 1px solid #f2f2f2;
  overflow-x: auto;
  margin: 0 -10px;
`;
const Block = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 30px;
  border: 3px solid #f8be6c;
  margin: 3px;
  border-radius: 5px;
`;
const Text = styled.span`
  color: #f8be6c;
  font-weight: bold;
  padding: 15px;
`;
const CloseBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8e590e;
  position: absolute;
  right: 1px;
  top: 1px;
  font-weight: bold;
  cursor: pointer;
`;
const Input = styled.input`
  height: 100%;
  font-size: 15px;
  font-weight: 500;
  line-height: 15px;
  border-radius: 5px;
`;
