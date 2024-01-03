
import Hero from '@/components/layout/Hero'
import HomeMenu from '@/components/layout/HomeMenu'
import SectionHeaders from '@/components/layout/SectionHeaders'

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section id="aboutus" className='text-center my-16'>
        <SectionHeaders
        subHeader={'Our Stroy'} 
        mainHeader={'About us'}
        />
        <div className='text-gray-500 text-sm max-auto mt-4 flex flex-col gap-4'>
          <p >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quod, quaerat, quasi, quidem, quibusdam, quod, quaerat, quasi.
            Lorem ipsum dolor sit amet, consectet tempor. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quod, quaerat, quasi, quidem, quibusdam, quod, quaerat, quasi.
            Lorem ipsum dolor sit amet, consectet tempor. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quod, quaerat, quasi, quidem, quibusdam, quod, quaerat, quasi.
            Lorem ipsum dolor sit amet, consectet tempor.
          </p>
          <p >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quod, quaerat, quasi, quidem, quibusdam, quod, quaerat, quasi.
            Lorem ipsum dolor sit amet, consectet tempor. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quod, quaerat, quasi, quidem, quibusdam, quod, quaerat, quasi.
            Lorem ipsum dolor sit amet, consectet tempor. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quod, quaerat, quasi, quidem, quibusdam, quod, quaerat, quasi.
            Lorem ipsum dolor sit amet, consectet tempor.
          </p>
        </div>
      </section>
      <section id="contactus" className='text-center my-16'>
        <SectionHeaders
        subHeader={'Don\'t hesitate'} 
        mainHeader={'Contact us'}
        />
        <div className='mt-4'>
        <a href='tel:+919999999999' className='text-4xl underline text-gray-500'>+91 99999 99999</a>
        </div>
      </section>
    </>
  )
}
