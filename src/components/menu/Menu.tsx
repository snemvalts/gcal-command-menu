import React, {FunctionComponent, useEffect, useState} from 'react';
import styled from 'styled-components';
import Input from '../input/Input';
import MenuElement, { MenuItem } from './MenuElement';
import useActions from "../../hooks/useActions";

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
    action: 'today',
  },
  {
    title: 'Go to previous period',
    keyShortcut: '⭠',
    action: 'previous_period',
  },
  {
    title: 'Go to next period',
    keyShortcut: '⭢',
    action: 'next_period',
  },
];

const Menu: FunctionComponent = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<number>(0);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [searchText, setSearchText] = useState<string>('');
  const { performAction } = useActions();

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
    if (e.key === 'Enter') {
      // if enter is pressed and only one menuitem is available, trigger that action
      performAction(menuItems[activeMenuItem].action);
    } else if (e.key === 'ArrowDown') {
      // math.min so the index stops moving at the end
      setActiveMenuItem(activeMenuItem => Math.min(activeMenuItem + 1, menuItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      // math.min so the index stops moving at the beginning
      setActiveMenuItem(activeMenuItem => Math.max(activeMenuItem - 1, 0));
    } else if (e.key === 'Escape') {

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
          <MenuElement item={item} key={item.title} active={idx === activeMenuItem}/>
        ))}
      </MenuItemsContainer>
    </MenuContainer>
  )
}
export default Menu;
