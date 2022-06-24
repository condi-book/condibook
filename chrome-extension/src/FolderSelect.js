import React, { useState } from "react";
import {
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  Button,
  TextField,
} from "@material-ui/core";

const FolderSelect = () => {
  const [folder, setFolder] = useState("");
  const [input, setInput] = useState(false);

  const handleChange = (e) => {
    setFolder(e.target.value);

    if (e.target.value === "직접 입력") {
      setInput(true);
    } else setInput(false);
  };

  // const folderList = [{ label: "1" }, { label: "2" }, { label: "3" }];

  return (
    <>
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={folder}
          label="저장 폴더 *"
          onChange={handleChange}
        >
          <MenuItem value="하하">
            <em>None</em>
          </MenuItem>
          <MenuItem value="직접 입력">직접 입력</MenuItem>
          <MenuItem value="하나">Twenty</MenuItem>
          <MenuItem value="둘">Thirty</MenuItem>
        </Select>
        {/* <FormHelperText>Required</FormHelperText> */}
      </FormControl>
      {input ? (
        <TextField
          required
          id="standard-required"
          label="Required"
          defaultValue="Hello World"
          variant="standard"
        />
      ) : (
        <TextField
          disabled
          id="standard-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="standard"
        />
      )}
    </>
  );
};

export default FolderSelect;
