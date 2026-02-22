import { MdOutlinePayment, MdOutlineVerified, MdOutlineLocalShipping } from 'react-icons/md'
import ServiceCard from './ServiceCard'

export default function ServicesSection() {
  return (
    <div className="mt-15 flex w-full items-center justify-center gap-x-20 max-md:mt-3 max-md:flex-col">
      <ServiceCard
        icon={<MdOutlinePayment className="size-10 max-sm:size-8" />}
        title="پرداخت درب منزل"
        description="برای ایجاد اطمینان خاطر مشتریان،علاوه بر پرداخت آنلاین امکان پرداخت درب منزل وجود دارد."
      />
      <ServiceCard
        icon={<MdOutlineVerified className="size-10 max-sm:size-8" />}
        title="ضمانت محصول"
        description="به مدت دو هفته پس از دریافت محصول در صورت وجود مشکل میتوانید مرجوع کنید."
      />
      <ServiceCard
        icon={<MdOutlineLocalShipping className="size-10 max-sm:size-8" />}
        title="تحویل درب منزل"
        description="با ایجاد آدرس منزل خود در پروفایل کاربری،محصول خود را درب منزل تحویل بگیرید."
      />
    </div>
  )
}