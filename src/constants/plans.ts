const plans = [
  {
    title: "Free",
    description: "Perfect for getting started with basic link shortening",
    price: "Free",
    features: [
      "Create short links",
      "Link expiry after 24 hours",
      "5 QR code links",
      "1 customizable link(6 hours)",
    ],
    redirect: "/",
  },
  {
    title: "Signed In",
    description: "For users who need more features and longer link lifetimes",
    price: "Free with account",
    features: [
      "All Free features",
      "10 QR code links",
      "Link in bio for 7 days",
      "No link expiry",
      "Analytics dashboard",
    ],
    redirect: "/register",
  },
  {
    title: "Pro",
    description: "For power users who need unlimited features",
    price: "$0.99/month",
    features: [
      "All Signed In features",
      "Unlimited QR codes",
      "Permanent link in bio",
      //   "Custom domains",
      "Priority support",
      //   "Advanced analytics",
    ],
    redirect: "/payment",
  },
];
export default plans;
