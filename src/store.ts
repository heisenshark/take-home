import { create } from "zustand";

type State = {
  deletedCardsCount: number;
  deletedCardsIds: Array<number>;
  openCardsIds: Array<number>;
};

type Actions = {
  toggleCollapseCard: (cardId: number) => void;
  deleteCard: (cardObject: number) => void;
  restoreCard: (cardId: number) => void;
};

export const useStore = create<State & Actions>((set, get) => ({
  deletedCardsCount: 0,
  deletedCardsIds: [],
  openCardsIds: [],
  toggleCollapseCard: (cardId: number) => {
    let collapsedCardsAfter = [...get().openCardsIds];
    if (get().openCardsIds.indexOf(cardId) == -1) {
      collapsedCardsAfter.push(cardId);
    } else {
      collapsedCardsAfter = collapsedCardsAfter.filter((id) => id != cardId);
    }

    return set({
      openCardsIds: collapsedCardsAfter,
    });
  },
  deleteCard: (cardId: number) =>
    set((state) => {
      if (state.deletedCardsIds.indexOf(cardId) != -1) {
        return {};
      }

      return {
        deletedCardsIds: [...state.deletedCardsIds, cardId],
        deletedCardsCount: state.deletedCardsCount + 1,
      };
    }),
  restoreCard: (cardId: number) =>
    set((state) => {
      if (state.deletedCardsIds.indexOf(cardId) == -1) {
        return {};
      }
      return {
        deletedCardsIds: [...state.deletedCardsIds, cardId],
        deletedCardsCount: state.deletedCardsCount - 1,
      };
    }),
}));
