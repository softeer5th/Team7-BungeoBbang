export enum BorderType {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
  ALL = 'all',
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export interface BorderProps {
  borderWidth?: string;
  borderColor?: string;
  selectedBorderColor?: string;
  errorBorderColor?: string;
  disabledBorderColor?: string;
  borderRadius?: string;
  borderType?: BorderType;
}
