import { useContext, useState } from "react";
import CardHeader from "./CardBox/CardHeader";
import CardItem from "./CardBox/CardItem";
import DailyCardBox from "./DailyCardBox";
import DailyItem from "./DailyCardBox/DailyItem";
import { HistoryContext } from "../context/HistoryContext";

function CardBox({ user: data, filter, selector }) {
  // history context
  const [user, setUser] = useState(data || {});
  const { onShow } = useContext(HistoryContext);

  // Format date nicely
  const options = { year: "numeric" };
  if (selector.split("-").length >= 2) options.month = "long";
  if (selector.split("-").length >= 3) options.day = "numeric";
  const formatted = new Date(selector).toLocaleDateString("en-US", options);

  const totalItems = user?.[`${filter}QuantityTotals`]?.[selector] ?? 0;
  const totalPrice = user?.[`${filter}Totals`]?.[selector] ?? 0;
  const dailyStatus = user?.dailyStatus?.[selector] || {};

  const onDelete = async (id) => {
    onShow({ show: true, id, user, setUser, selector });
  };

  if (!user) return null;

  return (
    <div className="card border-0 shadow-lg my-3 rounded-3 overflow-hidden">
      {/* Header */}
      <CardHeader user={user} formatted={formatted} />

      {/* Totals */}
      <div className="card-body bg-light-subtle">
        <div className="row text-center g-3">
          <CardItem
            icon="bi bi-box-seam text-warning"
            value={totalItems}
            label="Total Items"
            labelStyle="text-body"
          />
          <CardItem
            icon="bi bi-cash-coin text-success"
            value={totalPrice}
            labelStyle="text-body"
            label="Total Price (MMK)"
          />
        </div>
      </div>

      {/* Daily Breakdown (only for daily filter) */}
      {filter === "daily" && Object.keys(dailyStatus).length > 0 && (
        <div className="p-3 bg-body-tertiary">
          <DailyItem
            icon="bi bi-list-ul text-secondary"
            labelStyle="text-secondary"
          >
            Daily Breakdown
          </DailyItem>

          {Object.entries(dailyStatus).map(([id, dailyItem]) => (
            <DailyCardBox
              key={id}
              id={id}
              dailyItem={dailyItem}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardBox;
