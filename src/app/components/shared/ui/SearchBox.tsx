import { MdOutlineSearch } from 'react-icons/md'

export default function SearchBox() {
  return (
    <div className="bg-neutral3 flex h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5">
      <MdOutlineSearch className="text-neutral9 size-5" />
      <input
        type="text"
        placeholder="جستجوی گیاه"
        className="text-neutral11 placeholder:text-neutral9 w-full border-0 outline-0"
      />
    </div>
  )
}