import Modal from "../../common/modal/Modal"
import TaskForm from "./TaskForm"

const CreateTask = ({ closeModal, setCloseModal }) => {
  return (
    <Modal nameForm="Створення задачі" closeModal={closeModal} setCloseModal={setCloseModal}>
      <TaskForm setCloseModal={setCloseModal} />
    </Modal>
  )
}

export default CreateTask
