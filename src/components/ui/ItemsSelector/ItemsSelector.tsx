import { forwardRef } from "react";
import Select from "react-select";
import ItemsSelectorProps from "./ItemsSelectorProps";
import "./ItemsSelector.css";

const ItemSelector: React.ForwardRefRenderFunction<
  HTMLInputElement,
  ItemsSelectorProps
> = (
  {
    options,
    handleChange,
    textPosition = "center",
    isClearable,
    placeholder,
    label,
    forForm,
    defaultValueIndex,
    selectErrorMessage,
    isDisabled,
  },
  ref
) => {
  return (
    <>
      {forForm ? (
        <>
          <div>
            {label && <p className='textStyles'>{label}</p>}
            <div className='inputGroup'>
              <Select
                isDisabled={isDisabled}
                placeholder={placeholder}
                classNamePrefix='custom-selector'
                defaultValue={
                  options &&
                  defaultValueIndex !== undefined &&
                  options[defaultValueIndex]
                }
                unstyled
                styles={{
                  valueContainer: (styles, { hasValue }) => ({
                    ...styles,
                    textAlign: textPosition,
                    color: hasValue ? "#000" : "inherit",
                  }),
                  control: (styles) => ({
                    ...styles,
                    fontSize: "14px",
                  }),
                  option: (styles) => ({
                    ...styles,
                    fontSize: "14px",
                  }),
                }}
                isClearable={isClearable}
                menuPosition='fixed'
                options={options}
                onChange={(option) => handleChange(option ? option : null)}
              />

              <p className='warningStyles'>{selectErrorMessage}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <Select
            className='custom-selector'
            placeholder={placeholder}
            classNamePrefix='custom-selector'
            unstyled
            styles={{
              valueContainer: (styles) => ({
                ...styles,
                textAlign: textPosition,
              }),
            }}
            isClearable={isClearable}
            menuPosition='fixed'
            options={options}
            onChange={(option) => handleChange(option)}
          />
        </>
      )}
    </>
  );
};

export default forwardRef(ItemSelector);
