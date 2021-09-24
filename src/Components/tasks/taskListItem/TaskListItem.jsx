import Button from "../../common/button/Button";
import { TaskListItemWrapper } from "./TaskListItemStyled";
import {
  deleteSprintsTask,
  patchTaskHours,
} from "../../../redux/task/task-operations";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  hoursWasted: yup
    .number()
    .min(0, "Должно быть от нуля до 8")
    .max(8, "Должно быть от нуля до 8")
    .required("Должно быть обязательно")
    .positive()
    .integer(),
});

const TaskListItem = ({ task, targetDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDesktop, setIsOpenDesktop] = useState(false);
  const [hoursWasted, sethoursWasted] = useState(0);
  const [sprintId, setSprintId] = useState(null);
  const [currentDayHour, setcurrentDayHour] = useState(0);
  const formik = useFormik({
    initialValues: { hoursWasted: 0 },
    validationSchema: schema,
  });
  const dispatch = useDispatch();

  const deleteTask = (e) => {
    return dispatch(deleteSprintsTask(task._id ?? task.id));
  };

  const onHandleClikc = async (e) => {
    setSprintId(task._id ?? task.id);
    await setIsOpen(true);
    focusInput();
  };

  const focusInput = () => {
    return document.getElementById("inputNumber").focus();
  };

  useEffect(() => {
    if (
      Number(formik.values.hoursWasted) > 0 &&
      Number(formik.values.hoursWasted) <= 8 &&
      formik.values.hoursWasted !== ""
    ) {
      const taskObj = {
        date: targetDate,
        hours: Number(formik.values.hoursWasted),
      };
      dispatch(patchTaskHours({ sprintId, taskObj }));
    }
  }, [dispatch, formik.values.hoursWasted, sprintId, targetDate]);

  useEffect(() => {
    if (task) {
      task.hoursWastedPerDay.filter((item) => {
        if (item.currentDay === targetDate) {
          setcurrentDayHour(item.singleHoursWasted);
          sethoursWasted(item.singleHoursWasted);
          // setcurrentDayHour(0);
        }
      });
    }
  }, [task, targetDate]);

  const onHandleSubmit = (e) => {
    e.preventDefault();
  };

  const onBlur = () => {
    setIsOpen(false);
    // console.log("Отрабатывает");
  };

  const onHandleClickDesktop = async (e) => {
    console.log(task._id ?? task.id);
    setSprintId(task._id ?? task.id);
    await setIsOpenDesktop(true);
    focusInputDesktop();
  };

  const focusInputDesktop = () => {
    return document.getElementById("inputNumberDesktop").focus();
  };

  const onBlurDesktop = () => {
    setIsOpenDesktop(false);
  };

  return (
    <TaskListItemWrapper>
      <div className="TitleWrapper">
        <h3 className="TaskTitle">{task.title}</h3>
        <div className="TaskTitleAfter"></div>
      </div>
      <div className="TaskDescriptionTablet">
        <p className="describtion">
          <span className="describtionHour">Заплановано годин</span>
          <span className="describtionHourNumber">{task.hoursPlanned}</span>
        </p>
        <p className="describtion">
          <span className="describtionHour">Витрачено год / день</span>
          {!isOpen && (
            <span className="describtionNumber" onClick={onHandleClikc}>
              {currentDayHour}
            </span>
          )}

          {isOpen && (
            <input
              id="inputNumber"
              name="hoursWasted"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.hoursWasted}
              className="inputNumber"
              onBlur={onBlur}
            />
          )}
        </p>
        <p className="describtion describtionLastChild">
          <span className="describtionHour">Витрачено годин</span>
          <span className="describtionHourNumber">{task.hoursWasted}</span>
        </p>
        <div className="BtnDelete">
          <Button
            icon="delete"
            classBtn="editDelete"
            onHandleClick={deleteTask}
          />
        </div>
      </div>
      <div className="TaskDescriptionDesktop">
        <span className="describtionHourNumber">{task.hoursPlanned}</span>
        {!isOpenDesktop && (
          <span className="describtionNumber" onClick={onHandleClickDesktop}>
            {currentDayHour}
          </span>
        )}
        {isOpenDesktop && (
          <input
            id="inputNumberDesktop"
            name="hoursWasted"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.hoursWasted}
            className="inputNumberDesktop"
            onBlur={onBlurDesktop}
          />
        )}
        <span className="describtionHourNumber">
          {/* {task.hoursWastedPerDay.map((item) => item.singleHoursWasted)} */}
          {task.hoursWasted}
        </span>

        <div className="BtnDeleteDesktop">
          <Button
            icon="delete"
            classBtn="editDelete"
            onHandleClick={deleteTask}
          />
        </div>
      </div>
    </TaskListItemWrapper>
  );
};

export default TaskListItem;
