import { useDispatch, useSelector } from "react-redux";
import { Empty } from "src/components/Empty";
import FilterButton from "src/components/FilterButton";
import { List } from "src/components/List";
import { RootState } from "src/store/configureStore";
import {
  deleteTask,
  tasksSelector,
  toggleFilter,
  toggleTask,
} from "src/store/taskSlice";

export const TaskList = () => {
  const isFiltred = useSelector((state: RootState) => state.taskList.isFiltred);
  const items = useSelector(tasksSelector);
  const dispatch = useDispatch();

  const handleDelete = (id: Task["id"]) => {
    dispatch(deleteTask(id));
  };

  const handleToggle = (id: Task["id"]) => {
    dispatch(toggleTask(id));
  };

  const handleFilteredTasks = () => {
    dispatch(toggleFilter());
  };

  return items.length > 0 ? (
    <>
      <FilterButton onClick={handleFilteredTasks} isFiltred={isFiltred} />
      <List items={items} onDelete={handleDelete} onToggle={handleToggle} />
    </>
  ) : (
    <Empty />
  );
};
