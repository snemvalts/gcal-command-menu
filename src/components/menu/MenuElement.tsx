import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import { Action } from '../../hooks/useActions';

const MenuItemContainer = styled.div`
  padding: 10px 0 10px 10px;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
  &.active {
    background: white;
  }
`;

const MenuElement: FunctionComponent<{item: MenuItem, active: boolean, onItemClicked: () => void}> = (props) => {
  return (
    <MenuItemContainer className={`${props.active? 'active' : ''}`} onClick={(e) => {
      e.stopPropagation();
      props.onItemClicked();
    }}>
      {props.item.title}
    </MenuItemContainer>
  )
}


export interface MenuItem {
  title: string;
  action: Action;
  // technically it's required in current scope (all bottom 3 elements have a key)
  // but makes sense to have without cause it's not strictly needed
  keyShortcut?: string;
}

export default MenuElement;
