export const initialState = {
  notesState: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return { ...state, notesState: [...state.notesState, action.item] };

    case "SET_NOTES":
      return {
        ...state,
        notesState: action.notes,
      };
    case "REMOVE_NOTE":
      let newNoteList = [...state.notesState];
      const index = state.notesState.findIndex(
        (noteListItem) => noteListItem._id === action._id
      );
      if (index >= 0) {
        //remove item
        newNoteList.splice(index, 1);
      }
      return { ...state, notesState: newNoteList };
    case "UPDATE_NOTE":
      let data = [...state.notesState];
      let res = data.findIndex((obj) => obj._id === action.data._id);
      data[res].title = action.data.title;
      data[res].description = action.data.description;
      return { ...state, notesState: data };
    default:
      return state;
  }
}

export default reducer;
