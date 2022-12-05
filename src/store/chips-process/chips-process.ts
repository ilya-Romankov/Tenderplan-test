import { createSlice } from '@reduxjs/toolkit'
import { ChipsType } from '../../types/chips'

type initialStateType = {
  chips: ChipsType[]
}

export const initialState: initialStateType = {
  chips: [],
}

export const chipProcess = createSlice({
  name: 'chipsProcess',
  initialState,
  reducers: {
    addChips: (state, action) => {
      state.chips = [...state.chips, action.payload];
    },
    deleteChips: (state, action) => {
      state.chips = state.chips.filter(({ id }) => id !== action.payload);
    },
    updateChips: (state, action) => {
      const { id, title } = action.payload as ChipsType;
      state.chips[id].title = title;
    },
    deleteLast: (state) => {
      //Не до конца уверен в этом решении. Если на ревью покажете способ лучше, то это будет просто отлично!
      state.chips.pop();
    },
  },
})

export const {
  addChips,
  deleteChips,
  updateChips,
  deleteLast,
} = chipProcess.actions;
