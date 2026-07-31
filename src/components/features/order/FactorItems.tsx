import { IOrder, IOrderItem } from "@/features/order/types/order.types";
import { toPersianNumber, toPersianPrice, toStyledSlug } from "@/lib/utils/format";
import { getDiscountedPrice } from "@/lib/utils/price";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "../products/DiscountBadge";

interface FactorItemsProps {
  order: IOrder;
}

export default function FactorItems({ order }: FactorItemsProps) {
  return (
    <div className="mt-3 overflow-x-auto rounded-2xl bg-white dark:bg-shade2 dark:shadow-shade6 shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-primary/5 dark:dark:bg-emerald-800 text-neutral11 dark:text-white *:max-md:font-normal">
            <th className="rounded-tr-2xl p-3 text-right max-[580px]:hidden">
              #
            </th>
            <th className="max-xs:p-1 max-xs:w-10/16 p-3 text-right max-[580px]:w-9/16 max-[580px]:rounded-tr-2xl max-[580px]:p-2 max-[580px]:text-center max-[580px]:text-sm">
              محصول
            </th>
            <th className="max-xs:p-1 max-xs:hidden p-3 text-center max-[580px]:w-1/16 max-[580px]:p-2 max-[580px]:text-sm">
              تعداد
            </th>
            <th className="p-3 text-center max-xl:hidden"></th>
            <th className="p-3 text-center max-md:hidden">قیمت واحد</th>
            <th className="p-3 text-center max-xl:hidden"></th>
            <th className="max-xs:p-1 max-xs:w-6/16 rounded-tl-2xl p-3 text-center max-[580px]:w-6/16 max-[580px]:p-2 max-[580px]:text-sm">
              قیمت کل
            </th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item: IOrderItem, index: number) => {
            const {
              price,
              discount,
              image,
              category,
              name,
              quantity,
              slug,
            } = item;
            const discountedPrice = 
              getDiscountedPrice(price, discount);
            return (
              <tr
                key={index}
                className="border-neutral3 dark:border-neutral6 border-b last:border-0"
              >
                <td className="max-xs:p-1 p-3 text-right max-[580px]:hidden max-[580px]:p-2">
                  {toPersianNumber(index + 1)}
                </td>
                <td className="max-xs:p-1 p-3 text-right max-[580px]:p-2">
                  <div className="group max-xs:gap-x-1.5 flex items-center gap-x-3">
                    <div className="relative">
                      <Image
                        src={image}
                        alt={name}
                        width={100}
                        height={100}
                        className="size-25 max-lg:size-20 max-[580px]:size-18! max-xs:size-14! rounded-lg object-cover"
                      />
                      <DiscountBadge
                        discount={discount}
                        className="absolute top-0 right-0 max-sm:scale-80"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/products/${category}/${slug}`}
                        className="group-hover:text-primary dark:group-hover:text-primary-dark line-clamp-1 font-medium transition-colors max-[580px]:text-sm max-sm:font-normal"
                      >
                        <span className="max-xs:hidden">{name}</span>
                        <span className="xs:hidden">{`${toPersianNumber(quantity)}× ${name}`}</span>
                        
                      </Link>
                      <p className="text-neutral9 dark:text-text-dark line-clamp-1 text-sm max-[580px]:text-xs">
                        {toStyledSlug(slug)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="max-xs:p-1 max-xs:hidden p-3 text-center max-[580px]:p-2 max-[580px]:text-sm">
                  {toPersianNumber(quantity)}
                </td>
                <td className="text-primary dark:text-primary-dark max-xs:p-1 p-3 text-center font-bold max-[580px]:p-2 max-xl:hidden">
                  ×
                </td>
                <td className="max-xs:p-1 p-3 text-center max-[580px]:p-2 max-md:hidden">
                  {toPersianPrice(discountedPrice)}
                </td>
                <td className="text-primary dark:text-primary-dark max-xs:p-1 p-3 text-center font-bold max-[580px]:p-2 max-xl:hidden">
                  =
                </td>
                <td className="text-primary dark:text-primary-dark max-xs:p-1 p-3 text-center font-bold max-[580px]:p-2 max-[580px]:text-sm max-sm:font-normal">
                  {toPersianPrice(discountedPrice * quantity)}
                </td>
              </tr>
            );
          })}

          <tr className="border-neutral3 dark:border-neutral6 bg-neutral1 dark:bg-shade2 border-t-2">
            <td colSpan={4} className="max-[580px]:hidden max-xl:hidden"></td>
            <td
              colSpan={3}
              className="max-[580px]:hidden max-md:hidden xl:hidden"
            ></td>
            <td colSpan={1} className="max-[580px]:hidden md:hidden"></td>
            <td className="border-neutral5 max-xs:p-1 p-3 text-center font-bold max-[580px]:p-2 max-[580px]:text-sm max-sm:font-semibold">
              جمع کل
            </td>
            <td className="max-[580px]:hidden max-xl:hidden"></td>
            <td className="max-xs:hidden md:hidden"></td>
            <td className="border-neutral5 max-xs:p-1 p-3 text-center font-bold max-[580px]:p-2 max-[580px]:text-sm max-sm:font-semibold">
              {toPersianPrice(order.totalAmount)}
            </td>
          </tr>
          <tr className="bg-neutral1 dark:bg-shade3">
            <td colSpan={4} className="max-[580px]:hidden max-xl:hidden"></td>
            <td
              colSpan={3}
              className="max-[580px]:hidden max-md:hidden xl:hidden"
            ></td>
            <td colSpan={1} className="max-[580px]:hidden md:hidden"></td>
            <td className="border-neutral5 text-neutral9 dark:text-text-dark max-xs:p-1 p-3 text-center font-medium max-[580px]:p-2 max-[580px]:text-sm">
              هزینه ارسال
            </td>
            <td className="max-[580px]:hidden max-xl:hidden"></td>
            <td className="max-xs:hidden md:hidden"></td>
            <td className="border-neutral5 max-xs:p-1 p-3 text-center font-medium max-[580px]:p-2 max-[580px]:text-sm">
              {order.shippingCost > 0
                ? toPersianPrice(order.shippingCost)
                : "رایگان"}
            </td>
          </tr>
          <tr className="bg-primary/10 dark:dark:bg-shade4 border-primary/20 border-t">
            <td
              colSpan={4}
              className="rounded-br-2xl max-[580px]:hidden max-xl:hidden"
            ></td>
            <td
              colSpan={3}
              className="max-[580px]:hidden max-xl:rounded-br-2xl max-md:hidden xl:hidden"
            ></td>
            <td
              colSpan={1}
              className="max-[580px]:hidden max-md:rounded-br-2xl md:hidden"
            ></td>
            <td className="text-primary dark:text-primary-dark max-xs:p-1 p-3 text-center text-lg font-bold max-[580px]:rounded-br-2xl max-[580px]:p-2 max-[580px]:text-base">
              مبلغ نهایی
            </td>
            <td className="max-[580px]:hidden max-xl:hidden"></td>
            <td className="max-xs:hidden md:hidden"></td>
            <td className="text-primary dark:text-primary-dark max-xs:p-1 rounded-bl-2xl p-3 text-center text-lg font-bold max-[580px]:p-2 max-[580px]:text-base">
              {toPersianPrice(order.finalAmount)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
