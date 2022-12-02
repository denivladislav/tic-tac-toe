import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EModalTypes } from '../helpers/enums';
import { TModalType } from '../helpers/types';

interface IModalInfo {
  modalType: TModalType,
}

const initialState: IModalInfo = {
  modalType: EModalTypes.NULL,
};

export const modalSlice = createSlice({
  name: 'modalInfo',
  initialState,
  reducers: {
    openModal: (state, { payload }: PayloadAction<TModalType>) => {
      state.modalType = payload;
    },
    closeModal: (state) => {
      state.modalType = EModalTypes.NULL;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
