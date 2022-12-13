import styles from "./button.module.scss";

interface ButtonProp {
  size?: string;
  color?: string;
  text: string | React.ReactNode;
  disable?: boolean;
  dismissModal?: boolean;
  classModal?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  animation?: string;
}

const Button: React.FC<ButtonProp> = ({
  classModal,
  size,
  color,
  text,
  disable,
  dismissModal,
  handleClick,
  animation,
}) => {
  return (
    <button
      disabled={disable}
      onClick={handleClick}
      data-bs-dismiss={dismissModal ? "modal" : ""}
      className={`
        ${classModal}
        ${styles.container}
        ${color && styles[`button-${color}`]}
        ${size && styles[`button-size-${size}`]}
        ${disable && styles[`button-disable`]}
        ${animation && styles[`button-animation-${animation}`]}`}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  dismissModal: false,
};
export default Button;
