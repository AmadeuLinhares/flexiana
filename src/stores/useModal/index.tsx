import create, { SetState } from 'zustand';

import { State } from './types';

export const useModal = create<State>((set: SetState<State>) => {
  function setOpenModal(isOpen: boolean): void {
    set((state: State) => ({ ...state, isOpen: isOpen }));
  }

  return {
    isOpen: false,
    setOpenModal,
  };
});
