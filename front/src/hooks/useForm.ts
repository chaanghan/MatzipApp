import {useEffect, useState} from 'react';

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({initialValue, validate}: UseFormProps<T>) {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, string>>({});

  const handleChangeText = (name: keyof T, text: string) => {
    setValue({
      ...value,
      [name]: text,
    });
  };
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name: keyof T) => {
    const values = value[name];
    const onChangeText = (text: string) => handleChangeText(name, text);
    const onBlur = () => handleBlur(name);

    return {values, onChangeText, onBlur};
  };

  useEffect(() => {
    const newError = validate(value);
    setError(newError);
  }, [validate, value]);

  return {value, error, touched, getTextInputProps};
}

export default useForm;
