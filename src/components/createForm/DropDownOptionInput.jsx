import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
export default function DropDownOptionInput() {
  const [options, setOptions] = useState({ text: null, id: uuidv4() });
  const [value, setValue] = useState(null);

  const Parser = class {
    test() {
      throw new Error('must be overrided!');
    }
    convert() {
      throw new Error('must be overrided!');
    }
  };
  const CommaParser = class extends Parser {
    #reg = '/([^,]*),/';
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
    const value = e.target.value;
    const res = reg.convert(value);
    if (!res) setValue(e.target.value);
    else {
      console.log(res);
    }
  };
  return (
    <input
      type="text"
      placeholder="옵션 (각 아이템은 콤마(,)로 구분합니다.)"
      value={value}
      onChange={setOnValue}
    />
  );
}
