import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import _ from "lodash"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ tags, selectedTags, handleChange, width }) {
  const [tagsState, setTagsState] = useState(_.cloneDeep(tags))
  const [selectedTagsState, setSelectedTagsState] = useState(selectedTags)

  useEffect(() => {
    setTagsState(_.cloneDeep(tags))
    setSelectedTagsState(selectedTags)
  }, [tags, selectedTags])

  return (
    <Autocomplete
      multiple
      id="tag-filter"
      options={tags}
      onChange={(event, newValue) => handleChange(event, newValue)}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      value={selectedTags}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </React.Fragment>
      )}
      style={{ width: width || 500 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Categories" />
      )}
    />
  );
}
