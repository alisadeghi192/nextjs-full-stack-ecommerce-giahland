"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { createOrderAction } from "@/features/order/actions/createOrder.actions";
import CartStickyPrice from "../cart/CartStickyPrice";
import CheckoutDeliveryMethod from "./CheckoutDeliveryMethod";
import CheckoutItems from "./CheckoutItems";
import CheckoutUserInfo from "./CheckoutUserInfo";

interface CheckoutPageClientProps {
  items: any[];
  totalItems: number;
  totalPrice: number;
  initialUserInfo: {
    firstName: string;
    lastName: string;
    mobile: string;
    postalCode: string;
    address: string;
  };
}

export default function CheckoutPageClient({
  items,
  totalItems,
  totalPrice,
  initialUserInfo,
}: CheckoutPageClientProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [isUserInfoConfirmed, setIsUserInfoConfirmed] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<
    "pickup" | "courier" | null
  >(null);

  const shippingCost = deliveryMethod === "courier" ? 300000 : 0;
  const finalTotal = totalPrice + shippingCost;

  const handleUserInfoChange = () => {
    setIsUserInfoConfirmed(false);
  };

  useEffect(() => {
    setIsUserInfoConfirmed(false);
  }, [deliveryMethod]);

  const isPaymentEnabled = isUserInfoConfirmed && deliveryMethod !== null;

  const handleSubmitOrder = async () => {
    if (!isPaymentEnabled) return;

    setIsLoading(true);
    try {
      const result = await createOrderAction({
        deliveryMethod,
        userInfo: {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          mobile: userInfo.mobile,
          postalCode: userInfo.postalCode,
          address: userInfo.address,
        },
      });

      if (result.success && result.orderId) {
        if (result.redirect) {
          toast.success(result.message);
          router.push(result.redirect);
          return;
        }
        toast.success(result.message);
        router.push(`/payment/${result.orderId}`);
      } else {
        toast.error(result.message || "خطا در ثبت سفارش");
      }
    } catch (error) {
      toast.error("خطا در ثبت سفارش");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <CheckoutDeliveryMethod
          selectedMethod={deliveryMethod}
          onChange={setDeliveryMethod}
        />
        <CheckoutUserInfo
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          onConfirm={() => setIsUserInfoConfirmed(true)}
          onChange={handleUserInfoChange}
          deliveryMethod={deliveryMethod}
        />
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <CheckoutItems
            items={items}
            totalItems={totalItems}
            totalPrice={totalPrice}
            shippingCost={shippingCost}
            finalTotal={finalTotal}
          />

          <PrimaryButton
            onClick={handleSubmitOrder}
            disabled={!isPaymentEnabled || isLoading}
            className="mt-4 h-12 w-full text-lg max-sm:hidden"
          >
            {isLoading
              ? "در حال ثبت..."
              : !isPaymentEnabled
                ? "اطلاعات کامل نیست."
                : "تایید و پرداخت"}
          </PrimaryButton>
          <CartStickyPrice
            buttonText={
              isLoading
                ? "در حال ثبت..."
                : !isPaymentEnabled
                  ? "اطلاعات کامل نیست."
                  : "تایید و پرداخت"
            }
            price={finalTotal}
            isEnable={isPaymentEnabled}
            isLoading={isLoading}
            onClick={handleSubmitOrder}
            variant="checkout"
          />
        </div>
      </div>
    </div>
  );
}
