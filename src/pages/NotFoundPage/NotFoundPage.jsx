import { Link } from "react-router-dom";
import { homeDirectory } from "../../util/routing";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-secondary">
      <h1 className="text-3xl font-bold font-display text-gray">We could not find this page :(</h1>
      <Link
        to={`${homeDirectory}/home`}
        className="bg-primary hover:bg-primary-dark text-gray-100 font-bold py-2 px-4 mt-8 text-gray rounded-lg font-body"
      >
        Go back to home page
      </Link>
    </div>
  );
}

export default NotFoundPage
