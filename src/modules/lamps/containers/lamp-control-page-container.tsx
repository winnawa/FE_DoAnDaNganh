import styled from 'styled-components';
import { LampComponent } from '../components';
import React, { useEffect } from 'react';
import { AddItemComponent, devices } from '../../../common';
import { Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import {
  getLamps,
  RootState,
  updateSingleLamp,
  UpdateSingleLampDetailForm,
  useAppDispatch,
} from '../../../redux';
import { toast, ToastContainer } from 'react-toastify';

const LampComponentsFlex = styled.div`
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

export const LampControlPageContainer: React.FC = () => {
  // TODO: dispatch action, get data from store
  const lampList = useSelector((state: RootState) => state.lampControl.lamps);
  const loadingStatus = useSelector(
    (state: RootState) => state.lampControl.loadingStatus,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLamps());
  }, []);

  const saveChangeSubmission = async (form: UpdateSingleLampDetailForm) => {
    try {
      dispatch(updateSingleLamp(form));
    } catch (error) {
      toast.error((error as any).message);
    }
  };

  const toggleLampHandler = async (form: UpdateSingleLampDetailForm) => {
    try {
      // TODO: dispatch status change action
      dispatch(updateSingleLamp(form));
    } catch (error) {
      toast.error((error as any).message);
    }
  };

  const dumpLampComponents = lampList.map((lamp) => (
    <LampComponent
      toggleLampHandler={toggleLampHandler}
      saveChangeSubmission={saveChangeSubmission}
      key={lamp.id}
      id={lamp.id}
      status={lamp.status}
      name={lamp.name ?? 'Default Name'}
      imageUrl={
        lamp?.imageUrl
          ? lamp.imageUrl
          : 'https://cdn.ambientedirect.com/chameleon/mediapool/thumbs/e/14/Artemide_Choose-Tavolo-Tischleuchte_800x800-ID1244137-a109b53693cae4c9af9e6a800a919360.jpg'
      }
    />
  ));

  return (
    <>
      {loadingStatus === 'Pending' ? (
        <Skeleton />
      ) : (
        <>
          <ToastContainer />
          <LampComponentsFlex>
            {dumpLampComponents}
            <AddItemComponent itemType="lamp" />
          </LampComponentsFlex>
        </>
      )}
    </>
  );
};
