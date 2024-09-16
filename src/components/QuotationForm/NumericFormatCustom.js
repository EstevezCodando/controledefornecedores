// src/components/QuotationForm/NumericFormatCustom.js
import React, { forwardRef } from "react";
import { NumericFormat } from "react-number-format";

// Criar um wrapper para o NumericFormat com forwardRef
const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
    />
  );
});

export default NumericFormatCustom;
