import { useState } from 'react';

function AdminApp() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>학생회 포털</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
    </div>
  );
}

export default AdminApp;
