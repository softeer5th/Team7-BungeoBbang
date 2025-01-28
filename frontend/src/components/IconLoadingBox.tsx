export const IconLoadingBox: React.FC<{ width: string; height: string}> = ({ width, height }) => (
    <div
      style={{
        width,
        height,
        backgroundColor: '#f0f0f0', // 로딩 화면 배경색
        borderRadius: '50%', // 아이콘 모양에 맞춤
      }}
    />
  );