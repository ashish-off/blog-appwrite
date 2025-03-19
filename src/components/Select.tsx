import { useId } from "react";
import React from "react";

interface SelectProps {
  options?: string[];
  label?: string;
  className?: string;
}

const Select = React.forwardRef <HTMLSelectElement ,SelectProps>( ({ options = [], label, className = "", ...props }: SelectProps, ref ) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="">{label}</label>}
      <select
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        ref={ref}
      >
        {options?.map((option) => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
    </div>
  )
})

export default Select;
// export default React.forwardRef(Select); // because we did not wrap the component in forwardRef
