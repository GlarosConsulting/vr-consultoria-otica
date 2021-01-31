import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';

import { TextInput, Container, Icon } from './styles';

interface IInputProps extends TextInputProps {
  name: string;
  icon?: string;
}

interface IReferenceInputValue {
  value: string;
}

interface IRefInput {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<IRefInput, IInputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputValueRef = useRef<IReferenceInputValue>({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_ref, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, inputValueRef, registerField]);

  return (
    <Container isErrored={!!error}>
      {icon ? <Icon name={icon} size={20} color="#666360" /> : null}

      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onChangeText={(value: string) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
