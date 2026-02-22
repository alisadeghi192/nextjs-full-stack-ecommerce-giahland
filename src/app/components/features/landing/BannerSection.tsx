// src/components/features/landing/banner/BannerSection.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function BannerSection() {
  return (
    <div className="flex items-center gap-x-7 mt-20 max-md:flex-col-reverse max-lg:mt-16 max-md:gap-y-4">
      <div>
        <Link href="/">
          <Image alt="banner" width={600} height={240} src="/banner1.png" />
        </Link>
      </div>
      <div>
        <Link href="/">
          <Image alt="banner" width={600} height={240} src="/banner2.png" />
        </Link>
      </div>
    </div>
  )
}