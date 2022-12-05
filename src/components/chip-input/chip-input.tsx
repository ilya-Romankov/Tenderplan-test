import { useCallback, useState, KeyboardEvent } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { deleteChips } from '../../store/chips-process/chips-process';
import { addChips } from '../../store/chips-process/chips-process';
import { getUnuqueId } from '../../helpers/generate-id';
import { validate } from '../../helpers/validate';
import Chips from '../../ui/chips';
import Input from '../../ui/input';
import { KEY_CODE, SPECIAL_SYMBOL } from '../../constant';

function ChipInput(): JSX.Element {
  //Логика первого и второго задания
  const chips = useAppSelector(({ chips }) => chips.chips);
  const [error, setError] = useState<boolean>(false);

  const handleChangeError = useCallback((stateError: boolean) => setError(stateError), []);

  const dispatch = useAppDispatch();

  const handleDeleteChips = useCallback((id: number):void => {
    dispatch(deleteChips(id));
  }, []);

  const addMoreChips =<T,U>(chips: string, cb?:(arg?: U) => T):void => {
    const isAllValidate = chips.split(",").every((chip) => validate(chip, SPECIAL_SYMBOL.DOUBLE_QUOTES));

    if (isAllValidate) {
      chips.split(",").forEach((chip) => dispatch(addChips({ id: getUnuqueId(), title: chip.trim()})));
      //Если коллбек передан, то вызываем(cb - callback)
      cb && cb();
    } else {
      handleChangeError(true);
    }
  }

  //Логика третьего пунта
  const [selectElement, setSelectElement] = useState<number[]>([]);
  const [modeSelect, setSelectMode] = useState<boolean>(false);

  const handleMoveSelect = useCallback((id: number) => {
    setSelectElement((prev) => [...prev, id]);
  } ,[]);

  window.addEventListener('keydown', (e)=> {
    if (e.key === KEY_CODE.BACKSPACE && selectElement.length !== 0) {
      new Set([...selectElement]).forEach((id) => dispatch(deleteChips(id)));
    }
  })

  const handleDeletePressChips = (e: KeyboardEvent) => {
    if (e.key === KEY_CODE.BACKSPACE && selectElement.length !== 0) {
      new Set([...selectElement]).forEach((id) => dispatch(deleteChips(id)));
    }
  }

  return (
    <section
     onMouseDown={() => setSelectMode(true)}
     onMouseUp={() => setSelectMode(false)}
     onKeyDown={(e: KeyboardEvent) => handleDeletePressChips(e)}
     className="grid">
      <div className="grid__container">
        {chips.length > 0 && (
          <ul className="chips">
            {chips.map(({ id, title }, index) => (
                <Chips
                  key={id}
                  id={id}
                  title={title}
                  index={index}
                  handleDeleteChips={handleDeleteChips}
                  addMoreChips={addMoreChips}
                  handleMouseSelect={handleMoveSelect}
                  modeSelect={modeSelect}
                />
            ))}
          </ul>
        )}
        <Input addMoreChips={addMoreChips} handleChangeError={handleChangeError} />
      </div>
      {error && <p className="grid__error">Закройте кавычку или не оставляйте поле пустым</p>}
    </section>
  )
}

export default ChipInput;
