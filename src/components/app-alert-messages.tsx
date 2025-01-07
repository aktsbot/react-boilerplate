export const AppAlertMessages = () => {
  return (
    <div className="toast">
      <div role="alert" className="alert">
        <span>12 unread messages. Tap to see.</span>
      </div>
      <div role="alert" className="alert alert-success">
        <span>Your purchase has been confirmed!</span>
      </div>
      <div role="alert" className="alert alert-error">
        <span>Uh oh! an error</span>
      </div>
    </div>
  );
};

export default AppAlertMessages;
