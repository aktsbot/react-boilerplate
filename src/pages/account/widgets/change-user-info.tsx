export const ChangeUserInfo = () => {
  return (
    <div className="card bg-neutral text-neutral-content shadow-xl flex-1">
      <div className="card-body">
        <h2 className="card-title">Change info</h2>
        <p>Changing your email will log you out.</p>
        <div className="card-actions">
          <button className="btn btn-primary">Update info</button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserInfo;
