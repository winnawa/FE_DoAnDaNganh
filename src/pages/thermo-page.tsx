import { PagePaddingWrapper } from '../common';
import React from 'react';
import { ThermoControlPageContainer } from '../modules/thermos/containers';

export const ThermoPage: React.FC = () => {
  return (
    <PagePaddingWrapper>
      <ThermoControlPageContainer />
    </PagePaddingWrapper>
  );
};
