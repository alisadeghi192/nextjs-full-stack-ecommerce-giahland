import CartPageItem from "@/components/features/cart/CartPageItem";
import CartStickyPrice from "@/components/features/cart/CartStickyPrice";
import CartSummary from "@/components/features/cart/CartSummary";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getCartAction } from "@/features/cart/actions/getCart.actions";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const { user } = await getMeAction();
  if (!user) {
    redirect("/login-register");
  }
  const { items, success, totalItems, totalPrice } = await getCartAction();

  if (!success || totalItems === 0) {
    return (
      <section className="container [&+*]:pb-10!">
        <Breadcrumb />
        <div className="py-12 text-center">
          <h2 className="max-xs:text-xl text-2xl font-bold">
            سبد خرید شما خالی است
          </h2>
          <p className="text-neutral9 dark:text-text-dark max-xs:text-sm mt-2">
            برای مشاهده محصولات به فروشگاه مراجعه کنید.
          </p>
          <PrimaryButton
            href="/products"
            className="max-xs:mt-4 mx-auto mt-6 h-12 w-48 text-lg"
          >
            مشاهده محصولات
          </PrimaryButton>
        </div>
      </section>
    );
  }

  return (
    <main className="container">
      <Breadcrumb />
      <h1 className="mb-4 text-lg font-bold max-md:text-base">سبد خرید شما</h1>
      <div className="relative grid grid-cols-3 gap-8 max-lg:grid-cols-1">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartPageItem key={item.product._id} item={item} />
          ))}
        </div>

        <div className="sticky top-19 h-fit max-lg:col-span-1 max-md:block">
          <CartSummary totalPrice={totalPrice} totalItems={totalItems} />
          <div>
            <PrimaryButton
              href="/checkout"
              className="mt-4 h-12 w-full text-lg max-sm:hidden"
            >
              تکمیل سفارش
            </PrimaryButton>
            <CartStickyPrice buttonText="تکمیل سفارش" price={totalPrice} variant="cart"/>
          </div>
        </div>
      </div>
    </main>
  );
}
