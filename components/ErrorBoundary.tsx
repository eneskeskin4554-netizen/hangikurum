import React, { Component, ErrorInfo } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Küçük Bir Sorun Oluştu</h1>

          <p className="text-gray-400 mb-8 max-w-md">
            Sistemde geçici bir hata meydana geldi. Lütfen sayfayı yenileyin.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white text-black font-bold rounded-xl"
          >
            Sayfayı Yenile
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
