import { render, screen } from '@testing-library/react'
import { CartProvider } from '../../src/providers/CartProvider'
import QuantitySelector from '../../src/components/QuantitySelector'
import { Product } from '../../src/entities'
import userEvent from '@testing-library/user-event'

describe('QuantitySelector', () => {
  const renderComponent = () => {
    const product: Product = {
      id: 1,
      name: 'Milk',
      price: 5,
      categoryId: 1,
    }

    render(
      <CartProvider>
        <QuantitySelector product={product} />
      </CartProvider>
    )

    const getAddToCardButton = () =>
      screen.queryByRole('button', { name: /add to cart/i })

    const getQuantityControls = () => ({
      quantity: screen.queryByRole('status'),
      decrementButton: screen.queryByRole('button', { name: '-' }),
      incrementButton: screen.queryByRole('button', { name: '+' }),
    })

    const user = userEvent.setup()

    const addToCart = async () => {
      const button = getAddToCardButton()
      await user.click(button!)
    }

    const incrementQuantity = async () => {
      const { incrementButton } = getQuantityControls()
      await user.click(incrementButton!)
    }

    const decrementQuantity = async () => {
      const { decrementButton } = getQuantityControls()
      await user.click(decrementButton!)
    }

    return {
      getAddToCardButton,
      getQuantityControls,
      addToCart,
      incrementQuantity,
      decrementQuantity,
    }
  }

  it('should render the Add to Card button', () => {
    const { getAddToCardButton } = renderComponent()

    expect(getAddToCardButton()).toBeInTheDocument()
  })

  it('should add the product to the cart', async () => {
    const { getAddToCardButton, getQuantityControls, addToCart } =
      renderComponent()

    await addToCart()

    const { quantity, incrementButton, decrementButton } = getQuantityControls()

    expect(quantity).toHaveTextContent('1')
    expect(incrementButton).toBeInTheDocument()
    expect(decrementButton).toBeInTheDocument()
    expect(getAddToCardButton()).not.toBeInTheDocument()
  })

  it('should increment the quantity', async () => {
    const { incrementQuantity, getQuantityControls, addToCart } =
      renderComponent()
    await addToCart()

    await incrementQuantity()

    const { quantity } = getQuantityControls()
    expect(quantity).toHaveTextContent('2')
  })

  it('should decrement the quantity', async () => {
    const {
      incrementQuantity,
      decrementQuantity,
      getQuantityControls,
      addToCart,
    } = renderComponent()
    await addToCart()
    await incrementQuantity()

    await decrementQuantity()

    const { quantity } = getQuantityControls()
    expect(quantity).toHaveTextContent('1')
  })

  it('should remove the product from the cart', async () => {
    const {
      getAddToCardButton,
      getQuantityControls,
      addToCart,
      decrementQuantity,
    } = renderComponent()
    await addToCart()

    await decrementQuantity()

    const { incrementButton, decrementButton, quantity } = getQuantityControls()
    expect(quantity).not.toBeInTheDocument()
    expect(decrementButton).not.toBeInTheDocument()
    expect(incrementButton).not.toBeInTheDocument()
    expect(getAddToCardButton()).toBeInTheDocument()
  })
})
