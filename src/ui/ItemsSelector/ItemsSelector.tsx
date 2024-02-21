import { forwardRef } from "react";
import Select from "react-select";
import "./ItemsSelector.css";
import { ItemsSelectorProps } from "./ItemsSelector.types";

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
                placeholder={placeholder}
                classNamePrefix='custom-selector'
                defaultValue={
                  (options && options[defaultValueIndex || NaN]) || undefined
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
                onChange={(option) => handleChange(option)}
              />

              <p className='warningStyles'>{selectErrorMessage}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <Select
            placeholder={placeholder}
            classNamePrefix='custom-selector'
            /* defaultValue={options[0]} */
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
