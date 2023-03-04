import Link from 'next/link';
import { toast } from 'react-toastify';

import { formatPrice } from '../../../utils/formatPrice';
import { AddToCartModel } from '../../cart/models/AddToCartModel';
import { addToCart } from '../../cart/services/CartService';
import { ProductDetail } from '../models/ProductDetail';
import { ProductVariations } from '../models/ProductVariations';

export interface ProductDetailProps {
  product: ProductDetail;
  productVariations: ProductVariations[] | undefined;
}

const handleAddToCart = async (event: any) => {
  event.preventDefault();
  let addToCartModel: AddToCartModel[] = [
    {
      productId: event.target.productId.value,
      quantity: event.target.quantity.value,
    },
  ];
  await addToCart(addToCartModel)
    .then(() => {
      toast.success(' Add to cart success', {
        position: 'top-right',
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'colored',
      });
    })
    .catch(() => {
      toast.error('Add to cart failed. Try again', {
        position: 'top-right',
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'colored',
      });
    });
};

export default function ProductDetails({ product, productVariations }: ProductDetailProps) {
  return (
    <>
      <div className="d-flex gap-2 align-items-center mb-2">
        <h5 className="m-0 fs-6">Brand: </h5>
        <Link href="#" className="fs-6">
          {product.brandName}
        </Link>
      </div>

      {/* product variation */}
      {(productVariations || []).map((productVariation, index) => (
        <div className="mb-3" key={index}>
          <h5 className="mb-2 fs-6">{productVariation.name}:</h5>
          {(productVariation.value || []).map((productVariationValue, index) => (
            <button key={index} className="btn btn-outline-primary me-2 py-1 px-2">
              {productVariationValue}
            </button>
          ))}
        </div>
      ))}
      <h4 className="fs-3" style={{ color: 'red' }}>
        {formatPrice(product.price)}
      </h4>
      <p>{product.description}</p>
      <div>
        <form onSubmit={handleAddToCart}>
          <input type={'hidden'} name={'productId'} value={product.id} />
          <input type={'hidden'} name={'quantity'} value={1} />
          <button
            type="submit"
            className="btn btn-dark d-flex align-items-center justify-content-center gap-2 w-100 fs-6 fw-bold"
            style={{ height: '56px' }}
            disabled={product.isAllowedToOrder ? false : true}
          >
            <span>Add to cart</span>
          </button>
        </form>
      </div>
      <div className="d-flex gap-2 mt-2">
        <button className="btn btn-primary w-100">
          <div style={{ fontSize: '14px' }}>Installment purchase</div>
          <div style={{ fontSize: '14px' }}>Browse profiles in 5 minutes</div>
        </button>
        <button className="btn btn-primary w-100">
          <div style={{ fontSize: '14px' }}>0% installment payment via card</div>
          <div style={{ fontSize: '14px' }}>Visa, Mastercard, JSB, Amex</div>
        </button>
      </div>
    </>
  );
}
