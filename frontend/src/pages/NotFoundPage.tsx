import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">404 - Not Found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/tasks" className="text-blue-600 underline mt-4 inline-block">
        Go to Tasks
      </Link>
    </Layout>
  );
}
