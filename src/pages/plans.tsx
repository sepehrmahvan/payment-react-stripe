import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { MdCheck } from "react-icons/md";
import type { PlansDataTypes } from "../types/PlansDataTypes";
import { plansData } from "../utils/PlansData";
import { toast } from "react-hot-toast";

const Plans: React.FC<{ getPlanAmount: (plan: PlansDataTypes) => void }> = ({
  getPlanAmount,
}) => {
  // for tab focus
  const [activeTab, setActiveTab] = useState("1");
  // for modal
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<PlansDataTypes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenModal = (plan: PlansDataTypes) => {
    setOpenModal(true);
    setSelectedPlan(plan);
    getPlanAmount(plan);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPlan(null);
  };

  // stripe
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (elements == null || stripe == null || selectedPlan == null) {
      return;
    }

    setIsLoading(true);

    try {
      getPlanAmount(selectedPlan);

      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();
      if (submitError) {
        return;
      }

      // Mock clientSecret
      const mockClientSecret =
        "pk_test_51RohzMDmg25BEnbXybQDc5YGhxW2OX0UZP0S2y4Ltwj3UMqcjulvIrqknsbdeT1nifpQa5S9UiJYoD2SoV3EHP7q00QfdrW5mi";

      // Mock confirmParams for testing
      const mockConfirmParams = {
        return_url: "https://example.com/order/123/complete",
        payment_method_data: {
          billing_details: {
            name: "Test User",
            email: "test@example.com",
          },
        },
      };

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: mockClientSecret,
        confirmParams: mockConfirmParams,
      });

      if (error) {
        toast.error(error.message || "An error occurred");
      } else {
        toast.success("Payment successful");
        setOpenModal(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="flex justify-center py-4">
        <div className="bg-white border-2 border-primary rounded-lg px-6 py-2">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("1")}
              className={`${
                activeTab === "1"
                  ? "text-white bg-primary"
                  : "text-black bg-white"
              } p-2 rounded-lg cursor-pointer transition-all duration-300`}
            >
              Software Plans
            </button>
            <button
              onClick={() => setActiveTab("2")}
              className={`${
                activeTab === "2"
                  ? "text-white bg-primary"
                  : "text-black bg-white"
              } p-2 rounded-lg cursor-pointer transition-all duration-300`}
            >
              Bookkeeping Services
            </button>
            <button
              onClick={() => setActiveTab("3")}
              className={`${
                activeTab === "3"
                  ? "text-white bg-primary"
                  : "text-black bg-white"
              } p-2 rounded-lg cursor-pointer transition-all duration-300`}
            >
              Bookkeepers & Firms
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-2">
        {/* Plan Cards */}
        <div className="flex flex-row justify-end items-start gap-0 p-0 m-0">
          {plansData.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg p-6 w-[20%] m-0">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ${plan.pricePerMonth}
                </div>
                <div className="text-sm text-gray-600 mb-4">Per Month</div>
                <div className="text-sm text-gray-600 mb-6">
                  {plan.minimumPrice === 0 ? (
                    <>
                      {"$" +
                        plan.minimumPrice +
                        " - $" +
                        plan.maximumPrice +
                        "k"}
                      <br />
                      in monthly expenses
                    </>
                  ) : plan.maximumPrice === 100 &&
                    plan.minimumPrice === null ? (
                    <>
                      {"$" + plan.maximumPrice + "k+"}
                      <br />
                      in monthly expenses
                    </>
                  ) : (
                    <>
                      {"$" +
                        plan.minimumPrice +
                        "k - $" +
                        plan.maximumPrice +
                        "k"}
                      <br />
                      in monthly expenses
                    </>
                  )}
                </div>
                <button
                  onClick={() => handleOpenModal(plan)}
                  className="w-full block font-semibold py-3 px-6 rounded-lg bg-primary text-white border border-primary cursor-pointer transition-all duration-300 hover:bg-white hover:text-primary"
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th className="w-1/5 px-6 py-4 text-sm text-gray-900 font-medium">
                    Features
                  </th>
                  {plansData &&
                    plansData.map((plan: PlansDataTypes) => (
                      <th
                        key={plan.id}
                        className="w-1/5 px-6 py-4 text-sm text-gray-900 font-medium"
                      >
                        {plan.name}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="w-1/5 px-6 py-4 text-left text-sm text-gray-900 font-medium">
                    Bookkeeping Type
                  </td>
                  {plansData.map((plan) => (
                    <td
                      key={plan.id}
                      className="w-1/5 px-6 py-4 text-sm text-gray-600 text-center"
                    >
                      {plan.bookKeepingType}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="w-1/5 px-6 py-4 text-left text-sm text-gray-900 font-medium">
                    Monthly Tax-Ready Financial Package
                    <br />
                    <span className="text-xs text-gray-500">
                      (P&L, Balance Sheet, Cash Flow)
                    </span>
                  </td>
                  {plansData.map((plan) => (
                    <td
                      key={plan.id}
                      className="w-1/5 px-6 py-4 text-sm text-gray-600 text-center"
                    >
                      {plan.MonthlyTax}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="w-1/5 px-6 py-4 text-left text-sm text-gray-900 font-medium">
                    Dedicated U.S.-Based Bookkeeper & Support
                  </td>
                  {plansData.map((plan) => (
                    <td
                      key={plan.id}
                      className="w-1/5 px-6 py-4 text-sm text-gray-600 text-center"
                    >
                      {plan.dedicatedSupport && (
                        <MdCheck className="text-green-600 text-xl inline" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="w-1/5 px-6 py-4 text-left text-sm text-gray-900 font-medium">
                    Automated Selling Channel Integration & Payout
                    Reconciliation
                  </td>
                  {plansData.map((plan) => (
                    <td
                      key={plan.id}
                      className="w-1/5 px-6 py-4 text-sm text-gray-600 text-center"
                    >
                      {plan.automatedSetting && (
                        <MdCheck className="text-primary text-xl inline" />
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <div className="flex justify-between items-center">
          {/* title */}
          <DialogTitle>
            <p>Confirm Payment</p>
          </DialogTitle>
          {/* actions */}
          <DialogActions>
            <button
              onClick={handleCloseModal}
              className=" text-red-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-primary text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Confirm Payment"}
            </button>
          </DialogActions>
        </div>
        {/* payment form */}
        <form>
          <DialogContent>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Payment Information
              </Typography>
              <Box sx={{ mb: 3 }}>
                <PaymentElement />
              </Box>
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: "grey.50",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "grey.200",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Amount to be charged:
                </Typography>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  ${selectedPlan?.pricePerMonth} USD
                </Typography>
              </Box>
            </Box>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default Plans;
