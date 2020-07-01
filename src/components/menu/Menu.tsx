import React, {FunctionComponent, useState} from 'react';
import styled from 'styled-components';
import Input from '../input/Input';
import MenuElement, { MenuItem } from './MenuElement';

const MenuContainer = styled.div`
  width: 500px;
  background: #f3f3f3;
  border-radius: 5px;
  padding: 25px;
`;

const MenuItemsContainer = styled.div`
  margin-top: 20px;
`;


const Menu: FunctionComponent = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      title: 'Go to today',
      keyShortcut: 'T',
    },
    {
      title: 'Go to previous period',
      keyShortcut: '⭠',
    },
    {
      title: 'Go to next period',
      keyShortcut: '⭢',
    },
  ]);

  return (
    <MenuContainer>
      <Input autoFocus={true}/>
      <MenuItemsContainer>
        {menuItems.map((item) => (
          // title for key is very kind of ehhh, i'd much rather have a normal ID here
          <MenuElement item={item} key={item.title}/>
        ))}
      </MenuItemsContainer>
    </MenuContainer>
  )
}
export default Menu;
