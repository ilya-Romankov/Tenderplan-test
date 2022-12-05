import { useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { addChips, deleteLast } from '../store/chips-process/chips-process'
import { KEY_CODE, SPECIAL_SYMBOL } from '../constant'
import { getUnuqueId } from '../helpers/generate-id'
import { validate } from '../helpers/validate'

type InputProps = {
  handleChangeError: (stateError: boolean) => void,
  addMoreChips:<T> (chips:string, cb?:() => T) => void,
}



function Input({handleChangeError, addMoreChips}: InputProps): JSX.Element {
  const [value, setValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const doEmptyValue = ():void => setValue('');

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }

  const addOneChip = () => {
    handleChangeError(false);
    dispatch(addChips({ id: getUnuqueId(), title: value }));
    setValue('');
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEY_CODE.ENTER && validate(value, SPECIAL_SYMBOL.DOUBLE_QUOTES)) {
      value.includes(SPECIAL_SYMBOL.COMMA) ? addMoreChips<void>(value, doEmptyValue) : addOneChip();
    }

    if (e.key === KEY_CODE.ENTER && !validate(value, SPECIAL_SYMBOL.DOUBLE_QUOTES)) {
      handleChangeError(true);
    }

    if (
      (e.key === KEY_CODE.BACKSPACE || e.key === KEY_CODE.DELETE) &&
      value.length === 0
    ) {
      dispatch(deleteLast())
    }
  }

  return (
    <input
      className="grid__input input"
      type="text"
      value={value}
      onChange={(e) => handleChangeValue(e)}
      onKeyDown={(e) => handleKeyPress(e)}
      autoFocus
      required
    />
  )
}

export default Input
