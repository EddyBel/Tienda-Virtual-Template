import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Recupera la lista de productos desde Stripe
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });

    // Formatea los productos para incluir la información necesaria
    const formattedProducts = products.data.map((product) => {
      const price = product.default_price;
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: price ? (price.unit_amount / 100).toFixed(2) : null,
        currency: price ? price.currency : null,
        buyLink: price ? `https://checkout.stripe.com/pay/${price.id}` : null,
      };
    });

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
