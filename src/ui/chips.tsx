import { ChangeEvent, useState, KeyboardEvent } from 'react'
import { KEY_CODE, SPECIAL_SYMBOL } from '../constant'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { updateChips } from '../store/chips-process/chips-process'

type ChipsType = {
  id: number
  title: string
  index: number
  handleDeleteChips: (id: number) => void,
  addMoreChips:<T, U> (chips:string, cb?:(arg?: U) => T) => void,
  handleMouseSelect: (id: number) => void,
  modeSelect: boolean,
}

function Chip({
  title,
  id,
  handleDeleteChips,
  handleMouseSelect,
  addMoreChips,
  modeSelect,
  index,
}: ChipsType): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [chipsValue, setChipsValue] = useState<string>(title);

  const dispatch = useAppDispatch();

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => setChipsValue(e.currentTarget.value);

  //Эти функции нужно поднять на верх, но т.к проект очень маленький , то не влияет на производительность
  const updateOne = () => {
    dispatch(updateChips({ id: index, title: chipsValue }))
    setIsEdit(false);
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === KEY_CODE.ENTER) {
      chipsValue.includes(SPECIAL_SYMBOL.COMMA) ? addMoreChips<void, number>(chipsValue, handleDeleteChips(id) as any): updateOne();
    }
  };

  const selectChip = () => {
    if (modeSelect && !isEdit) {
      handleMouseSelect(id);
    }
  }

  return (
    <li onClick={() => setIsEdit(true)} onMouseEnter={selectChip} className="chips__element">
      {isEdit ? (
        <input
          value={chipsValue}
          onChange={(e) => handleChangeValue(e)}
          onKeyPress={(e) => handleKeyPress(e)}
          className="chips__input"
          type="text"
        />
      ) : (
        <>
          <span>{chipsValue}</span>
          <button onClick={() => handleDeleteChips(id)} className="chips__btn">
            <svg
              width="17"
              height="17"
              viewBox="0 0 15 15"
              version="1.1"
              id="cross"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.64,1.27L7.5,6.13l4.84-4.84C12.5114,1.1076,12.7497,1.0029,13,1c0.5523,0,1,0.4477,1,1&#xA;&#x9;c0.0047,0.2478-0.093,0.4866-0.27,0.66L8.84,7.5l4.89,4.89c0.1648,0.1612,0.2615,0.3796,0.27,0.61c0,0.5523-0.4477,1-1,1&#xA;&#x9;c-0.2577,0.0107-0.508-0.0873-0.69-0.27L7.5,8.87l-4.85,4.85C2.4793,13.8963,2.2453,13.9971,2,14c-0.5523,0-1-0.4477-1-1&#xA;&#x9;c-0.0047-0.2478,0.093-0.4866,0.27-0.66L6.16,7.5L1.27,2.61C1.1052,2.4488,1.0085,2.2304,1,2c0-0.5523,0.4477-1,1-1&#xA;&#x9;C2.2404,1.0029,2.4701,1.0998,2.64,1.27z" />
            </svg>
          </button>
        </>
      )}
    </li>
  )};



export default Chip;
