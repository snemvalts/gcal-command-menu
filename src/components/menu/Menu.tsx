import React, {FunctionComponent, useEffect, useState} from 'react';
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


const initialMenuItems: MenuItem[] = [
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
];

const Menu: FunctionComponent = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<number>(0);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [searchText, setSearchText] = useState<string>('');


  useEffect(() => {
    const searchTerm = searchText.toLowerCase();
    // String.includes is fancy and new, but indexOf is still faster
    setMenuItems(initialMenuItems.filter(
      menuItem => menuItem.title.toLowerCase().indexOf(searchTerm) > -1
    ));
  }, [searchText]);

  const searchKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // we don't want global keyboard shortcuts to trigger when we type T for example
    e.stopPropagation();
    if (e.key === 'ENTER') {
      // if enter is pressed and only one menuitem is available, trigger that action

    } else if (e.key === 'ArrowDown') {
      // math.min so the index stops moving at the end
      setActiveMenuItem(activeMenuItem => Math.min(activeMenuItem + 1, menuItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      // math.min so the index stops moving at the beginning
      setActiveMenuItem(activeMenuItem => Math.max(activeMenuItem - 1, 0));
    }
  };

  const searchOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setActiveMenuItem(0);
  };

  return (
    <MenuContainer>
      <Input autoFocus={true}
             value={searchText}
             onChange={(e) => searchOnChangeHandler(e)}
             onKeyDown={(e) => searchKeyDownHandler(e)}
             />
      <MenuItemsContainer>
        {menuItems.map((item, idx) => (
          // title for key is very kind of ehhh, i'd much rather have a normal ID here
          <MenuElement item={item} key={item.title} active={idx === activeMenuItem}/>
        ))}
      </MenuItemsContainer>
    </MenuContainer>
  )
}
export default Menu;
