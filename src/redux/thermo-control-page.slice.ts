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
    
      if (response.data){
        const data = response.data
        if (data?.value){
          if (typeof(data.value) === 'string'){
            const thermoObj : Thermo = {
              id:data.id, 
              data:data.value, 
              imageUrl:'https://bizweb.dktcdn.net/thumb/grande/100/409/770/files/ung-dung-may-do-do-am-trong-gia-dinh.jpg?v=1615278393854'
            }
            // console.log(data)
            return [thermoObj]
          }
          return data.value
        }
      }

    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response.data.message?? 'error')
    }
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
  extraReducers: (builder) => {
    builder.addCase(getThermos.fulfilled, (state, action) => {
      state.thermos = action.payload
    })
  },
});

// Action creators are generated for each case reducer function
// export const {} = lampControlSlice.actions;

export default thermoControlSlice.reducer;
