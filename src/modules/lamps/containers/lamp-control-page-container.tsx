import styled from 'styled-components';
import { LampComponent } from '../components';
import { Lamp } from '../domains';
import React from 'react';
import { AddItemComponent, devices } from '../../../common';

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

const mockReturnValues: Lamp[] = [
  {
    id: '1',
    status: 'on',
    imageUrl:
      'https://www.westelm.co.uk/site/WE/Product%20Images/wood-ceramic-table-lamp-medium-13-w3628-202206-0016-wood-ceramic-table-lamp-medium-z.jpg?resizeid=61&resizeh=450&resizew=450',
  },
  {
    id: '2',
    status: 'on',
    imageUrl:
      'https://images.dunelm.com/30674209.jpg?$standardplayerdefault$&img404=noimagedefault',
  },
  {
    id: '3',
    status: 'off',
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_9e2cb615-6ea4-4001-942b-2042251b2356',
  },
];

export const LampControlPageContainer: React.FC = () => {
  // TODO: dispatch action, get data from store
  const dumpLampComponents = mockReturnValues.map((lamp) => (
    <LampComponent
      key={lamp.id}
      id={lamp.id}
      status={lamp.status}
      imageUrl={
        lamp?.imageUrl
          ? lamp.imageUrl
          : 'https://cdn.ambientedirect.com/chameleon/mediapool/thumbs/e/14/Artemide_Choose-Tavolo-Tischleuchte_800x800-ID1244137-a109b53693cae4c9af9e6a800a919360.jpg'
      }
    />
  ));

  return (
    <>
      <LampComponentsFlex>
        {dumpLampComponents}
        <AddItemComponent itemType="lamp" />
      </LampComponentsFlex>
    </>
  );
};
