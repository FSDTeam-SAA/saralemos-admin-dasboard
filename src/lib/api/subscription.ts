import { SubscriptionPlan } from "@/components/dashboard/subscription/common/subscriptions.types";
import api from "./api";

export async function SubscriptionFetch() {
  try {
    const res = await api.get(`/subscription/get-all`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || "Fail to Fetch Your Profile please check everyting",
      );
    }
  }
}

export async function Subscription(data: Partial<SubscriptionPlan>) {
  try {
    const res = await api.post(`/subscription/create`, data);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something wrong please try again");
    }
  }
}

export async function SubscriptionDelete(id: string) {
  try {
    const res = await api.delete(`/subscription/delete/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || "Failed to Delete Your Profile please check everyting",
      );
    }
  }
}

export async function singleSubscription(id: string) {
  try {
    const res = await api.get(`/subscription/plan/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || "Fail to Fetch Your Profile please check everyting",
      );
    }
  }
}

export async function subscriptionRevenue() {
  try {
    const res = await api.get(`/subscription/metrics`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message ||
          "Fail to Fetch Your subscription Metrics please check everyting",
      );
    }
  }
}
