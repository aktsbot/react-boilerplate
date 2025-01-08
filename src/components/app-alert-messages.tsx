import useGeneralStore from "@/store/general";
import AlertMessage from "./alert-message";

export const AppAlertMessages = () => {
  const { alertMessages, removeAlertMessage } = useGeneralStore();

  if (alertMessages.length === 0) {
    return;
  }

  /*
  Note: In this case we are passing a onClose
  Without this, the messages will stay on the ui, which is annoying
  Build an auto close after x seconds to dismiss the messages
  */
  return (
    <div className="toast">
      {alertMessages.map((am) => (
        <AlertMessage
          message={am}
          key={am.id}
          onClose={() => removeAlertMessage(am.id)}
        />
      ))}
    </div>
  );
};

export default AppAlertMessages;
