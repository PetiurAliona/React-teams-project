import Modal from "../../common/modal/Modal"
import MembersForm from "./MembersForm"

const CreateMembers = ({ closeModal, setOpenModal }) => {
  return (
    <Modal nameForm="Додати людей" closeModal={closeModal} setCloseModal={setOpenModal}>
      <MembersForm setOpenModal={setOpenModal} />
    </Modal>
  )
}

export default CreateMembers
