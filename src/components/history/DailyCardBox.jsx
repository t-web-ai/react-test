function DailyCardBox({ id, dailyItem }) {
  return (
    <div
      key={id}
      className="bg-secondary-subtle text-body p-3 fs-3 rounded my-2"
    >
      <div className="small">ID : {id}</div>
      <div className="small">Type : {dailyItem.type}</div>
      <div className="small">Quantity : {dailyItem.quantity}</div>
      <div className="small">Price : {dailyItem.price}</div>
      <div className="small">Total : {dailyItem.total}</div>
    </div>
  );
}

export default DailyCardBox;
