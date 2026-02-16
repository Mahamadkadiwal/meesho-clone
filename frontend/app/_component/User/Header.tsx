import Image from 'next/image'
import Link from 'next/link'
import { CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci'
import { IoIosLogOut } from 'react-icons/io'
import { IoBagOutline } from 'react-icons/io5'

export default function Header() {
  return (
    <header className='flex flex-col gap-2 w-svw bg-(--header-bg)'>
      <div className='flex flex-row px-12 bg-(--header-bg) h-18'>
        <div className=' flex flex-row items-center pointer cursor-pointer mr-9'>
          <Image src="/logo/meeshoLogo.svg" alt='logo' width={120} height={120} />
        </div>
        <div className='basis-2/3 relative self-center'>
          <div className='flex items-center border border-(--header-in-border-color) rounded-sm p-2.75'>
            <div className='h-full flex px-2 items-center justify-center'>
              <CiSearch className='w-5 h-5' />
            </div>
            <input className='rounded outline-none w-full h-full text-(--header-in-text-color) font-medium text-base leading-5' type='text'
              placeholder='Try Saree, kurti or Search by' />
          </div>
        </div>
        <div className='basis-1/3 flex flex-[6_1_0%] flex-row justify-end items-center relative bg-(--header-bg)'>
          <div className='relative h-full flex flex-row items-center justify-center bg-white 
          rounded-lg border-b-[3px] border-b-white mx-4.5'>
            <span className='text-(--header-text) font-medium text-base leading-5 cursor-pointer'>Become a Supplier</span>
          </div>
          <div className='w-0.5 h-10 bg-(--header-line) rounded'></div>
          <div className='relative h-full flex flex-row items-center justify-center bg-white 
          rounded-lg border-b-[3px] border-b-white mx-4.5'>
            <span className='text-(--header-text) font-medium text-base leading-5 cursor-pointer'>Investor Relation</span>
          </div>
          <div className='w-0.5 h-10 bg-(--header-line) rounded'></div>
          <div className='relative h-full flex flex-col items-center justify-center group
          rounded-t-xs border-b-[3px] border-b-white 
          min-w-20 ml-6 cursor-pointer'>
            <CiUser className='mr-2 h-5 w-5 font-bold group-hover:text-(--hover-text)' />
            <span className='text-(--header-text) not-italic font-medium text-base leading-5 m-0 p-0 group-hover:text-(--hover-text)'>Profile</span>
            <div className='absolute top-[105%] w-63 bg-white
              flex flex-col justify-start items-start text-left
              z-[100]
              border border-[rgb(234,234,242)]
              shadow-[0px_2px_4px_rgba(34,34,34,0.12),0px_0px_1px_rgba(34,34,34,0.12)]
              rounded-b-lg
              animate-[fadeIn_200ms_ease-in] hidden group-hover:block'>
              <div className='bg-white rounded-md py-5 px-4'>
                <div className='flex justify-between'>
                  <span className='text-(--text-color) font-semibold text-xl leading-6'>Hello User</span>
                </div>

                <span className='flex text-(--text-color) font-semibold text-sm leading-4 m-0 pt-1 pb-4'>To access your Meesho account</span>
                <button className='primary-btn'>
                  <Link href="/user/signup"><span>Sign up</span></Link>
                </button>
                <div className='h-px w-full bg-[rgb(206,206,222)] rounded-xs my-4'></div>
                <a href="/orders">
                  <div className='flex items-center cursor-pointer'>
                    <IoBagOutline />
                    <span className='text-(--text-color) not-italic font-semibold text-lg leading-6 m-0 pl-3'>
                      My Orders</span>
                  </div>
                </a>
                <div className='h-px w-full bg-[rgb(206,206,222)] rounded-xs my-4'></div>
                <a href="/orders">
                  <div className='flex items-center cursor-pointer'>
                    <span className='text-(--text-color) not-italic font-semibold text-lg leading-6 m-0 pl-3'>
                      Delete Account</span>
                  </div>
                </a>
                <div className='h-px w-full bg-[rgb(206,206,222)] rounded-xs my-4'></div>
                <a href="/logout">
                  <div className='flex items-center cursor-pointer'>
                    <IoIosLogOut />
                    <span className='text-(--text-color) not-italic font-semibold text-lg leading-6 m-0 pl-3'>
                      Logout</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className='relative h-full flex flex-col items-center justify-center 
          rounded-t-xs border-b-[3px] border-b-white 
          min-w-20 cursor-pointer'>
            <CiShoppingCart className='mr-2 h-5 w-5 font-bold' />
            <span className='text-(--header-text) not-italic font-medium text-base leading-5 m-0 p-0'>Cart</span>
          </div>
        </div>
      </div>
    </header>
  )
}
