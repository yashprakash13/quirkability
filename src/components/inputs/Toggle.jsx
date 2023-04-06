const Toggle = ({ enabled, setEnabled }) => {
  return (
    <div
      className={`flex w-16 h-6 rounded-br-xl shadow-sm ${
        enabled ? "bg-warning-dark" : "bg-primary-default"
      } justify-start items-center border-sm border-secondary-focus cursor-pointer transition-all duration-300`}
      onClick={() => setEnabled(!enabled)}
    >
      {enabled ? (
        <div className="h-[19px] w-6 bg-secondary-focus my-[1px] ml-[36px] mr-[1px] transition-all duration-300 rounded-br-[10px]"></div>
      ) : (
        <div className="h-[19px] w-6 bg-secondary-focus my-[1px] mx-[1px] transition-all duration-300"></div>
      )}
    </div>
  )
}

export default Toggle
