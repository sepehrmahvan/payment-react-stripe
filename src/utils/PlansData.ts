import type { PlansDataTypes } from "../types/PlansDataTypes";


export const plansData: PlansDataTypes[] = [
    {
        id: 1,
        name: "Starter",
        pricePerMonth: 299,
        minimumPrice: 0,
        maximumPrice: 15,
        bookKeepingType: "Cash Basis",
        MonthlyTax: "Basic Reports",
        dedicatedSupport: true,
        automatedSetting: true,
    },
    {
        id: 2,
        name: "Growth",
        pricePerMonth: 449,
        minimumPrice: 15,
        maximumPrice: 50,
        bookKeepingType: "Modified Cash or Accrual",
        MonthlyTax: "Advanced Reports",
        dedicatedSupport: true,
        automatedSetting: true,
    },
    {
        id: 3,
        name: "Scaling",
        pricePerMonth: 649,
        minimumPrice: 50,
        maximumPrice: 100,
        bookKeepingType: "Modified Cash or Accrual",
        MonthlyTax: "Advanced Reports",
        dedicatedSupport: true,
        automatedSetting: true,
    },
    {
        id: 4,
        name: "Enterprise",
        pricePerMonth: 899,
        minimumPrice: null,
        maximumPrice: 100,
        bookKeepingType: "Modified Cash or Accrual",
        MonthlyTax: "CFO Type insights",
        dedicatedSupport: true,
        automatedSetting: true,
    },
]