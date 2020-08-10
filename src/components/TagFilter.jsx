import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import _ from "lodash"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ tags, handleChange }) {
  const [tagsState, setTagsState] = useState(_.cloneDeep(tags))
  return (
    <Autocomplete
      multiple
      id="tag-filter"
      options={tagsState}
      onChange={(event, newValue) => handleChange(event, newValue)}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </React.Fragment>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Categories" />
      )}
    />
  );
}
