import Image from 'next/image'
import Right from '../icons/Right'


export default function Hero(){
    return (
        
    <section id="home" className='hero mt-5'>
        <div className='py-12'>
            <h1 className='text-4xl font-semibold leading-normal'>Everthing<br/> is better <br/>with 
                a&nbsp;<span className='text-primary'>Pizza</span>
            </h1>
            <p className='my-4 text-gray-500 text-sm'>Pizza is the missing piece thst makes every dat complete, a simple yet delicious joy in life</p>
            <div className='flex gap-4'>
                <button className='bg-primary text-white justify-center py-2 rounded-full flex gap-2 uppercase '>Order now <Right /></button>
                <button className='flex gap-1 py-2 justify-center text-gray-500 font-semibold'>Learn more <Right /></button>
            </div>
        </div>
        <div className='relative items-center'>
            <Image src={'/pizza.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'} />
        </div>
        
    </section>
    
  )
}