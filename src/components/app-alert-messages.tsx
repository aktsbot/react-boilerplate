import useGeneralStore from "@/store/general";
import AlertMessage from "./alert-message";

export const AppAlertMessages = () => {
  const { alertMessages, removeAlertMessage } = useGeneralStore();

  if (alertMessages.length === 0) {
    return;
  }

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
