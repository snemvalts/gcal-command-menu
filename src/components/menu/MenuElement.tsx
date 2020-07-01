import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

const MenuItemContainer = styled.div`
  padding: 10px 0;
  
`;

const MenuElement: FunctionComponent<{item: MenuItem}> = (props) => {
  return (
    <MenuItemContainer>
      {props.item.title}
    </MenuItemContainer>
  )
}


export interface MenuItem {
  active?: boolean;
  title: string;
  // technically it's required in current scope (all bottom 3 elements have a key)
  // but makes sense to have without cause it's not strictly needed
  keyShortcut?: string;
}

export default MenuElement;
