import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Lamp, LampStatus } from '../modules/lamps';
import axios from 'axios';
import { BACKEND_ROOT_ENDPOINT, LAMP_FEED_ENDPOINT } from '../connection';
import { RootState } from './store';

export const getLamps = createAsyncThunk<Lamp[], void>(
  'lamps/getLamps',
  async (name, { rejectWithValue }) => {
    const listObj: Lamp[] = [];
    const response = await axios.get(`${BACKEND_ROOT_ENDPOINT}/lamps`);
    if (response.data) {
      const lamps = response.data.data;
      for (const element of lamps) {
        const lamp: Lamp = {
          id: element.lamp_id,
          status: element.status,
          name: element.name,
          imageUrl: element.imageUrl,
        };
        listObj.push(lamp);
      }
      return listObj;
    }

    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response.data.message ?? 'error');
    }
    return [];
  },
);

export interface UpdateSingleLampDetailForm {
  lamp_id: string;
  name?: string;
  imageUrl?: string;
  status?: LampStatus;
}
export const updateSingleLamp = createAsyncThunk<
  UpdateSingleLampDetailForm,
  UpdateSingleLampDetailForm,
  { state: RootState }
>('lamps/updateLamp', async (updateLampDto, { rejectWithValue, getState }) => {
  const response = await axios.patch(
    `${BACKEND_ROOT_ENDPOINT}/lamps/${updateLampDto.lamp_id}`,
    updateLampDto,
  );

  const state = getState();
  const stateOfLamps = state.lampControl.lamps;

  if (response.status < 200 || response.status >= 300) {
    throw Error(response.data.message ?? 'error');
    return rejectWithValue(response.data.message ?? 'error');
  }

  return updateLampDto;
});

export const updateAllLampsValue = createAsyncThunk<void, string>(
  'lamps/updateLamps',
  async (values, { rejectWithValue }) => {
    const response = await axios.post(`${LAMP_FEED_ENDPOINT}`, {
      value: values,
    });

    if (response.status < 200 || response.status >= 300) {
      throw Error(response.data.message ?? 'error');
      return rejectWithValue(response.data.message ?? 'error');
    }
    return;
  },
);

type LoadingStatus = 'Idle' | 'Pending' | 'Fulfilled';
export interface LampControlState {
  lamps: Lamp[];
  loadingStatus: LoadingStatus;
}
const initialState: LampControlState = {
  lamps: [],
  loadingStatus: 'Pending',
};

export const lampControlSlice = createSlice({
  name: 'lampControlSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLamps.fulfilled, (state, action) => {
      console.log(action.payload, '92 get thermos fulfilled');
      state.lamps = action.payload;
      state.loadingStatus = 'Fulfilled';
    });
    builder.addCase(getLamps.pending, (state) => {
      state.loadingStatus = 'Pending';
    });

    builder.addCase(updateSingleLamp.fulfilled, (state, action) => {
      const lampPosition = parseInt(action.payload.lamp_id) - 1;
      if (action.payload.name) {
        state.lamps[lampPosition].name = action.payload.name;
      }
      if (action.payload.imageUrl) {
        state.lamps[lampPosition].imageUrl = action.payload.imageUrl;
      }
      if (action.payload.status) {
        state.lamps[lampPosition].status = action.payload.status;
      }
      state.loadingStatus = 'Fulfilled';
    });
    builder.addCase(updateSingleLamp.pending, (state) => {
      state.loadingStatus = 'Pending';
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = lampControlSlice.actions;

export default lampControlSlice.reducer;
