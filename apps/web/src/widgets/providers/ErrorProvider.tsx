'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error!}
            reset={() => this.setState({ hasError: false, error: undefined })}
          />
        );
      }

      return (
        <div className='flex flex-col items-center justify-center p-8'>
          <h2 className='mb-4 text-xl font-bold text-red-600'>
            오류가 발생했습니다
          </h2>
          <details className='text-sm text-gray-600'>
            <summary className='cursor-pointer'>에러 세부사항 보기</summary>
            <pre className='mt-2 overflow-auto rounded bg-gray-100 p-4 text-xs'>
              {this.state.error?.stack}
            </pre>
          </details>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          >
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
