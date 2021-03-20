import React, { FC, useState } from 'react';
import { Icon } from '~components/icon';
import { Popover } from '~components/popover';
import { Tooltip } from '~components/tooltip';
import { ToolItem } from './tool';

const defaultColors = [
  '#ffffff',
  '#9b9b9b',
  '#4a4a4a',
  '#000000',
  '#d0021b',
  '#f5a623',
  '#f8e71c',
  '#7ed321',
  '#9013fe',
  '#50e3c2',
  '#0073ff',
  '#ffc8e2',
];

export interface ColorsProps extends ToolItem {
  colors?: string[];
  activeColor?: string;
  onClick?: (value: string) => void;
}

export const Colors: FC<ColorsProps> = ({
  label,
  colors = defaultColors,
  activeColor = '#7ed321',
  onClick,
}) => {
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
  const handleClick = (color: string) => {
    setPopoverVisible(!popoverVisible);
    onClick && onClick(color);
  };
  const content = (
    <div className={`expand-tools colors`}>
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => handleClick(color)}
          className="expand-tool color"
          style={{
            borderColor: activeColor === color ? color : undefined,
          }}>
          <div className="circle" style={{ backgroundColor: color }} />
        </div>
      ))}
    </div>
  );
  return (
      <Popover
        visible={popoverVisible}
        onVisibleChange={(visible) => setPopoverVisible(visible)}
        overlayClassName="expand-tools-popover"
        trigger="click"
        content={content}
        placement="right">
        <Icon type="color" color={activeColor} />
      </Popover>
  );
};