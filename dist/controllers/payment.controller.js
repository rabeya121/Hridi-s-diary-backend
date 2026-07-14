"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySession = exports.createCheckoutSession = void 0;
const stripe_1 = __importDefault(require("stripe"));
const getStripe = () => {
    return new stripe_1.default(process.env.STRIPE_SECRET_KEY);
};
// @desc    Create a Stripe Checkout Session
// @route   POST /api/payments/create-checkout-session
const createCheckoutSession = async (req, res) => {
    try {
        const stripe = getStripe();
        const { items, address, phone } = req.body;
        if (!items || items.length === 0) {
            res.status(400).json({ message: "Cart is empty" });
            return;
        }
        const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: items.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.title,
                        images: [item.image],
                        description: `Original price: ৳${item.price} BDT`,
                    },
                    unit_amount: Math.round((item.price / 110) * 100), // Approx BDT to USD conversion for demo
                },
                quantity: item.quantity,
            })),
            success_url: `${clientUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${clientUrl}/checkout`,
            metadata: {
                userId: req.user?.id || "",
                address,
                phone,
            },
        });
        res.status(200).json({ url: session.url });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error creating checkout session" });
    }
};
exports.createCheckoutSession = createCheckoutSession;
// @desc    Verify a Stripe session and return order details
// @route   GET /api/payments/verify-session/:sessionId
const verifySession = async (req, res) => {
    try {
        const stripe = getStripe();
        const sessionId = req.params.sessionId;
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items"],
        });
        if (session.payment_status !== "paid") {
            res.status(400).json({ message: "Payment not completed" });
            return;
        }
        res.status(200).json({
            session: {
                id: session.id,
                amountTotal: session.amount_total,
                customerEmail: session.customer_details?.email,
                metadata: session.metadata,
                lineItems: session.line_items?.data.map((li) => ({
                    title: li.description,
                    quantity: li.quantity,
                    amount: li.amount_total,
                })),
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error verifying session" });
    }
};
exports.verifySession = verifySession;
