import { useSelector } from "react-redux";
import { tasksSelector } from "src/store/taskSlice";

interface ComponentProps {
  isFiltred: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<ComponentProps> = ({ onClick, isFiltred }) => {
  const items = useSelector(tasksSelector);

  const isDisabled: boolean =
    items.filter((item) => item.done).length === 0 && !isFiltred;

  return (
    <button disabled={isDisabled} onClick={onClick}>
      {!isFiltred
        ? "Спрятать выполненные задачи"
        : "Показать выполненные задачи"}
    </button>
  );
};
export default FilterButton;
