import Modal from '../../common/modal/Modal';
import CreateSprintForm from '../createSprintForm/CreateSprintForm';

const CreateSprint = ({ closeModal, setCloseModal }) => {
  return (
    <Modal
      nameForm="Створення спринта"
      closeModal={closeModal}
      setCloseModal={setCloseModal}
    >
      <CreateSprintForm setOpenModal={setCloseModal} />
    </Modal>
  );
};

export default CreateSprint;
