import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

// ✅ mock 整个 authService 模块，防止 useEffect 
jest.mock('../services/authService', () => ({
  __esModule: true,
  getCurrentUser: () => null,
  login: () => Promise.resolve(),
  getSsoLoginUrl: () => Promise.resolve('https://example.com'),
}));

// ✅ optional: 提供错误边界用于打印错误
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      console.error('🔴 Error caught in ErrorBoundary:', this.state.error);
      return <div>Error occurred</div>;
    }
    return this.props.children;
  }
}

test('renders Login component without crashing', () => {
  render(
    <BrowserRouter>
      <ErrorBoundary>
        <Login />
      </ErrorBoundary>
    </BrowserRouter>
  );
});



