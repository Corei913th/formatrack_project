interface IApiLoadingProps {
  title: string;
}

const ApiLoading = ({ title }: IApiLoadingProps) => {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-[3px] border-primary"></div>
        <p className="mt-8 text-gray-700">Chargement des {title} ...</p>
      </div>
    </div>
  );
};

export default ApiLoading;
