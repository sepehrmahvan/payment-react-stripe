export interface PlansDataTypes {
    id: number;
    name: string;
    pricePerMonth: number;
    minimumPrice: number | null;
    maximumPrice: number | null;
    bookKeepingType: string;
    MonthlyTax: string;
    dedicatedSupport: boolean;
    automatedSetting: boolean;
}