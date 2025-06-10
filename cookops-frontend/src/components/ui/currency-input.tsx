import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface CurrencyInputProps
  extends Omit<NumericFormatProps, "value" | "onValueChange"> {
  value?: number;
  onValueChange?: (value: number | undefined) => void;
  className?: string;
  placeholder?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    { value, onValueChange, className, placeholder = "R$ 0,00", ...props },
    ref
  ) => {
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        value={value || ""}
        onValueChange={(values) => {
          const { floatValue } = values;
          onValueChange?.(floatValue);
        }}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
        placeholder={placeholder}
        customInput={Input}
        className={cn(className)}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";
