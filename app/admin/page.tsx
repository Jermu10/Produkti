import Header from "@/components/Header";
import { getDrinks } from "../actions/drink.actions";

const AdminPage = async () => {
  const drinks = await getDrinks();

  return <Header text="Terveppä terve" />;
};

export default AdminPage;
