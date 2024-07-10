import React, { useState, ChangeEvent, useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import FormHelperText from "@mui/material/FormHelperText";

interface CheckboxesGroupProps {
  options: string[];
  labels: string[]; 
  onOptionSelect: (selectedValue: string) => void;
  selectedOption?: string;
  defaultValue?: string; 
}

const CheckboxesGroup: React.FC<CheckboxesGroupProps> = ({
  options,
  labels,
  onOptionSelect,
  selectedOption,
  defaultValue,
}) => {
  const [value, setValue] = useState(selectedOption || defaultValue || ""); // Initialize with the selected option, if provided, otherwise use defaultValue

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    onOptionSelect(selectedValue);
  };

  useEffect(() => {
    setValue(selectedOption || defaultValue || "");
  }, [selectedOption, defaultValue]);

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <RadioGroup value={value} onChange={handleChange}>
          {options.map((option, index) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={labels[index]}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default CheckboxesGroup;
