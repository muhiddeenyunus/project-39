import Link from "next/link";

const pages: Record<string, { title: string; intro: string; sections: Array<{ heading: string; body: string }> }> = {
  about: {
    title: "About Project 39",
    intro: "A considered marketplace for the things you use, wear, and enjoy every day.",
    sections: [
      { heading: "Simple shopping", body: "Project 39 brings a focused catalog, clear prices in naira, and a straightforward checkout into one calm shopping experience." },
      { heading: "Made for people", body: "We care about useful products, honest information, and support that feels human when you need it." },
    ],
  },
  careers: {
    title: "Careers",
    intro: "Help us make online shopping feel a little more thoughtful.",
    sections: [{ heading: "Open roles", body: "We are not listing open roles right now. Send a short introduction and your portfolio to careers@project39.example and we will keep it on file." }],
  },
  contact: {
    title: "Contact us",
    intro: "Questions about an order, a product, or your account? We are here to help.",
    sections: [
      { heading: "Customer support", body: "Email support@project39.example with your order number and we will reply within one business day." },
      { heading: "Business enquiries", body: "For partnerships and supplier enquiries, email hello@project39.example." },
    ],
  },
  shipping: {
    title: "Shipping",
    intro: "Reliable delivery with clear updates along the way.",
    sections: [
      { heading: "Delivery times", body: "Orders are prepared after payment confirmation. Delivery timing depends on your location and is shown during checkout." },
      { heading: "Tracking", body: "When your order ships, we will send tracking details to the email on your account." },
    ],
  },
  returns: {
    title: "Returns and refunds",
    intro: "Changed your mind? We will help you sort it out.",
    sections: [
      { heading: "Start a return", body: "Contact support@project39.example within 14 days of delivery with your order number and the reason for the return." },
      { heading: "Refunds", body: "Approved refunds are returned to the original payment method after the item is received and checked." },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    intro: "Quick answers to common questions.",
    sections: [
      { heading: "Can I change my order?", body: "Contact support as soon as possible. We can update an order before it is prepared for delivery." },
      { heading: "How do I pay?", body: "Checkout uses Paystack. Your payment is processed securely and your order is created after confirmation." },
      { heading: "Do I need an account?", body: "Yes. Sign in or register before checkout so we can attach your order and delivery details to you." },
    ],
  },
  privacy: {
    title: "Privacy policy",
    intro: "Your information should work for you, not against you.",
    sections: [
      { heading: "What we collect", body: "We use account, delivery, and order information to provide the service, process payments, and support your requests." },
      { heading: "How we protect it", body: "We limit access to information needed to operate the store and do not sell your personal information." },
    ],
  },
  terms: {
    title: "Terms of service",
    intro: "The basic terms for using Project 39.",
    sections: [
      { heading: "Using the store", body: "Please provide accurate account and delivery information and use the store lawfully." },
      { heading: "Orders and prices", body: "Orders are subject to product availability. Prices and delivery estimates are confirmed at checkout." },
    ],
  },
  warranty: {
    title: "Warranty",
    intro: "We want your purchase to keep working as expected.",
    sections: [{ heading: "Product support", body: "Warranty coverage varies by product. Contact support@project39.example with your order number and a description of the issue." }],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function InformationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug] || {
    title: "Page not found",
    intro: "That page does not exist.",
    sections: [{ heading: "Continue shopping", body: "Return to the Project 39 catalog to browse the latest products." }],
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-zinc-900">
      <header className="border-b border-zinc-200 bg-white px-4 py-4 lg:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight"><span className="flex size-8 items-center justify-center rounded-full bg-zinc-900 text-sm text-white">39</span> Project 39</Link>
          <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-[#ff2a5a]">Back to shop</Link>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#ff2a5a]">Project 39</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">{page.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">{page.intro}</p>
        <div className="mt-12 grid gap-8 border-t border-zinc-200 pt-8 md:grid-cols-2">
          {page.sections.map((section) => <section key={section.heading}><h2 className="text-lg font-semibold">{section.heading}</h2><p className="mt-3 leading-7 text-zinc-600">{section.body}</p></section>)}
        </div>
      </div>
    </main>
  );
}