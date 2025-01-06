import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";
import { Loader } from "lucide-react";
import { twMerge } from "tailwind-merge";

type CustomSelectProps = SelectProps & {
  className?: string;
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  isLoading?: boolean;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  className,
  options,
  value,
  placeholder,
  onChange,
  isLoading = false,
  ...props
}) => {
  return (
    <Select
      value={isLoading ? "loading" : value}
      onValueChange={onChange}
      disabled={isLoading}
      {...props}
    >
      <SelectTrigger className={twMerge("w-[180px]", className)}>
        <SelectValue placeholder={isLoading ? "Loading..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <SelectItem value="loading" disabled>
            <Loader className="h-3 w-3 animate-spin duration-[infinity]" />
          </SelectItem>
        ) : (
          options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export { CustomSelect };
