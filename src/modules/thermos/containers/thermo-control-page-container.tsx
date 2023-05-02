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
import { toast } from 'react-toastify';
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
      data={thermo.data}
      name={thermo.name ?? 'Default Name'}
      imageUrl={thermo?.imageUrl}
    />
  ));

  return (
    <>
      {loadingStatus === 'Pending' ? (
        <Skeleton />
      ) : (
        <ThermoComponentsFlex>
          {dumpThermoComponents}
          <AddItemComponent itemType="thermo censor" />
        </ThermoComponentsFlex>
      )}
    </>
  );
};
