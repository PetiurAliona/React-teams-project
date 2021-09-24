import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../../redux/task/task-operations";

import SubmitButton from "../../common/submitButton/SubmitButton";
import { WrapperForm } from "./TaskFormStyled";
import { useParams } from "react-router";

const TaskForm = ({ setCloseModal }) => {
  const [title, setTitle] = useState("");
  const [hoursPlanned, setHoursPlanned] = useState("");
  const { id } = useParams();

  const handleChangeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleHoursPlanned = (e) => {
    setHoursPlanned(e.currentTarget.value);
  };

  const dispatch = useDispatch();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({ sprintId: id, task: { title, hoursPlanned } }));
    setTitle("");
    setHoursPlanned("");
    setCloseModal(false);
  };

  return (
    <WrapperForm>
      <form onSubmit={onHandleSubmit}>
        <label>
          <input
            className="input"
            type="text"
            name="title"
            value={title}
            placeholder="Назва задачі"
            required
            onChange={handleChangeTitle}
          />
        </label>

        <label>
          <input
            className="input"
            type="number"
            name="hoursPlanned"
            value={hoursPlanned}
            placeholder="Заплановано годин"
            required
            onChange={handleHoursPlanned}
          />
        </label>
        <div className="submitWrapper">
          <SubmitButton nameBtn="Готово" />
        </div>
      </form>
    </WrapperForm>
  );
};

export default TaskForm;
