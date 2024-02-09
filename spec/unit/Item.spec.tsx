import { prettyDOM, render, screen, waitFor } from "@testing-library/react";
import { Item } from "src/components/Item";

const mockTask = {
  id: "1",
  header: "This is a less header than 32",
  done: true,
};

const mockTask2 = {
  id: "1",
  header: "This is a less header than 32",
  done: false,
};

describe("Элемент списка задач", () => {
  it("название не должно быть больше 32 символов", () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();

    const { getByText } = render(
      <Item {...mockTask} onToggle={onChange} onDelete={onDelete} />
    );

    const label = getByText(mockTask.header);

    expect(label.textContent?.length).toBeLessThanOrEqual(32);
  });

  it("название не должно быть пустым", () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();

    const { getByTestId } = render(
      <Item {...mockTask} onToggle={onChange} onDelete={onDelete} />
    );

    const element = getByTestId("item-label");

    expect(element.textContent?.length).not.toBe(0);
  });
  it("нельзя удалять невыполненные задачи", () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();

    const { getByRole } = render(
      <Item {...mockTask} onToggle={onChange} onDelete={onDelete} />
    );

    const deleteButton = getByRole("button");
    expect(deleteButton).not.toHaveAttribute("disabled");
  });
  it("Можно удалять невыполненные задачи", () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();

    const { getByRole } = render(
      <Item {...mockTask2} onToggle={onChange} onDelete={onDelete} />
    );

    const deleteButton = getByRole("button");
    expect(deleteButton).toHaveAttribute("disabled");
  });
  it("при изменении статуса задачи, текст задачи меняется на перечеркнутый", () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();

    const { getByText } = render(
      <Item {...mockTask} onToggle={onChange} onDelete={onDelete} />
    );
    const label = getByText(mockTask.header);
    expect(label.tagName).toBe("S");
  });
});
