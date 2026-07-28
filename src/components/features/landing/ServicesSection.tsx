import {
  MdOutlineLocalShipping,
  MdOutlinePayment,
  MdOutlineVerified,
} from "react-icons/md";
import ServiceCard from "./ServiceCard";

const ServicesSection = () => {
  return (
    <section className="mt-15 flex w-full items-center justify-center gap-x-20 max-md:mt-3 max-md:flex-col">
      <ServiceCard
        icon={<MdOutlinePayment className="size-10 max-sm:size-8 dark:text-primary-dark transition-colors" />}
        title="پرداخت درب منزل"
        description="برای ایجاد اطمینان خاطر مشتریان،علاوه بر پرداخت آنلاین امکان پرداخت درب منزل وجود دارد."
      />
      <ServiceCard
        icon={<MdOutlineVerified className="size-10 max-sm:size-8 dark:text-primary-dark transition-colors" />}
        title="ضمانت محصول"
        description="به مدت دو هفته پس از دریافت محصول در صورت وجود مشکل میتوانید مرجوع کنید."
      />
      <ServiceCard
        icon={<MdOutlineLocalShipping className="size-10 max-sm:size-8 dark:text-primary-dark transition-colors" />}
        title="تحویل درب منزل"
        description="با ایجاد آدرس منزل خود در پروفایل کاربری،محصول خود را درب منزل تحویل بگیرید."
      />
    </section>
  );
};
export default ServicesSection;
