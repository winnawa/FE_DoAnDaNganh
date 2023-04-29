import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TEMP_FEED_ENDPOINT } from '../connection';
import { Thermo } from '../modules/thermos/domains';

const config = {
  headers:{
    "X-AIO-Key": process.env.REACT_APP_ADAFRUIT_X_AIO_Key,
  }
};

export const getThermos = createAsyncThunk<Thermo[],void>(
  'thermos/getThermos',
  async (_,{rejectWithValue}) => {
      const response = await axios.get(
        `${TEMP_FEED_ENDPOINT}`,config
      );
      console.log(response)
    // const data = await response.json()
    // if (response.status < 200 || response.status >= 300) {
    //   return rejectWithValue(data)
    // }
    // return data
    return [];
  },
);

export interface ThermoControlState {
  thermos: Thermo[];
}
const initialState: ThermoControlState = {
  thermos: [],
};

export const thermoControlSlice = createSlice({
  name: 'thermoControlSlice',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {} = lampControlSlice.actions;

export default thermoControlSlice.reducer;
