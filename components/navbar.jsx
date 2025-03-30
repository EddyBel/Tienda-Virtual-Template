import { LOGO } from "../constants";
import { FiSearch } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";


export function NavBar() {
  return (
    <div className="w-full h-16 bg-white dark:bg-black flex items-center justify-around">
      <div className="flex items-center justify-center gap-3 h-full">
        <img src={LOGO} alt="logo" className="w-10 h-10" />
        <h1>Tienda Virtual</h1>
      </div>

      <div className="w-full border-[1px] rounded-[2px]">
        <input
          type="text"
          placeholder="¿Qué articulo buscas?"
          className="w-full h-full border-none bg-transparent text-black dark:text-white text-xl font-bold"
        />

        <div className="bg-black dark:bg-white h-full flex flex-col justify-center items-center">
          <FiSearch className="text-2xl" />
        </div>
      </div>

      <div className="w-full h-full">
        <div className="w-0 h-0">
            <FaUserAlt className="text-2xl" />
        </div>
        <div className="w-0 h-0">
            <FaShoppingCart className="text-2xl" />
        </div>
        <div className="w-0 h-0">
            <FaHeart className="text-2xl" />
        </div>
      </div>
    </div>
  );
}
