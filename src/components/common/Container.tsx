export const Container = ({ children }: { children: JSX.Element }) => {
  return <div className="full flex justify-center pt-4 h-[100vh]">{children}</div>;
};
