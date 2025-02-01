// src/components/ui/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-impacto-purple border-t-transparent"></div>
    </div>
  );
}