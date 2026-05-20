import Header from '../layout/Header';

export default function Loading({ message = "Đang tải dữ liệu..." }) {
  return (
    <>
      <Header />
      <main className="grid min-h-[70vh] place-items-center px-6">
        <div className="text-center">
          <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-zinc-200 border-t-brand"></div>
          <p className="mt-4 text-sm font-medium text-zinc-500">{message}</p>
        </div>
      </main>
    </>
  );
}
