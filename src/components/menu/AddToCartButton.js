import FlyingButton from 'react-flying-item'

export default function AddToCartButton({
    hasSizesOrExtras, onClick, basePrice, image
  }) {
    if (!hasSizesOrExtras) {
      return (
        <div className="flying-button-parent mt-4 bg-primary  rounded-md border-0">
          <FlyingButton
            targetTop={'5%'}
            targetLeft={'95%'}
            src={image}
            >

            <div onClick={onClick} className='text-sm text-white border-0'>
              Add to cart ${basePrice}
            </div>

          </FlyingButton>
        </div>
      );
    }



    return (
      <button
        type="button"
        onClick={onClick}
        className="mt-4 bg-primary text-white rounded-full px-4 py-2 text-sm">
        <span className='text-sm'>Add to cart (from ${basePrice})</span>
      </button>
    );
  }