import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import { Action } from '../../hooks/useActions';

const MenuItemContainer = styled.div`
  padding: 10px;
  margin: 5px;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid transparent;
  transition: all 0.2s ease;

  &.active {
    border: 1px solid #f3f3f3;
    background: white;
  }
`;

const ShortcutKeyContainer = styled.div`
  line-height: 36px;
  background: #e7e7e7;
  color: #343434;
  font-weight: bold;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const MenuElement: FunctionComponent<{item: MenuItem, active: boolean, onItemClicked: () => void, titleEmphasis?: string}> = (props) => {
  return (
    <MenuItemContainer className={`${props.active? 'active' : ''}`} onClick={(e) => {
      e.stopPropagation();
      props.onItemClicked();
    }}>
      <span>{props.item.title} {props.titleEmphasis ? (<b>{props.titleEmphasis}</b>) : null}</span>
      {props.item.keyShortcut ? (<ShortcutKeyContainer>{props.item.keyShortcut}</ShortcutKeyContainer>) : null}
    </MenuItemContainer>
  )
}


export interface MenuItem {
  title: string;
  action: Action;
  keyShortcut?: string;
  commandTitleEmphasis?: string;
}

export default MenuElement;
