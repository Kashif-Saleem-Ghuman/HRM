import { createConfig } from "./config";
import { bibOrgApiAxiosInstance } from "./bib-org-api-axios-instance";

export async function updateOrganization(payload) {
  const { id, organization } = payload;

  try {
    const config = createConfig();
    config.headers.common["Content-Type"] = "application/json";

    const { data } = await bibOrgApiAxiosInstance.put(
      ``,
      { ...organization },
      config
    );
    return data;
  } catch (e) {
    console.error(e);
  }
}
