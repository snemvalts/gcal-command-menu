import React, {FunctionComponent, useEffect, useState} from 'react';
import styled from 'styled-components';
import Input from '../input/Input';
import MenuElement, { MenuItem } from './MenuElement';
import useActions from "../../hooks/useActions";
import useNLPParser from "../../hooks/useNLPParse";

const MenuContainer = styled.div`
  width: 500px;
  border: 1px solid #e3e3e3;
  background: linear-gradient(180deg, rgba(250,250,250,1) 0%, rgba(245,245,245,1) 100%);
  border-radius: 5px;
  padding: 25px 15px 15px;
  
  @media screen and (max-device-width: 600px) {
    width: 100%;
  }
`;

const MenuItemsContainer = styled.div`
  margin-top: 20px;
  &:empty {
    margin-top: 10px;
  }
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
  {
    title: 'Go to',
    commandTitleEmphasis: '[date]',
    action: 'goto_date',
  },
];

const Menu: FunctionComponent<{
  onHideMenu: () => void
}> = (props) => {
  const [activeMenuItem, setActiveMenuItem] = useState<number>(0);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [searchText, setSearchText] = useState<string>('');
  const { performAction } = useActions();
  const { parseDate } = useNLPParser();

  useEffect(() => {
    const searchTerm = searchText.toLowerCase().trim();
    // String.includes is fancy and new, but indexOf is still faster
    setMenuItems(initialMenuItems.filter(
      menuItem => menuItem.title.toLowerCase().indexOf(searchTerm) > -1 || (menuItem.action === 'goto_date' && searchTerm.indexOf('go to ') === 0)
    ));
  }, [searchText]);

  const searchKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // we don't want global keyboard shortcuts to trigger when we type T for example
    e.stopPropagation();
    if (e.key === 'Enter') {
      if (menuItems.length > 0){
        performActionForElement(activeMenuItem);
      }
    } else if (e.key === 'ArrowDown') {
      // math.min with index of last element so the index stops moving at the end
      setActiveMenuItem(activeMenuItem => Math.min(activeMenuItem + 1, menuItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      // math.max with 0 so the index stops moving at the beginning
      setActiveMenuItem(activeMenuItem => Math.max(activeMenuItem - 1, 0));
    } else if (e.key === 'Escape') {
      props.onHideMenu();
    }
  };

  const performActionForElement = (idx: number) => {
    const actionToPerform = menuItems[idx].action;

    if (actionToPerform !== 'goto_date') {
      performAction(menuItems[idx].action);
    } else {
      const dateString = searchText.toLowerCase().replace('go to', '');
      const parsed = parseDate(dateString);
      if (parsed) {
        performAction(menuItems[idx].action, parsed);
      }
    }
    props.onHideMenu();
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
             onBlur={() => props.onHideMenu()}
             spellCheck={'false'}
             autoComplete={'false'}
      />
      <MenuItemsContainer>
        {menuItems.map((item, idx) => (
          <MenuElement item={item}
                       key={item.action}
                       titleEmphasis={item.commandTitleEmphasis}
                       active={idx === activeMenuItem} onItemClicked={() => performActionForElement(idx)}/>
        ))}
      </MenuItemsContainer>
    </MenuContainer>
  )
}
export default Menu;
