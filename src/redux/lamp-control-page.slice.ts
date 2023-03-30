import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Lamp } from '../modules/lamps';
import axios from 'axios';

export const getLamps = createAsyncThunk<Lamp[], string>(
  'lamps/getLamps',
  async (name, { rejectWithValue }) => {
    //   const response = await axios.get(
    //     `https://pokeapi.co/api/v2/pokemon/${name}`
    //   );
    // const data = await response.json()
    // if (response.status < 200 || response.status >= 300) {
    //   return rejectWithValue(data)
    // }
    // return data
    return [];
  },
);

export interface LampControlState {
  lamps: Lamp[];
}
const initialState: LampControlState = {
  lamps: [],
};

export const lampControlSlice = createSlice({
  name: 'lampControlSlice',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {} = lampControlSlice.actions;

export default lampControlSlice.reducer;
