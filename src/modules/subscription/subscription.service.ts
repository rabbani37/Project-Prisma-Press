
import Stripe from "stripe";
import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { stripe } from "../../lib/stripe";
import { userInfo } from "node:os";
import config from "../../config";



const createCheckoutSession = async (userId: string) => {
    const transctionResult = await prisma.$transaction(async (tx) => {
        const user = await tx.user.findUniqueOrThrow({
            where: { id: userId, },
            include: { subscriptions: true, },
            omit: { password: true }

        });


        // old subscriber
        let stripCustomerId = user.subscriptions?.stripeCustomerId
        if (!stripCustomerId) {

            // new subscriber
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name,
                metadata: { userId: user.id }
            });

            stripCustomerId = customer.id;

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: config.stripe_product_id,
                        quantity: 1
                    }
                ],
                mode: "subscription",
                customer: stripCustomerId,
                payment_method_types: ["card"],
                success_url: `${config.app_url}/premium?success=true`,
                cancel_url: `${config.app_url}/premium?success=false`,
                metadata: { userId: user.id }
            });

            return session.url;
        }
    });

    return { paymentUrl: transctionResult };
}



export const subscriptionService = {
    createCheckoutSession
}