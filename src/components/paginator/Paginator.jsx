import Button from "./Button";

function Paginator({ total, next, prev, page }) {
  const limit = import.meta.env.VITE_USER_PER_PAGE ?? 10;
  const totalPages = Math.ceil(total / limit);
  return (
    <div className="my-3">
      <div className="text-center text-muted fs-5 my-2">
        Showing page {page} of {totalPages}
      </div>
      <div className="d-flex justify-content-between">
        <Button label="Previous" action={prev} condition={!(page > 1)} />
        <Button label="Next" action={next} condition={!(page < totalPages)} />
      </div>
    </div>
  );
}

export default Paginator;
