import React, { useState } from "react";
import { useDispatch } from "react-redux";

import SubmitButton from "../../common/submitButton/SubmitButton";
import { WrapperForm } from "./AddProjectModalStyled";
import projectsOperations from "../../../redux/projects/projects-operations";

const AddProjectModal = ({ setCloseModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleChangeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleDescription = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(projectsOperations.postProject({ title, description }));
    setTitle("");
    setDescription("");
    setCloseModal();
  };

  return (
    <WrapperForm>
      <form className="form" onSubmit={onHandleSubmit}>
        <label>
          <input
            className="input"
            type="text"
            name="title"
            value={title}
            placeholder="Назва проекту"
            required
            onChange={handleChangeTitle}
          />
        </label>

        <label>
          <h3 className="inputTitle">Опис</h3>
          <input
            type="text"
            className="input"
            name="description"
            value={description}
            required
            onChange={handleDescription}
          />
        </label>
        <div className="submitWrapper">
          <SubmitButton nameBtn="Готово" />
        </div>
      </form>
    </WrapperForm>
  );
};

export default AddProjectModal;
