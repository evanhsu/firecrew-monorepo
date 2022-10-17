import {
  Person,
  useAddExistingPersonToBoardMutation,
  useCreateAndAddPersonToBoardMutation,
  useFindPersonByNameLazyQuery,
} from '@firecrew/robo-service-client';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { StyledCell } from '../cell/cell';
import { StyledRow } from '../row/row';
import { StyledTile } from '../tile/tile';

export interface AddTileFormProps {
  boardId: string;
}

/**
 * A Selectable object is meant to be used as an option in a MUI Autocomplete list.
 * It includes an optional 'inputValue' property which (if present)
 * is used as the text in the <TextField> form field
 */
type Selectable<T> = {
  inputValue?: string;
} & T;

export function AddTileForm(props: AddTileFormProps) {
  const { boardId } = props;

  const [value, setValue] = useState<Selectable<Person> | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<Selectable<Person>[]>([]);

  const [
    findPeople,
    {
      called: calledFindPeople,
      loading: loadingFindPeople,
      data: dataFindPeople,
    },
  ] = useFindPersonByNameLazyQuery();
  const [
    createAndAddPersonToBoard,
    {
      called: calledCreateAndAddPerson,
      loading: loadingCreateAndAddPerson,
      data: dataCreateAndAddPerson,
    },
  ] = useCreateAndAddPersonToBoardMutation();

  const [
    addExistingPersonToBoard,
    {
      called: calledAddExistingPerson,
      loading: loadingAddExistingPerson,
      data: dataAddExistingPerson,
    },
  ] = useAddExistingPersonToBoardMutation();

  const handleAddExistingPerson = async (personId: string) => {
    addExistingPersonToBoard({
      variables: {
        personId,
        boardId,
      },
    });
  };

  const handleCreateNewPerson = async (person: {
    name: string;
    qualifications?: string[];
  }) => {
    createAndAddPersonToBoard({
      variables: {
        person,
        boardId,
      },
    });
  };

  return (
    <StyledRow style={{ marginTop: 10 }}>
      <StyledCell style={{ backgroundColor: 'white' }}>
        <StyledTile opacity={1}>
          <Autocomplete
            id="add-tile-to-board"
            value={value}
            // onChange is invoked when a selection is made (not on each keystroke)
            onChange={async (
              _event: any,
              newValue: Selectable<Person> | string
            ) => {
              if (typeof newValue === 'string') {
                // A name was typed into the autocomplete field, but an existing
                // person was not selected (treat this as a new person)
                await handleCreateNewPerson({ name: newValue });
                setValue(undefined);
                setInputValue('');
              } else if (newValue && newValue.inputValue) {
                // A name was typed into the autocomplete field, and then the
                // "Add 'Bob Jones'" suggestion was clicked
                await handleCreateNewPerson({ name: newValue.inputValue });
                setValue(undefined);
                setInputValue('');
              } else {
                // An existing person was selected in the list of suggestions
                await handleAddExistingPerson(newValue.id);
                setValue(undefined);
                setInputValue('');
              }
            }}
            inputValue={inputValue}
            onInputChange={async (_event, newValue) => {
              setInputValue(newValue);
              findPeople({
                variables: { fuzzyName: newValue, omitPeopleOnBoard: boardId },
                onCompleted(data) {
                  setOptions(data.people || []);
                },
              });
            }}
            filterOptions={(options, params) => {
              if (params.inputValue !== '') {
                options.push({
                  name: `Add '${params.inputValue}'`,
                  inputValue: params.inputValue,
                  qualifications: [],
                  id: 'nope',
                });
              }

              return options;
            }}
            freeSolo
            disableClearable
            getOptionLabel={(person) => {
              if (typeof person === 'string') {
                return person;
              }
              //   if (person.inputValue) {
              //     return person.inputValue;
              //   }
              return person.name;
            }}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Add a Person"
                sx={{ height: '100%' }}
                InputProps={{
                  ...params.InputProps,
                  sx: { height: '100%' },
                  type: 'search',
                }}
              />
            )}
            sx={{ height: '100%' }}
          />
        </StyledTile>
      </StyledCell>
    </StyledRow>
  );
}

export default AddTileForm;
