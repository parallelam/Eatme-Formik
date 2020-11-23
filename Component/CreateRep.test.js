// __test__ CreateRep.test.js
import { Router, MemoryRouter } from "react-router-dom";
import React, {
  render,
  cleanup,
  fireEvent,
  queryByAttribute,
} from "@testing-library/react";
import CreateRep from "./CreateRep";

afterEach(cleanup);

const mockSubmit = jest.fn();

const setUp = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const component = render(
    <MemoryRouter>
      <CreateRep />
    </MemoryRouter>
  );
  const { container, getByTestId, getByText } = component;
  const getByName = queryByAttribute.bind(null, "name");
  const nameInput = getByName(container, "name");
  const sizeInput = getByName(container, "size");
  const imageInput = getByName(container, "image");
  const directionInput = getByName(container, "directions");
  const prepTimeInput = getByName(container, "prep_time");
  const takeTimeInput = getByName(container, "take_time");
  const additionalInformationInput = getByName(
    container,
    "additional_information"
  );
  const getByType = queryByAttribute.bind(null, "type");
  const submitButton = getByType(container, "submit");

  return {
    component,
    nameInput,
    sizeInput,
    imageInput,
    directionInput,
    prepTimeInput,
    takeTimeInput,
    additionalInformationInput,
    submitButton,
  };
};

it("simulate input type and click the form submit button", async () => {
  const {
    nameInput,
    sizeInput,
    imageInput,
    directionInput,
    prepTimeInput,
    takeTimeInput,
    additionalInformationInput,
    submitButton,
  } = setUp();

  fireEvent.change(nameInput, { target: { value: "test" } });
  expect(nameInput.value).toBe("test");

  fireEvent.change(sizeInput, { target: { value: "3" } });
  expect(sizeInput.value).toBe("3");

  fireEvent.change(imageInput, { target: { value: "1.png" } });
  expect(imageInput.value).toBe("1.png");

  fireEvent.change(directionInput, { target: { value: "/1.png" } });
  expect(directionInput.value).toBe("/1.png");

  fireEvent.change(prepTimeInput, { target: { value: "3" } });
  expect(prepTimeInput.value).toBe("3");

  fireEvent.change(takeTimeInput, { target: { value: "4" } });
  expect(takeTimeInput.value).toBe("4");

  fireEvent.change(additionalInformationInput, { target: { value: "oil" } });
  expect(additionalInformationInput.value).toBe("oil");

  fireEvent.click(submitButton);

  // wrap expect in `await wait`
  await wait(() => {
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
