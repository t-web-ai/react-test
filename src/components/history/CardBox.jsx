import DailyCardBox from "./DailyCardBox";

function CardBox({ user, filter, selector }) {
  return (
    <div className="border border-2 my-2 p-3 rounded fs-5">
      <div>Date : {selector}</div>
      <div>Name : {user.name}</div>
      <div>Address : {user.address}</div>
      <div>
        {selector}
        <br />
        Total Item : {user?.[`${filter}QuantityTotals`]?.[selector]}
      </div>
      <div>Total Price : {user?.[`${filter}Totals`]?.[selector]}</div>

      {filter == "daily" && (
        <div>
          {Object.entries(user.dailyStatus[selector] || {}).map(
            ([id, dailyItem]) => (
              <DailyCardBox id={id} dailyItem={dailyItem} key={id} />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default CardBox;
