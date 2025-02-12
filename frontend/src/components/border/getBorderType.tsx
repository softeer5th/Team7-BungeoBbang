import { BorderProps, BorderType } from './BorderProps';

export const getBorderStyle = ({
  borderWidth = '1px',
  borderColor = '#000000',
  borderType = BorderType.ALL,
}: BorderProps): string => {
  switch (borderType) {
    case BorderType.LEFT:
      return `
        border-top: none;
        border-right: none;
        border-bottom: none;
        border-left: ${borderWidth} solid ${borderColor};
      `;
    case BorderType.RIGHT:
      return `
        border-top: none;
        border-right: ${borderWidth} solid ${borderColor};
        border-bottom: none;
        border-left: none;
      `;
    case BorderType.TOP:
      return `
        border-top: ${borderWidth} solid ${borderColor};
        border-right: none;
        border-bottom: none;
        border-left: none;
      `;
    case BorderType.BOTTOM:
      return `
        border-top: none;
        border-right: none;
        border-bottom: ${borderWidth} solid ${borderColor};
        border-left: none;
      `;
    case BorderType.VERTICAL:
      return `
        border-top: none;
        border-right: ${borderWidth} solid ${borderColor};
        border-bottom: none;
        border-left: ${borderWidth} solid ${borderColor};
      `;
    case BorderType.HORIZONTAL:
      return `
        border-top: ${borderWidth} solid ${borderColor};
        border-right: none;
        border-bottom: ${borderWidth} solid ${borderColor};
        border-left: none;
      `;
    case BorderType.ALL:
      return `
        border: ${borderWidth} solid ${borderColor};
      `;
    default:
      return 'border: none;';
  }
};

export const getDefaultBorderStyle = (): BorderProps => ({
  borderWidth: '1px',
  borderColor: '#F4F4F4',
  selectedBorderColor: '#1F87FF',
  errorBorderColor: '#FF4B4B',
  disabledBorderColor: '#F4F4F4',
  borderRadius: '0px',
  borderType: BorderType.ALL,
});
