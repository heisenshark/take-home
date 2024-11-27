import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { useStore } from "../store";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ToggleButton } from "./Buttons";

export const Entrypoint = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const [deletedCards, setDeletedCards] = useState<ListItem[]>([]);
  const [showDeletedCards, setShowDeletedCards] = useState<boolean>(false);
  const listQuery = useGetListData();
  const [animationParent] = useAutoAnimate();

  const {
    deletedCardsIds,
    deletedCardsCount,
    deleteCard,
    toggleCollapseCard,
    openCardsIds,
  } = useStore();

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }
    setDeletedCards(
      listQuery.data?.filter((item) => deletedCardsIds.includes(item.id)) ?? [],
    );
    setVisibleCards(
      listQuery.data?.filter(
        (item) =>
          (item.isVisible || openCardsIds.includes(item.id)) &&
          !deletedCardsIds.includes(item.id),
      ) ?? [],
    );
  }, [listQuery.data, listQuery.isLoading, deletedCardsIds, openCardsIds]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16  w-full mx-10">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">
          My Awesome List ({visibleCards.length})
        </h1>
        <div className="flex flex-col gap-y-3" ref={animationParent}>
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              card={card}
              isOpen={openCardsIds.includes(card.id)}
              onToggle={() => toggleCollapseCard(card.id)}
              onDelete={() => deleteCard(card.id)}
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCardsCount})
          </h1>
          <div className="flex gap-2">
            <ToggleButton
              onClick={() => {
                setShowDeletedCards((n) => !n);
              }}
              className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
              toggleState={!showDeletedCards}
              contentOn={"Reveal"}
              contentOff={"Hide"}
            />
            <button
              className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded  px-3 py-1"
              disabled={listQuery.isFetching}
              onClick={() => {
                listQuery.refetch();
              }}
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-y-3" ref={animationParent}>
          {showDeletedCards &&
            deletedCards.map((card) => (
              <Card key={card.id} card={card} isDeleted />
            ))}
        </div>
      </div>
    </div>
  );
};
