export default function ListingToast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium shadow-lg">
      {message}
    </div>
  );
}
