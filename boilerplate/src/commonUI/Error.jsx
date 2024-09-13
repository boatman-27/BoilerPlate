function Error({ message }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#343a40]">
      <h1>Something went wrong 😢</h1>
      <p>Error: {message}</p>
    </div>
  );
}

export default Error;
