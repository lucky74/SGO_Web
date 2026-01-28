import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-slate-900/50 rounded-xl border border-slate-700">
          <div className="bg-red-500/10 p-4 rounded-full mb-4">
            <AlertTriangle className="text-red-400 w-12 h-12" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-slate-400 mb-6 max-w-md">
            We encountered an unexpected error while rendering this component. 
            {this.state.error?.message && <span className="block mt-2 text-xs font-mono bg-black/30 p-2 rounded text-red-300">{this.state.error.message}</span>}
          </p>
          <button
            onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
          >
            <RefreshCw size={16} />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
