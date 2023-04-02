import { MessageOutlined } from '@ant-design/icons';
import {
  Badge,
  BadgeProps,
  Dropdown,
  DropdownProps,
  MenuProps,
  Space,
} from 'antd';

import React from 'react';
import styled from 'styled-components';

const CustomizedDropdown: React.FC<DropdownProps> = styled(Dropdown)`
  &:hover {
    cursor: pointer;
  }
`;
const CustomizedBadge: React.FC<BadgeProps> = styled(Badge)`
  sup.ant-scroll-number.ant-badge-count.ant-badge-count-sm.ant-badge-multiple-words {
    right: -10px;
  }
`;

export const LogHistoryComponent = () => {
  const items: MenuProps['items'] = [
    {
      label: 'You have subscribed for a new lamp at 09am 20/12/2022',
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: 'You have subscribed for a new lamp at 12am 20/12/2023',
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: 'You have subscribed for a new lamp at 12am 20/12/2024',
      key: '3',
    },
  ];

  return (
    <div style={{ position: 'relative', width: '30px' }}>
      <CustomizedDropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <CustomizedBadge count={99} size={'small'}>
              <MessageOutlined style={{ width: '14px', height: '14px' }} />
            </CustomizedBadge>
            {/* <div style={{position:'absolute', right:'2px', top:'-10px'}}>
              <CustomizedText color='red'>99</CustomizedText>
            </div> */}
          </Space>
        </a>
      </CustomizedDropdown>
    </div>
  );
};
