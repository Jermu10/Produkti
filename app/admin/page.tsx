import { getDrinks } from "./actions/drink.actions";
import AdminDrinkList from "./components/AdminDrinkList";

const AdminPage = async () => {
  const drinks = await getDrinks();

  return (
    <div>
      <AdminDrinkList drinks={drinks} />
    </div>
  );
};

export default AdminPage;
