import CheckoutPageClient from "@/components/features/checkout/CheckoutPageClient";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getCartAction } from "@/features/cart/actions/getCart.actions";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {

  const { user } = await getMeAction();
  if (!user) {
    redirect("/login-register");
  }

  const cartResult = await getCartAction();
  if (!cartResult.success || cartResult.items.length === 0) {
    redirect("/cart");
  }

  const userInfo = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    mobile: user.mobile || "",
    postalCode: (user as any).postalCode || "",
    address: (user as any).address || "",
  };

  const { items, totalItems, totalPrice } = cartResult;

  return (
    <main className="container">
      <Breadcrumb />
      <h1 className="mb-4 text-lg font-bold max-md:text-base">تسویه حساب</h1>

      <CheckoutPageClient
        items={items}
        totalItems={totalItems}
        totalPrice={totalPrice}
        initialUserInfo={userInfo}
      />
    </main>
  );
}