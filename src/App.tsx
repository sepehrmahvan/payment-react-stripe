import { Elements } from "@stripe/react-stripe-js";
import "./App.css";
import Plans from "./pages/plans";
import { loadStripe } from "@stripe/stripe-js";
import type { PlansDataTypes } from "./types/PlansDataTypes";
import { useState } from "react";

function App() {
  const [planAmount, setPlanAmount] = useState<number>(1);
  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

  const getPlanAmount = (plan: PlansDataTypes) => {
    setPlanAmount(plan.pricePerMonth);
  }

  const options = {
    mode: 'payment' as const,
    amount: planAmount,
    currency: 'usd',
  };

  if (planAmount < 0) {
    return;
  }

  return (
    <>
      <Elements stripe={stripePromise} options={options}>
          <Plans getPlanAmount={getPlanAmount} />
        </Elements>
    </>
  );
}

export default App;
