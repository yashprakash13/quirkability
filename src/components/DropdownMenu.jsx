import { useRef, useState } from "react"
import useOutsideClicks from "../hooks/use-outsideclick"

const DropdownMenu = ({
  dropdownText,
  icon,
  options,
  groupHoverStateClass,
}) => {
  // In the props, the dropdown text is a string, icon is a component, options is an array of dicts, each dict containing a 'text' field and a 'func' field.
  // groupHoverStateClass is a string to change hover state of dropdown icon + text together
  const [isActive, setIsActive] = useState(false)
  const wrapperRef = useRef(null)
  useOutsideClicks(wrapperRef, setIsActive)
  return (
    <div className="group">
      <div
        className={`relative gap-3 text-lg text-secondary-focus bg-primary-default border-sm border-secondary-focus focus:outline-none rounded-br-lg px-4 py-2.5 text-center inline-flex items-center cursor-pointer ${groupHoverStateClass}`}
        onClick={() => setIsActive(!isActive)}
        ref={wrapperRef}
      >
        <div className={`${groupHoverStateClass}`}>{dropdownText}</div>
        <div className={`${groupHoverStateClass}`}>{icon}</div>
      </div>
      {isActive && options && (
        <div
          className="absolute z-10 mt-3 border-xs border-secondary-focus text-secondary-focus bg-primary-default divide-y divide-slate-bars rounded-lg shadow w-44"
          ref={wrapperRef}
        >
          <ul className="py-2 text-md text-secondary-focus cursor-pointer">
            {options.map((option, index) => (
              <li>
                <div
                  className="block px-4 py-2 hover:bg-primary-focus"
                  key={index}
                  onClick={option.onClick}
                >
                  {option.text}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
