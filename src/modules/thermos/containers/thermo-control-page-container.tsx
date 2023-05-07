import styled from 'styled-components';
import { Thermo } from '../domains';
import React, { useEffect, useState } from 'react';
import { AddItemComponent, devices } from '../../../common';
import { ThermoComponent } from '../components';
import {
  getThermos,
  RootState,
  UpdateThermoDetailForm,
  updateThermos,
  useAppDispatch,
} from '../../../redux';
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import * as io from 'socket.io-client';
import { BACKEND_ROOT_ENDPOINT } from '../../../connection';

const socket = io.connect(BACKEND_ROOT_ENDPOINT);

const ThermoComponentsFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  @media ${devices.tablet} {
    gap: 20px;
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

export const ThermoControlPageContainer: React.FC = () => {
  const currentTemp = useSelector(
    (state: RootState) => state.thermoControl.currentTemp,
  );
  const [temperature, setTemperature] = useState(currentTemp);

  // TODO: dispatch action, get data from store
  const thermoList = useSelector(
    (state: RootState) => state.thermoControl.thermos,
  );

  const loadingStatus = useSelector(
    (state: RootState) => state.thermoControl.loadingStatus,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getThermos());
  }, []);

  useEffect(() => {
    setTemperature(currentTemp);
  }, [currentTemp]);

  useEffect(() => {
    socket.on('new_temp', (data) => {
      console.log(data.message, ' data received');
      setTemperature(data.message);
    });
  }, [socket]);

  const saveChangeSubmission = async (form: UpdateThermoDetailForm) => {
    try {
      dispatch(updateThermos(form));
    } catch (error) {
      toast.error('error');
    }
  };

  const dumpThermoComponents = thermoList.map((thermo) => (
    <ThermoComponent
      saveChangeSubmission={saveChangeSubmission}
      key={thermo.id}
      id={thermo.id}
      data={temperature}
      name={thermo.name ?? 'Default Name'}
      imageUrl={thermo?.imageUrl}
    />
  ));

  return (
    <>
      {loadingStatus === 'Pending' ? (
        <Skeleton />
      ) : (
        <>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ThermoComponentsFlex>
            {dumpThermoComponents}
            <AddItemComponent itemType="thermo sensor" />
          </ThermoComponentsFlex>
        </>
      )}
    </>
  );
};
