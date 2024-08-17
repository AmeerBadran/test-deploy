function withPageMargin(WrappedComponent) {
  return function WithPageMargin(props) {
    return (
      <div className="max-w-[1300px] mx-auto">
        <WrappedComponent {...props} />
      </div>
    );
  };
}

export default withPageMargin;