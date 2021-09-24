import { ButtonWrapper } from './ButtonStyled';

const Button = ({
  onHandleClick,
  icon = 'add',
  classBtn = 'add',
  background = '',
}) => {
  return (
    <ButtonWrapper>
      <button
        type="button"
        className={`${classBtn} btnCommon`}
        onClick={onHandleClick}
      >
        <span className={`material-icons-outlined icon ${background}Icon`}>
          {icon}
        </span>
      </button>
    </ButtonWrapper>
  );
};
export default Button;
