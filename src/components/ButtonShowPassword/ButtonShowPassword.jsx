import './ButtonShowPassword.css';

export default function ButtonShowPassword({ currentState, onChange }) {
  const handleStateChange = () => {
    onChange(!currentState);
  };

  return (
    <button
      type="button"
      className={`button-password button-password_${!currentState ? 'showed' : 'hidden'}`}
      onClick={handleStateChange}
    ></button>
  );
}
