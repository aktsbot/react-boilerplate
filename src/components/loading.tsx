export const Loading = ({ routeLoader }: { routeLoader?: boolean }) => {
  if (!routeLoader) {
    return <span className="loading loading-spinner loading-xs"></span>;
  }

  return (
    <div className="flex mt-8 justify-center items-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </div>
  );
};

export default Loading;
