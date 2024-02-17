import { prettyDOM, render, screen } from "@testing-library/react";
import { App } from "src/App";
import { List } from "src/components/List";
import { JestStoreProvider } from "../utils/JestStoreProvider";
import ue from "@testing-library/user-event";

it.skip("отображение списка задач", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const items: Task[] = [
    {
      id: "1",
      header: "купить хлеб",
      done: false,
    },
    {
      id: "2",
      header: "купить молоко",
      done: false,
    },
    {
      id: "3",
      header: "выгулять собаку",
      done: true,
    },
  ];

  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />
  );
  const firstRender = asFragment();

  items.pop();

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
  const secondRender = asFragment();

  expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it("Список содержит не больше 10 невыполненных задач", async () => {
  const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  render(<App />, { wrapper: JestStoreProvider });

  const input = screen.getByTestId("input-field");

  const addBtn = screen.getByAltText(/Добавить/i);

  for (let i = 1; i <= 12; i++) {
    await userEvent.type(input, `task ${i}`);
    await userEvent.click(addBtn);
  }
  const tasks = screen.queryAllByRole("checkbox");
  expect(tasks.length).toEqual(10);
});
