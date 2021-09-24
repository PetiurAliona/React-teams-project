import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addSprint } from "../../../redux/sprints/sprints-operations";
import SubmitButton from "../../common/submitButton/SubmitButton";
import { WrapperForm } from "./CreateSprintFormStyled";
import moment from "moment";
import { useLocation } from "react-router";

const CreateSprintForm = ({ setOpenModal }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [isActivelastDate, setIsActiveLastDate] = useState(true);
  const location = useLocation();
  const projectId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "duration":
        setDuration(value);
        break;
      default:
        break;
    }
  };

  const dispatch = useDispatch();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const formatDate = moment(startDate).format("YYYY-M-D");
    dispatch(
      addSprint({
        projectId,
        sprintData: {
          title: name,
          endDate: formatDate,
          duration,
        },
      })
    );
    setOpenModal(false);
    setName("");
  };
  const changeActiveDate = (e) => {
    e.preventDefault();
    setIsActiveLastDate(!isActivelastDate);
  };
  const [startDate, setStartDate] = useState(new Date());

  return (
    <WrapperForm>
      <form className="form" onSubmit={onHandleSubmit}>
        <label>
          <input
            className="input"
            type="text"
            name="name"
            value={name}
            placeholder="Назва спринта"
            required
            onChange={handleChange}
          />
        </label>
        <button
          onClick={changeActiveDate}
          type="button"
          className="round__wrapper"
        >
          <span className="round">
            {!isActivelastDate && <span className="orange"></span>}
          </span>
          Попередні дні
        </button>
        <div className="date__wrapper">
          <label className="dateLabel">
            Дата закінчення
            <DatePicker
              popperPlacement="bottom"
              className="date"
              name="date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={isActivelastDate && new Date()}
            />
          </label>
          <label>
            <input
              className="input duration"
              type="number"
              name="duration"
              value={duration}
              placeholder="Тривалість"
              required
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="submitWrapper">
          <SubmitButton className="submit" nameBtn="Готово" />
        </div>
      </form>
    </WrapperForm>
  );
};

export default CreateSprintForm;
