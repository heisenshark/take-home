import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ToggleButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type CardProps = {
  card: ListItem;
  isOpen?: boolean;
  isDeleted?: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
  onRestore?: () => void;
};

export const Card: FC<CardProps> = ({
  card,
  isOpen,
  isDeleted,
  onToggle,
  onDelete,
}) => {
  const [animationParent] = useAutoAnimate();
  const showDescription = isOpen && !isDeleted;
  return (
    <div
      ref={animationParent}
      className="border border-black px-2 py-1.5 min-w-96"
    >
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{card.title}</h1>
        <div className="flex">
          {!isDeleted ? (
            <>
              <ToggleButton
                onClick={onToggle}
                toggleState={isOpen}
                contentOn={<ChevronUpIcon />}
                contentOff={<ChevronDownIcon />}
              />
              <DeleteButton onClick={onDelete} />
            </>
          ) : (
            <>{/*<RestoreButton />*/}</>
          )}
        </div>
      </div>
      {showDescription && <p className="text-sm ease-in">{card.description}</p>}
    </div>
  );
};
