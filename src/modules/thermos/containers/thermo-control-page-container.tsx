import styled from 'styled-components';
import { Thermo } from '../domains';
import React from 'react';
import { AddItemComponent, devices } from '../../../common';
import { ThermoComponent } from '../components';
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

const mockReturnValues: Thermo[] = [
  {
    id: '1',
    data: '25',
    name: 'Living Room',
    // imageUrl:
    //   'https://www.westelm.co.uk/site/WE/Product%20Images/wood-ceramic-table-lamp-medium-13-w3628-202206-0016-wood-ceramic-table-lamp-medium-z.jpg?resizeid=61&resizeh=450&resizew=450',
  },
  {
    id: '2',
    data: '22',
    name: 'Bed Room',
    // imageUrl:
    //   'https://images.dunelm.com/30674209.jpg?$standardplayerdefault$&img404=noimagedefault',
  },
  {
    id: '3',
    data: '25',
    name: 'Kitchen',
    // imageUrl:
    //   'https://target.scene7.com/is/image/Target/GUEST_9e2cb615-6ea4-4001-942b-2042251b2356',
  },
];

export const ThermoControlPageContainer: React.FC = () => {
  // TODO: dispatch action, get data from store
  const dumpThermoComponents = mockReturnValues.map((thermo) => (
    <ThermoComponent
      key={thermo.id}
      id={thermo.id}
      data={thermo.data}
      imageUrl={thermo?.imageUrl}
    />
  ));

  return (
    <>
      <ThermoComponentsFlex>
        {dumpThermoComponents}
        <AddItemComponent itemType="thermo censor" />
      </ThermoComponentsFlex>
    </>
  );
};
