import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { twMerge } from "tailwind-merge";

type SelectProps = {
  className?: string;
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

const CustomSelect: React.FC<SelectProps> = ({
  className,
  options,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={twMerge("w-[180px]", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { CustomSelect };
