import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick, customClass }) {
  const base =
    "inline-block text-sm  font-semibold  tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: `${base} uppercase rounded-lg bg-gray-400 text-stone-800 hover:bg-gray-300 focus:bg-gray-300 px-4 py-2 md:px-6 md:py-4`,
    small: `${base} uppercase rounded-lg bg-yellow-400 text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 px-4 py-2 md:px-5 md:py-2.5 text-xs`,
    round: `${base} uppercase rounded-lg bg-yellow-400 text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 px-2.5 py-1 md:px-3.5 md:py-2 text-sm`,
    accept: `${base} uppercase rounded-lg bg-green-400 text-stone-800 hover:bg-green-600 focus:bg-green-600 focus:ring-green-300 px-4 py-2 md:px-6 md:py-3 text-sm`,
    reject: `${base} uppercase rounded-lg bg-red-400 text-stone-800 hover:bg-red-600 focus:bg-red-600 focus:ring-red-300 px-4 py-2 md:px-6 md:py-3 text-sm`,
    start: `${base}  rounded-lg bg-custom-pink text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 px-4 py-2 md:px-6 md:py-3`,
    answer: `${base} rounded-full border-4 border-custom-pink text-white hover:border-yellow-300 focus:border-yellow-300 px-4 py-2 md:px-6 md:py-3 text-sm w-full`,
    next: `${base} rounded-full bg-custom-pink text-white hover:border-yellow-300 focus:border-yellow-300 px-4 py-2 md:px-6 md:py-3 text-sm w-1/4`,
    end: `${base} rounded-full bg-custom-pink text-white hover:border-yellow-300 focus:border-yellow-300 px-4 py-2 md:px-6 md:py-3 text-sm w-1/4`,
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
  };

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      toast.error("You need to choose 3 skills to proceed!");
    } else if (onClick) {
      onClick();
    }
  };

  if (to)
    return (
      <Link
        to={to}
        className={`${styles[type]} ${customClass}`}
        onClick={handleClick}
      >
        {children}
      </Link>
    );

  return (
    <button
      disabled={disabled}
      className={`${styles[type]} ${customClass}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
