import React, { Component, ErrorInfo } from 'react';
import { ApiError } from '@/types/error';

interface Props {
  children: React.ReactNode;
  onError: (error: ApiError | Error) => void;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.props.onError(error);
  }

  public render() {
    if (this.state.hasError) {
      return null; // Toast will be shown by ErrorContext
    }

    return this.props.children;
  }
}
